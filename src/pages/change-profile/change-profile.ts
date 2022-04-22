import { Block, Router } from '../../core';
import '../../styles/profile.css';
import { withStore, withRouter } from '../../utils';
import { changeProfile } from '../../services/user';
import {ChangeProfileRequestData} from '../../api/types';

type ChangeProfilePageProps = {
  router: Router;
  isLoading: boolean;
  isAuth: boolean;
  user: User;
  onSubmit: (data: ChangeProfileRequestData) => void;
}

class ChangeProfilePage extends Block<ChangeProfilePageProps> {
  static componentName = 'ChangeProfilePage';

  constructor(props: ChangeProfilePageProps) {
    super({
      ...props,
      onSubmit: (data: ChangeProfileRequestData) => {
        changeProfile(data);
      }
    });
  }

  componentDidMount() {
    if (!this.props.isAuth) {
      this.props.router.go('/')
    }
  }

  protected getStateFromProps(props: ChangeProfilePageProps) {
    this.state = {
      inputs: {
        email: {
          label: 'Почта',
          ref: 'email',
          name: 'email',
          type: 'email',
          value: props.user.email,
          error: ''
        },
        login: {
          label: 'Логин',
          ref: 'login',
          name: 'login',
          type: 'text',
          value: props.user.login,
          error: ''
        },
        firstName: {
          label: 'Имя',
          ref: 'firstName',
          name: 'firstName',
          type: 'text',
          value: props.user.firstName,
          error: ''
        },
        secondName: {
          label: 'Фамилия',
          ref: 'secondName',
          name: 'secondName',
          type: 'text',
          value: props.user.secondName,
          error: ''
        },
        displayName: {
          label: 'Имя в чате',
          ref: 'displayName',
          name: 'displayName',
          type: 'text',
          value: props.user.displayName ? props.user.displayName : '',
          error: ''
        },
        phone: {
          label: 'Телефон',
          ref: 'phone',
          name: 'phone',
          type: 'tel',
          value: props.user.phone,
          error: ''
        }
      }
    }
  }

  render () {
    // language=hbs

    return `
        {{#Layout name="ChangeProfilePage" isLoading=isLoading}}
            <section class="section profile">
                <div class="left-bar profile__left">
                    {{{Link className="profile__back" to="/profile"}}}
                </div>
                <div class="profile__right">
                    <div class="profile__content">
                        <div class="profile__avatar profile__avatar_without-name">
                            {{{Avatar}}}
                        </div>
                        {{{Form className="profile__form" data=inputs buttonText="Сохранить" onSubmit=onSubmit}}}
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

export default withRouter(withStore(ChangeProfilePage, mapStateToProps));
