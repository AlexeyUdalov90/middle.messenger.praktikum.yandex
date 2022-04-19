import { set } from '../utils';
import EventBus from './EventBus';

export enum StoreEvents {
  Updated = 'updated',
}

export class Store extends EventBus {
  private state: AppState = {
    isLoading: false,
    user: null
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}
