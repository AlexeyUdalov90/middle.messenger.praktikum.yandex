import { BlockClass, StoreEvents } from '../core';

export function withStore<P>(WrappedBlock: BlockClass<unknown>, mapStateToProps: (state: AppState) => Record<string, unknown>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, ...mapStateToProps(window.store.getState()) });
    }

    __onChangeStoreCallback = () => {
      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, ...mapStateToProps(window.store.getState()) });
    }

    componentDidMount() {
      window.store.on(StoreEvents.Updated, this.__onChangeStoreCallback);
      super.componentDidMount();
    }

    componentWillUnmount() {
      window.store.off(StoreEvents.Updated, this.__onChangeStoreCallback);
      super.componentWillUnmount();
    }

  } as BlockClass<unknown>;
}
