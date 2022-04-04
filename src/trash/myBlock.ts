import EventBus from '../core/EventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

interface BlockMeta<P = any> {
  props: P;
}

type Events = Values<typeof MyBlock.EVENTS>;

export default class MyBlock {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: "flow:render"
  }as const;

  public id = nanoid(6);

  protected _element: Nullable<HTMLElement> = null;
  private readonly _meta: BlockMeta;
  protected readonly props: P;
  protected children: {[id: string]: MyBlock} = {};
  protected state: any = {};
  protected refs: {[key: string]: HTMLElement} = {};

  eventBus: () => EventBus<Events>;

  // _element = null;
  // _meta = null;

  /** JSDoc
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(props?:P = {}) {
    // const eventBus = new EventBus();

    this._meta  = {
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(MyBlock.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(MyBlock.EVENTS.INIT, this.init.bind(this));
    eventBus.on(MyBlock.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(MyBlock.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(MyBlock.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;

    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(MyBlock.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount(this.props);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(props) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(MyBlock.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this._render();
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    // Здесь должна быть проверка
    // Если пропсы не поменялись, перерендер не нужен, если явно не переопределён в классе блока такой метод. Метод должен вернуть значение boolean. Если true — компоненту нужно перерендерить, если false — не нужно.
    return true;
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();

    this._removeEvents();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = block;
    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    // const self = this;

    return new Proxy(props, {
      get: (target, prop) => {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет прав');
        }

        const value = target[prop];

        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет прав');
        }

        const oldTarget = Object.assign({}, target)

        target[prop] = value;

        this.eventBus().emit(MyBlock.EVENTS.FLOW_CDU, oldTarget, target);

        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет прав');
      }
    });
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  _addEvents() {
    const events = this.props.events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element.addEventListener(event, listener);
    });
  }

  _removeEvents() {
    const events = this.props.events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element.removeEventListener(event, listener);
    });
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

// Пример использования

class Button extends MyBlock {
  constructor(props) {
    // Создаём враппер дом-элемент button
    super("button", props);
  }

  render() {
    // В проекте должен быть ваш собственный шаблонизатор
    return `<div>${this.props.text}</div>`;
  }
}

function render(query, block) {
  const root = document.querySelector(query);

  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
}

const button = new Button({
  text: 'Click me',
});

// app — это class дива в корне DOM
render(".app", button);

// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
  button.setProps({
    text: 'Click me, please',
  });
}, 1000);
