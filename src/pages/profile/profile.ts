import {Block, Router} from '../../core';
import '../../styles/profile.css';
import { logout } from '../../services/auth';
import { withStore, withRouter } from '../../utils';

type ProfilePageProps = {
  router: Router;
  isLoading: boolean;
  isAuth: boolean;
  user: User;
  onLogout?: () => void;
};

class ProfilePage extends Block<ProfilePageProps> {
  static componentName = 'ProfilePage';

  constructor(props: ProfilePageProps) {
    super({
      ...props,
      onLogout: () => {
        logout()
      }
    });

    this.getStateFromProps(props);
  }

  componentDidMount() {
    if (!this.props.isAuth) {
      this.props.router.go('/')
    }
  }

  protected getStateFromProps(props: ProfilePageProps) {
    this.state = {
      data: {
        email: {
          name: 'Почта',
          value: props.user.email
        },
        login: {
          name: 'Логин',
          value: props.user.login
        },
        firstName: {
          name: 'Имя',
          value: props.user.firstName
        },
        secondName: {
          name: 'Фамилия',
          value: props.user.secondName
        },
        displayName: {
          name: 'Имя в чате',
          value: props.user.displayName
        },
        phone: {
          name: 'Телефон',
          value: props.user.phone
        }
      }
    }
  }

  render() {
    // language=hbs

    return `
        {{#Layout name="ProfilePage" isLoading=isLoading}}
            <section class="section profile">
                <div class="left-bar profile__left">
                    {{{Link className="profile__back" to="/chats"}}}
                </div>
                <div class="profile__right">
                    <div class="profile__content">
                        <div class="profile__avatar">
                            {{{Avatar avatar=user.avatar}}}
                        </div>
                        <span class="profile__user-name">{{data.displayName.value}}</span>
                        <ul class="profile-data profile__user-data">
                            {{#each data}}
                                <li class="profile-data__item">
                                    <span class="profile-data__name">{{name}}</span>
                                    <span class="profile-data__value">{{value}}</span>
                                </li>
                            {{/each}}
                        </ul>
                        <ul class="profile-data">
                            <li class="profile-data__item">
                                {{{Link to="/change-profile" text="Изменить данные"}}}
                            </li>
                            <li class="profile-data__item">
                                {{{Link to="/change-password" text="Изменить пароль"}}}
                            </li>
                            <li class="profile-data__item">
                                {{{Button className="button_text profile-data__logout-button" text="Выйти" onCLick=onLogout}}}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        {{/Layout}}
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.isLoading,
  isAuth: state.isAuth,
  user: state.user
});

export default withRouter(withStore(ProfilePage, mapStateToProps));
