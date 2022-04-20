import { renderDOM, Block } from './index';
import { BlockClass } from './Block';

function isEqual(lhs: any, rhs: any) {
  return lhs === rhs;
}

interface RouteProps {
  rootQuery: string;
}

export default class Route {
  private _pathname: string;
  private readonly _blockClass: BlockClass<any>;
  private _block: Nullable<Block<P>>;
  private _props: RouteProps;

  constructor(pathname: string, view: BlockClass<any>, props: RouteProps) {
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
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass();
    }

    renderDOM(this._props.rootQuery, this._block);
    this._block.show();
  }
}
