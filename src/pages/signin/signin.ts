import { Block, Router } from '../../core';
import '../../styles/login.css';
import { checkValidation, createUser } from '../../services';
import { withStore, withRouter } from '../../utils';
import {IFormField} from '../../interfaces';

type SignInPageProps = {
  router: Router;
  isLoading: boolean;
  isAuth: boolean;
  events: Record<string, (e: Event) => void>;
};

class SignInPage extends Block<SignInPageProps> {
  static componentName = 'SignInPage';

  constructor(props: SignInPageProps) {
    super({
      ...props,
      events: {
        submit: (e) => {
          e.preventDefault();

          const newInputsState = Object.entries(this.refs).reduce((res: any, [name, item]) => {
            const input = item.querySelector<HTMLInputElement>('input');

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

          const isInvalid = Object.values(this.state.inputs).some(input => Boolean((input as IFormField).error));

          if (!isInvalid) {
            const result = Object.entries(this.state.inputs).reduce((submitRes: any, [key, data]) => {
              submitRes[key] = (data as IFormField).value;

              return submitRes;
            }, {});

            createUser(result);
          }
        }
      }
    });
  }

  componentDidMount() {
    if (this.props.isAuth) {
      this.props.router.go('/messenger')
    }
  }

  protected getStateFromProps() {
    this.state = {
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
        {{#Layout name="SignInPage" isLoading=isLoading}}
            <section class="section login">
                <div class="login__content">
                    <h2 class="title login__title">Регистрация</h2>
                    <form class="form login__form">
                        {{#each inputs}}
                            {{{FormField className="form__input" ref=ref label=label type=type name=name value=value error=error}}}
                        {{/each}}
                        {{{Button type="submit" text="Зарегистрироваться" className="form__button"}}}
                    </form>
                    {{{Link className="login__link" to="/" text="Войти"}}}
                </div>
            </section>
        {{/Layout}}
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.isLoading,
  isAuth: state.isAuth
});

export default withRouter(withStore(SignInPage, mapStateToProps));
