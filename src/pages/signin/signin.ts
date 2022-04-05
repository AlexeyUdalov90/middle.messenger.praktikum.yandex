import { Block } from '../../core';
import { checkValidation } from '../../services';
import '../../styles/login.css';

export class SignInPage extends Block {
  protected getStateFromProps() {
    this.state = {
      title: 'Регистрация',
      fields: {
        email: '',
        login: '',
        firstName: '',
        secondName: '',
        phone: '',
        password: ''
      },
      errors: {
        email: '',
        login: '',
        firstName: '',
        secondName: '',
        phone: '',
        password: ''
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
              <label class="form-field login__input">
                <span class="form-field__label">Почта</span>
                {{{Input
                  type="email"
                  name="email"
                  ref="email"
                  value="${fields.email}"
                  onBlurAndFocus=onBlurAndFocus
                }}}
                {{{InputError
                  className="form-field__error"
                  ref="emailError"
                  text="${errors.email}"
                }}}
              </label>
              <label class="form-field login__input">
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
              <label class="form-field login__input">
                <span class="form-field__label">Имя</span>
                {{{Input
                  type="text"
                  name="first_name"
                  ref="firstName"
                  value="${fields.firstName}"
                  onBlurAndFocus=onBlurAndFocus
                }}}
                {{{InputError
                  className="form-field__error"
                  ref="firstNameError"
                  text="${errors.firstName}"
                }}}
              </label>
              <label class="form-field login__input">
                <span class="form-field__label">Фамилия</span>
                {{{Input
                  type="text"
                  name="second_name"
                  ref="secondName"
                  value="${fields.secondName}"
                  onBlurAndFocus=onBlurAndFocus
                }}}
                {{{InputError
                  className="form-field__error"
                  ref="secondNameError"
                  text="${errors.secondName}"
                }}}
              </label>
              <label class="form-field login__input">
                <span class="form-field__label">Телефон</span>
                {{{Input
                  type="tel"
                  name="phone"
                  ref="phone"
                  value="${fields.phone}"
                  onBlurAndFocus=onBlurAndFocus
                }}}
                {{{InputError
                  className="form-field__error"
                  ref="secondNameError"
                  text="${errors.phone}"
                }}}
              </label>
              <label class="form-field login__input">
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
              {{{Button text="Зарегистрироваться" onClick=onClick}}}
            </form>
            <a class="login__link" href="./login.html">Войти</a>
          </div>
      </section>
    `;
  }
}
