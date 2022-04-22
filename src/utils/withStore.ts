import { BlockClass, StoreEvents } from '../core';
// import { isEqual } from './index';

// type WithStateProps = { store: Store<AppState> };

export function withStore<P>(WrappedBlock: BlockClass<P>, mapStateToProps: (state: AppState) => Record<string, unknown>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, ...mapStateToProps(window.store.getState()) });
    }

    __onChangeStoreCallback = () => {
      // console.log('Update store')
      // console.log('Props store :', this.props.store.getState())
      // console.log('Window store :', window.store.getState())

      // @ts-expect-error this is not typed
      // if (!isEqual(this.props.store.getState(), ...mapStateToProps(window.store.getState()))) {
      //
      // }

      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, ...mapStateToProps(window.store.getState()) });
    }

    componentDidMount(props: P) {
      window.store.on(StoreEvents.Updated, this.__onChangeStoreCallback);
      super.componentDidMount(props);
    }

    componentWillUnmount() {
      window.store.off(StoreEvents.Updated, this.__onChangeStoreCallback);
      super.componentWillUnmount();
    }

  } as BlockClass<P>;
}

// export function withStore<P extends WithStateProps>(Component: typeof Block, mapStateToProps: (state: AppState) => { isLoading: boolean }) {
//   // используем class expression
//   return class extends Component<P> {
//     public static componentName = Component.componentName || Component.name;
//
//     constructor(props: P) {
//       // не забываем передать все аргументы конструктора
//       super({ ...props, ...mapStateToProps(store.getState()) });
//     }
//
//     _onChangeStoreCallback = () => {
//       // вызываем обновление компонента, передав данные из хранилища
//       this.setProps({...this.props, ...mapStateToProps(store.getState())});
//     }
//
//     componentDidMount(props: P) {
//       super.componentDidMount(props);
//       store.on(StoreEvents.Updated, this._onChangeStoreCallback);
//     }
//
//     componentWillUnmount() {
//       super.componentWillUnmount();
//       store.off(StoreEvents.Updated, this._onChangeStoreCallback);
//     }
//   }
// }
