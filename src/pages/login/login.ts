import { Block } from '../../core';
import './login.css';
import validation from '../../services/validation';

export class LoginPage extends Block {
  protected getStateFromProps() {
    this.state = {
      title: 'Вход',
      fields: {
        login: '',
        password: ''
      },
      errors: {
        login: '',
        password: ''
      },
      onClick: () => {
        console.log({
          login: (this.refs['login'] as HTMLInputElement).value,
          password: (this.refs['password'] as HTMLInputElement).value
        })
      },
      onBlurAndFocus: (e: InputEvent) => {
        const input = e.target as HTMLInputElement;

        console.log(`Input ${input.name} validation: `, validation(input.value));

        this.setChildProps(`${input.name}Error`, { text: validation(input.value) })
      }
    }
  }

  render() {
    const { fields, errors } = this.state;

    // language=hbs
    return `
      <section class="section login">
        <div class="login__content">
          <h2 class="title login__title">{{title}}</h2>
          <form class="login__form">
            <label class="login__input form-field">
              <span class="form-field__label">Логин</span>
              {{{Input
                  type="text"
                  name="login"
                  ref="login"
                  value="${fields.login}"
                  onBlurAndFocus=onBlurAndFocus
              }}}
              {{{InputError
                  className="form-field__error"
                  ref="loginError"
                  text="${errors.login}"
              }}}
            </label>
            <label class="login__input form-field">
              <span class="form-field__label">Пароль</span>
              {{{Input
                  type="password"
                  name="password"
                  ref="password"
                  value="${fields.password}"
                  onBlurAndFocus=onBlurAndFocus
              }}}
              {{{InputError
                  className="form-field__error"
                  ref="psswordError"
                  text="${errors.password}"
              }}}
            </label>
            {{{Button text="Авторизоваться" onClick=onClick}}}
          </form>
          <a class="login__link" href="#">Нет аккаунта?</a>
        </div>
      </section>
    `;
  }
}
