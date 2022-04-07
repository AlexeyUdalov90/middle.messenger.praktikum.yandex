import { Block } from '../../core';
import { checkValidation } from '../../services';
import '../../styles/login.css';

export class SignInPage extends Block {
  static componentName = 'SignInPage';

  constructor() {
    super({
      events: {
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

          const { email, login, firstName, secondName, phone, password } = this.state.inputs;

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
      inputs: {
        email: {
          label: 'Почта',
          ref: 'email',
          name: 'email',
          type: 'email',
          value: '',
          error: ''
        },
        login: {
          label: 'Логин',
          ref: 'login',
          name: 'login',
          type: 'text',
          value: '',
          error: ''
        },
        firstName: {
          label: 'Имя',
          ref: 'firstName',
          name: 'firstName',
          type: 'text',
          value: '',
          error: ''
        },
        secondName: {
          label: 'Фамилия',
          ref: 'secondName',
          name: 'secondName',
          type: 'text',
          value: '',
          error: ''
        },
        phone: {
          label: 'Телефон',
          ref: 'phone',
          name: 'phone',
          type: 'tel',
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
              {{{Button type="submit" text="Зарегистрироваться" className="login__button"}}}
            </form>
            <a class="login__link" href="./login.html">Войти</a>
          </div>
      </section>
    `;
  }
}
