import { set } from '../utils';
import EventBus from './EventBus';

export enum StoreEvents {
  Updated = 'updated',
}

export class Store<State extends Record<string, unknown>> extends EventBus {
  private readonly state: State = {} as State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
  }

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}
