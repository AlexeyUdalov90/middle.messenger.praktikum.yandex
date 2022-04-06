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
            fields: {
              ...this.state.fields,
              [input.name]: input.value
            },
            errors: {
              ...this.state.errors,
              [input.name]: checkValidation(input.name, input.value)
            }
          });
        },
        submit: (e: Event) => {
          e.preventDefault();
          const errors = Object.entries(this.refs).reduce((res: any, [name, item]) => {
            const input = item.querySelector('input') as HTMLInputElement;

            if (input) {
              res[name] = checkValidation(name, input.value);
            }

            return res;
          }, {});

          this.setState({
            errors: {
              ...errors
            }
          });

          console.log(this.state.fields);
        }
      }
    });
  }

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
              {{{FormField className="login__input" label="Почта" type="email" name="email" value="${fields.email}" error="${errors.email}"}}}
              {{{FormField className="login__input" label="Логин" type="text" name="login" value="${fields.login}" error="${errors.login}"}}}
              {{{FormField className="login__input" label="Имя" type="text" name="first_name" value="${fields.firstName}" error="${errors.firstName}"}}}
              {{{FormField className="login__input" label="Фамилия" type="text" name="second_name" value="${fields.secondName}" error="${errors.secondName}"}}}
              {{{FormField className="login__input" label="Телефон" type="tel" name="phone" value="${fields.phone}" error="${errors.phone}"}}}
              {{{FormField className="login__input" label="Пароль" type="password" name="password" value="${fields.password}" error="${errors.password}"}}}
              {{{Button type="submit" text="Зарегистрироваться" className="login__button"}}}
            </form>
            <a class="login__link" href="./login.html">Войти</a>
          </div>
      </section>
    `;
  }
}
