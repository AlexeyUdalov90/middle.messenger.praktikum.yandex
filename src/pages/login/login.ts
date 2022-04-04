import { Block } from '../../core';
import './login.css';
import { checkValidation } from '../../services';

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
      onClick: (): void => {
        const inputs: Array<HTMLInputElement> = [
          (this.refs['login'] as HTMLInputElement),
          (this.refs['password'] as HTMLInputElement)
        ];

        inputs.forEach(input => this.setChildProps(`${input.name}Error`, { text: checkValidation(input.name, input.value) }));

        console.log(inputs.reduce((res: { [key: string]: string }, input) => {
          res[input.name] = input.value;

          return res;
        }, {}));
      },
      onBlurAndFocus: (e: InputEvent): void => {
        const input = e.target as HTMLInputElement;

        this.setChildProps(`${input.name}Error`, { text: checkValidation(input.name, input.value) })
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
                  ref="passwordError"
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
