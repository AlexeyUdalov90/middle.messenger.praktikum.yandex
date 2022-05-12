import EventBus from './EventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import { isEqual } from '../utils';

type Events = Values<typeof Block.EVENTS>;

export interface BlockClass<P> extends Function {
  new (props: P): Block<P>;
  componentName?: string;
}

export default class Block<P = Record<string, unknown>> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  } as const;

  static componentName: string;

  public id = nanoid(6);

  protected _element: Nullable<HTMLElement> = null;
  protected readonly props: P;
  protected children: {[id: string]: Block<P>} = {};

  eventBus: () => EventBus<Events>;

  protected state = {};
  protected refs: {[key: string]: HTMLElement} = {};

  public constructor(props?: P) {
    const eventBus = new EventBus<Events>();

    this.getStateFromProps(props || {} as P);

    this.props = this._makePropsProxy(props || {} as P);
    this.state = this._makePropsProxy(this.state as P);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  /**
   * Хелпер, который проверяет, находится ли элемент в DOM дереве
   * И есть нет, триггерит событие COMPONENT_WILL_UNMOUNT
   */
  private _checkInDom() {
    const elementInDOM = document.body.contains(this._element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000);

      return;
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  private _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected getStateFromProps(props: P): void {
    this.state = {
      ...props
    };
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  private _componentDidMount() {
    this._checkInDom();
    this.componentDidMount();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  componentDidMount() {}

  private _componentWillUnmount() {
    this.eventBus().destroy();
    this.componentWillUnmount();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  componentWillUnmount() {}

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }

    this._render();
  }

  componentDidUpdate(oldProps: P, newProps: P): boolean {
    return !isEqual(oldProps, newProps);
  }

  setProps (nextProps: P) {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  setState (nextState: P) {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  }

  setChildState (childId: string, nextState: P) {
    const isHasChild = Object.keys(this.children).includes(childId);

    if (isHasChild) {
      (this.children[childId] as Block<P>).setState(nextState);
    }
  }

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this._compile();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newElement = fragment.firstElementChild!;

    if (this._element) {
      this._removeEvents();
      this._element?.replaceWith(newElement);
    }

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement {
    // Хак, чтобы вызвать CDM только после добавления в DOM

    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !==  Node.DOCUMENT_FRAGMENT_NODE ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100)
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.element!;
  }

  private _makePropsProxy(props: P): P {
    return new Proxy(props as unknown as object, {
      get: (target: Record<string, unknown>, prop: string) => {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет прав');
        }

        const value = target[prop];

        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет прав');
        }

        const oldTarget = Object.assign({}, target);

        target[prop] = value;

        // Запускаем обновление компоненты
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);

        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      }
    }) as unknown as P;
  }

  private _removeEvents() {
    const events: Record<string, () => void> = (this.props as P)?.events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.removeEventListener(event, listener);
    });
  }

  private _addEvents() {
    const events: Record<string, () => void> = (this.props as P)?.events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.addEventListener(event, listener);
    });
  }

  private _compile(): DocumentFragment {
    const fragment = document.createElement('template') as HTMLTemplateElement;
    const template = Handlebars.compile(this.render());

    fragment.innerHTML = template({ ...this.state, ...this.props, children: this.children, refs: this.refs });

    /**
     * Заменяем заглушки на компоненты
     */
    Object.entries(this.children).forEach(([id, component]) => {
      /**
       * Ищем заглушку по id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      /**
       * Заменяем заглушку на component._element
       */
      const content = component.getContent();

      stub.replaceWith(content);

      /**
       * Ищем элемент layout-а, куда вставлять детей
       */
      const layoutContent = content.querySelector('[data-layout="1"]');

      if (layoutContent && stubChilds.length) {
        layoutContent.append(...stubChilds);
      }
    });

    return fragment.content;
  }

  show() {
    this.getContent().style.display = '';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
