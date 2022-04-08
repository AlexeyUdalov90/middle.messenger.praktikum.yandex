import { Block } from '../../core';
import '../../styles/login.css'

export class LoginPage extends Block {
  static componentName = 'LoginPage';

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
          {{{Form className="login__form" data=inputs buttonText="Авторизоваться"}}}
          <a class="login__link" href="./signin.html">Нет аккаунта?</a>
        </div>
      </section>
    `;
  }
}
