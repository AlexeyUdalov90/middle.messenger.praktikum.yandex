import EventBus from './EventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

interface BlockMeta<P = any> {
  props: P;
}

type Events = Values<typeof Block.EVENTS>;

export default class Block<P = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);
  private readonly _meta: BlockMeta;

  protected _element: Nullable<HTMLElement> = null;
  protected readonly props: P;
  protected children: {[id: string]: Block} = {};

  eventBus: () => EventBus<Events>;

  protected state: any = {};
  protected refs: {[key: string]: HTMLElement} = {};
  protected ref: string = '';

  public constructor(props?: P) {
    const eventBus = new EventBus<Events>();

    this._meta = {
      props,
    };

    this.getStateFromProps(props)

    this.props = this._makePropsProxy(props || {} as P);
    this.state = this._makePropsProxy(this.state);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected getStateFromProps(props: any): void {
    this.state = {};
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  componentDidMount(props: P) {}

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }

    this._render();
  }

  componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  setRef(ref: string) {
    if (!ref) {
      return;
    }
    this.ref = ref;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  setChildProps(ref: string, props: P) {
    const child = Object.values(this.children).find(comp => comp.ref === ref);

    if (!child || !props) {
      return;
    }

    child.setProps(props);
  }

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this._compile();
    const newElement = fragment.firstElementChild!;

    if (this._element) {
      this._removeEvents();
      this._element!.replaceWith(newElement);
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

    return this.element!;
  }

  _makePropsProxy(props: any): any {
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

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  _compile(): DocumentFragment {
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

      /**
       * Заменяем заглушку на component._element
       */
      stub.replaceWith(component.getContent());
    });

    return fragment.content;
  }


  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
