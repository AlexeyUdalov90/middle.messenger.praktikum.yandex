import { Block } from '../../core';
import { checkValidation } from '../../services';
import '../../styles/login.css';

export class SignInPage extends Block {
  constructor() {
    super({
      events: {
        focusout: (e: Event) => {
          const input = e.target as HTMLInputElement;

          this.setState({
            [input.name]: {
              value: input.value,
              error: checkValidation(input.name, input.value)
            }
          });
        },
        submit: (e: Event) => {
          e.preventDefault();
          const nextSate = Object.entries(this.refs).reduce((res: any, [name, item]) => {
            const input = item.querySelector('input') as HTMLInputElement;

            if (input) {
              res[name] = {
                value: input.value,
                error: checkValidation(name, input.value)
              };
            }

            return res;
          }, {});

          this.setState(nextSate);

          const { email, login, firstName, secondName, phone, password } = this.state;

          console.log({
            email: email.value,
            login: login.value,
            'first_name': firstName.value,
            'second_name': secondName.value,
            phone: phone.value,
            password: password.value
          });
        }
      }
    });
  }

  protected getStateFromProps() {
    this.state = {
      title: 'Регистрация',
      email: {
        value: '',
        error: ''
      },
      login: {
        value: '',
        error: ''
      },
      firstName: {
        value: '',
        error: ''
      },
      secondName: {
        value: '',
        error: ''
      },
      phone: {
        value: '',
        error: ''
      },
      password: {
        value: '',
        error: ''
      }
    }
  }

  render() {
    const { email, login, firstName, secondName, phone, password } = this.state;

    // language=hbs
    return `
      <section class="section login">
        <div class="login__content">
          <h2 class="title login__title">{{title}}</h2>
            <form class="login__form">
              {{{FormField className="login__input" ref="email" label="Почта" type="email" name="email" value="${email.value}" error="${email.error}"}}}
              {{{FormField className="login__input" ref="login" label="Логин" type="text" name="login" value="${login.value}" error="${login.error}"}}}
              {{{FormField className="login__input" ref="firstName" label="Имя" type="text" name="firstName" value="${firstName.value}" error="${firstName.error}"}}}
              {{{FormField className="login__input" ref="secondName" label="Фамилия" type="text" name="secondName" value="${secondName.value}" error="${secondName.error}"}}}
              {{{FormField className="login__input" ref="phone" label="Телефон" type="tel" name="phone" value="${phone.value}" error="${phone.error}"}}}
              {{{FormField className="login__input" ref="password" label="Пароль" type="password" name="password" value="${password.value}" error="${password.error}"}}}
              {{{Button type="submit" text="Зарегистрироваться" className="login__button"}}}
            </form>
            <a class="login__link" href="./login.html">Войти</a>
          </div>
      </section>
    `;
  }
}
