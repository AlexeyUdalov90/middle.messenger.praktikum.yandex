import { Block, Router } from '../../core';
import '../../styles/login.css'
import { LoginRequestData } from '../../api/types';
import { withStore, withRouter } from '../../utils';
import { checkValidation, login } from '../../services';

type LoginPageProps = {
  router: Router;
  isLoading: boolean;
  isAuth: boolean;
  events: Record<string, (e: Event) => void>;
  onSubmit?: (data: LoginRequestData) => void;
};

class LoginPage extends Block<LoginPageProps> {
  static componentName = 'LoginPage';

  constructor(props: LoginPageProps) {
    super({
      ...props,
      events: {
        submit: (e) => {
          e.preventDefault();

          const newInputsState = Object.entries(this.refs).reduce((res: Record<string, unknown>, [name, item]) => {
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

          const isInvalid = Object.values(this.state.inputs).some(input => Boolean((input as Input).error));

          if (!isInvalid) {
            const result = Object.entries(this.state.inputs).reduce((submitRes: Record<string, unknown>, [key, data ]) => {
              submitRes[key] = (data as Input).value;

              return submitRes;
            }, {});

            login(result as LoginRequestData);
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
        {{#Layout name="LoginPage" isLoading=isLoading}}
            <section class="section login">
                <div class="login__content">
                    <h2 class="title login__title">Вход</h2>
                    <form class="form login__form">
                        {{#each inputs}}
                            {{{FormField className="form__input" ref=ref label=label type=type name=name value=value error=error}}}
                        {{/each}}
                        {{{Button type="submit" text="Авторизоваться" className="form__button"}}}
                    </form>
                    {{{Link className="login__link" to="/sign-up" text="Нет аккаунта?"}}}
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

export default withRouter(withStore(LoginPage, mapStateToProps));
