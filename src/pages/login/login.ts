import { Block } from '../../core';
import { checkValidation } from '../../services';
import '../../styles/login.css'

export class LoginPage extends Block {
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
        focusin: (e: Event) => {
          const input = e.target as HTMLInputElement;

          this.setState({
            errors: {
              ...this.state.errors,
              [input.name]: ''
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
      title: 'Вход',
      fields: {
        login: '',
        password: ''
      },
      errors: {
        login: '',
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
            {{{FormField className="login__input" ref="login" label="Логин" type="text" name="login" value="${fields.login}" error="${errors.login}"}}}
            {{{FormField className="login__input" ref="password" label="Пароль" type="password" name="password" value="${fields.password}" error="${errors.password}"}}}
            {{{Button type="submit" text="Авторизоваться" className="login__button"}}}
          </form>
          <a class="login__link" href="./signin.html">Нет аккаунта?</a>
        </div>
      </section>
    `;
  }
}
