import { Block } from '../../core';
import { checkValidation } from '../../services';
import '../../styles/login.css'

export class LoginPage extends Block {
  constructor() {
    super({
      events: {
        focusout: (e: Event) => {
          const input = e.target as HTMLInputElement;

          if (input.value !== this.state.inputs[input.name].value) {
            this.setState({
              inputs: {
                ...this.state.inputs,
                [input.name]: {
                  ...this.state.inputs[input.name],
                  value: input.value,
                  error: checkValidation(input.name, input.value),
                  isFocus: false
                }
              }
            });
          }

          console.log(`Blur ${input.name}`, { ...this.state.inputs });
        },
        focusin: (e: Event) => {
          const input = e.target as HTMLInputElement;

          if (!this.state.inputs[input.name].isFocus) {
            this.setState({
              inputs: {
                ...this.state.inputs,
                [input.name]: {
                  ...this.state.inputs[input.name],
                  value: input.value,
                  error: checkValidation(input.name, input.value),
                  isFocus: true
                }
              }
            });
          }

          console.log(`Focus ${input.name}`, { ...this.state.inputs });
        },
        submit: (e: Event) => {
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
          error: '',
          isFocus: false
        },
        password: {
          label: 'Пароль',
          ref: 'password',
          name: 'password',
          type: 'password',
          value: '',
          error: '',
          isFocus: false
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
              {{{FormField className="login__input" ref=ref label=label type=type name=name value=value error=error isFocus=isFocus}}}
            {{/each}}
            {{{Button type="submit" text="Авторизоваться" className="login__button"}}}
          </form>
          <a class="login__link" href="./signin.html">Нет аккаунта?</a>
        </div>
      </section>
    `;
  }
}
