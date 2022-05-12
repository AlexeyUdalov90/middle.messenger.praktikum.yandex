import { renderDOM, Block } from './index';
import { BlockClass } from './Block';

interface RouteProps {
  rootQuery: string;
}

export default class Route {
  private _pathname: string;
  private readonly _blockClass: BlockClass<unknown>;
  private _block: Nullable<Block<unknown>>;
  private _props: RouteProps;

  constructor(pathname: string, view: BlockClass<unknown>, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
    }

    renderDOM(this._props.rootQuery, this._block);
    this._block.show();
  }
}
