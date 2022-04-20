import { Block, store, router } from '../../core';
import '../../styles/login.css'
import { LoginRequestData } from '../../api/types';
import { login } from '../../services/auth';
import { withStore } from '../../utils';

class LoginPage extends Block {
  static componentName = 'LoginPage';

  constructor() {
    super({
      onSubmit: async (data: LoginRequestData) => {
        await login(data);
      }
    });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (store.getState().user) {
      router.go('/chats')
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  protected getStateFromProps() {
    this.state = {
      title: 'Вход',
      inputs: {
        login: {
          label: 'Логин',
          ref: 'login',
          name: 'login',
          type: 'text',
          value: '',
          error: ''
        },
        password: {
          label: 'Пароль',
          ref: 'password',
          name: 'password',
          type: 'password',
          value: '',
          error: ''
        }
      }
    }
  }

  render() {
    // language=hbs

    return `
        {{#Layout name="LoginPage" isLoading=isLoading}}
            <section class="section login">
                <div class="login__content">
                    <h2 class="title login__title">{{title}}</h2>
                    {{{Form className="login__form" data=inputs buttonText="Авторизоваться" onSubmit=onSubmit}}}
                    {{{Link className="login__link" to="/signin" text="Нет аккаунта?"}}}
                </div>
            </section>
        {{/Layout}}
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.isLoading
});

export default withStore(LoginPage, mapStateToProps)
