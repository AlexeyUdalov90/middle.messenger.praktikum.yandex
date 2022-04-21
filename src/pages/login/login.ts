import { Block, Router } from '../../core';
import '../../styles/login.css'
import { LoginRequestData } from '../../api/types';
import { login } from '../../services/auth';
import { withStore, withRouter } from '../../utils';

type LoginPageProps = {
  router: Router;
  isLoading: boolean;
  isAuth: boolean;
  onSubmit?: (data: LoginRequestData) => void;
};

class LoginPage extends Block<LoginPageProps> {
  static componentName = 'LoginPage';

  constructor(props: LoginPageProps) {
    super({
      ...props,
      onSubmit: (data): void => {
        login(data);
      }
    });
  }

  componentDidMount() {
    if (this.props.isAuth) {
      this.props.router.go('/chats')
    }
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
        {{#Layout name="LoginPage" isLoading=isLoading}}
            <section class="section login">
                <div class="login__content">
                    <h2 class="title login__title">{{title}}</h2>
                    {{{Form className="login__form" data=inputs buttonText="Авторизоваться" onSubmit=onSubmit}}}
                    {{{Link className="login__link" to="/signin" text="Нет аккаунта?"}}}
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
