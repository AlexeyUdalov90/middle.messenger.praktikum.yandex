import Route from './Route';
import { BlockClass } from './Block';

export default class Router {
  protected routes: Array<Route> = [];
  protected history: History = window.history;
  private _currentRoute: Nullable<Route> = null;
  private readonly _rootQuery: string = '';
  static __instance: Router;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: BlockClass<any>, props: PlainObject = {}): Router {
    const route = new Route(pathname, block, { ...props, rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (route) {
      if (this._currentRoute) {
        this._currentRoute.leave();
      }

      this._currentRoute = route;
      route.render();
    }
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    const route = this.routes.find(route => route.match(pathname));

    return route || this.routes.find(route => route.match('*'));
  }
}
