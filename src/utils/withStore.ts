import { Block, store, StoreEvents } from '../core';
import { isEqual } from './index';

type WithStateProps = { store: AppState };

export function withStore<P extends WithStateProps>(Component: typeof Block, mapStateToProps: (state: AppState) => { isLoading: boolean }) {
  // используем class expression
  return class extends Component<P> {
    public static componentName = Component.componentName || Component.name;

    constructor(props: P) {
      // не забываем передать все аргументы конструктора
      super({ ...props, ...mapStateToProps(store.getState()) });

      // сохраняем начальное состояние
      let state = mapStateToProps(store.getState());

      // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        // при обновлении получаем новое состояние
        const newState = mapStateToProps(store.getState());

        // если что-то из используемых данных поменялось, обновляем компонент
        if (!isEqual(state, newState)) {
          // вызываем обновление компонента, передав данные из хранилища
          this.setProps({...this.props, ...newState});
          // не забываем сохранить новое состояние
          state = newState;
        }
      });
    }
  }
}
