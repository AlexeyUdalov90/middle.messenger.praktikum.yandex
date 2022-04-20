import { Block, store, router } from '../../core';
import '../../styles/login.css';
import { createUser } from '../../services/auth';
import { withStore } from '../../utils';

class SignInPage extends Block {
  static componentName = 'SignInPage';

  constructor() {
    super({
      onSubmit: async (data: CreateUserData) => {
        await createUser(data);
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
      title: 'Регистрация',
      inputs: {
        email: {
          label: 'Почта',
          ref: 'email',
          name: 'email',
          type: 'email',
          value: '',
          error: ''
        },
        login: {
          label: 'Логин',
          ref: 'login',
          name: 'login',
          type: 'text',
          value: '',
          error: ''
        },
        firstName: {
          label: 'Имя',
          ref: 'firstName',
          name: 'firstName',
          type: 'text',
          value: '',
          error: ''
        },
        secondName: {
          label: 'Фамилия',
          ref: 'secondName',
          name: 'secondName',
          type: 'text',
          value: '',
          error: ''
        },
        phone: {
          label: 'Телефон',
          ref: 'phone',
          name: 'phone',
          type: 'tel',
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
        {{#Layout name="SignInPage" isLoading=isLoading}}
            <section class="section login">
                <div class="login__content">
                    <h2 class="title login__title">{{title}}</h2>
                    {{{Form className="login__form" data=inputs buttonText="Зарегистрироваться" onSubmit=onSubmit}}}
                    {{{Link className="login__link" to="/" text="Войти"}}}
                </div>
            </section>
        {{/Layout}}
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.isLoading
});

export default withStore(SignInPage, mapStateToProps)
