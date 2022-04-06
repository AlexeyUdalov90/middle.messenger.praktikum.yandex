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
            [input.name]: {
              value: input.value,
              error: checkValidation(input.name, input.value)
            }
          });
        },
        // focusin: (e: Event) => {
        //   const input = e.target as HTMLInputElement;
        //
        //   this.setState({
        //     [input.name]: {
        //       value: input.value,
        //       error: checkValidation(input.name, input.value)
        //     }
        //   });
        // },
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

          const { login, password } = this.state;

          console.log({
            login: login.value,
            password: password.value
          });
        }
      }
    });
  }

  protected getStateFromProps() {
    this.state = {
      title: 'Вход',
      login: {
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
    const { login, password } = this.state;

    // language=hbs
    return `
      <section class="section login">
        <div class="login__content">
          <h2 class="title login__title">{{title}}</h2>
          <form class="login__form">
            {{{FormField className="login__input" ref="login" label="Логин" type="text" name="login" value="${login.value}" error="${login.error}" autofocus="${login.autofocus}"}}}
            {{{FormField className="login__input" ref="password" label="Пароль" type="password" name="password" value="${password.value}" error="${password.error}" autofocus="${password.autofocus}"}}}
            {{{Button type="submit" text="Авторизоваться" className="login__button"}}}
          </form>
          <a class="login__link" href="./signin.html">Нет аккаунта?</a>
        </div>
      </section>
    `;
  }
}
