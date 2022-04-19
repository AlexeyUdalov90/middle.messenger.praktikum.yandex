import { Block } from '../../core';
import '../../styles/login.css'
import { LoginRequestData } from '../../api/types';
import { login } from '../../services/auth';

export class LoginPage extends Block {
  static componentName = 'LoginPage';

  constructor() {
    super({
      onSubmit: async (data: LoginRequestData) => {
        await login(data);
      }
    });
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
      <section class="section login">
        <div class="login__content">
          <h2 class="title login__title">{{title}}</h2>
          {{{Form className="login__form" data=inputs buttonText="Авторизоваться" onSubmit=onSubmit}}}
          {{{Link className="login__link" to="/signin" text="Нет аккаунта?"}}}
        </div>
      </section>
    `;
  }
}
