import { Block } from '../../core';
import { checkValidation } from '../../services';
import '../../styles/login.css'

export class LoginPage extends Block {
  static componentName = 'LoginPage';

  constructor() {
    super({
      events: {
        submit: (e: Event): void => {
          e.preventDefault();
          const newInputsState = Object.entries(this.refs).reduce((res: any, [name, item]) => {
            const input = item.querySelector('input') as HTMLInputElement;

            if (input) {
              res[name] = {
                ...this.state.inputs[name],
                value: input.value,
                error: checkValidation(name, input.value)
              };
            }

            return res;
          }, {});

          this.setState({
            inputs: { ...newInputsState }
          });

          const { login, password } = this.state.inputs;

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
          <form class="login__form">
            {{#each inputs}}
              {{{FormField className="login__input" ref=ref label=label type=type name=name value=value error=error}}}
            {{/each}}
            {{{Button type="submit" text="Авторизоваться" className="login__button"}}}
          </form>
          <a class="login__link" href="./signin.html">Нет аккаунта?</a>
        </div>
      </section>
    `;
  }
}
