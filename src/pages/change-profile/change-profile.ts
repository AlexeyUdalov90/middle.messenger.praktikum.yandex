import { Block, Router } from '../../core';
import '../../styles/profile.css';
import { withStore, withRouter } from '../../utils';

type ChangeProfilePageProps = {
  router: Router;
  isLoading: boolean;
}

class ChangeProfilePage extends Block<ChangeProfilePageProps> {
  static componentName = 'ChangeProfilePage';

  protected getStateFromProps() {
    this.state = {
      inputs: {
        email: {
          label: 'Почта',
          ref: 'email',
          name: 'email',
          type: 'email',
          value: 'pochta@yandex.ru',
          error: ''
        },
        login: {
          label: 'Логин',
          ref: 'login',
          name: 'login',
          type: 'text',
          value: 'ivanivanov',
          error: ''
        },
        firstName: {
          label: 'Имя',
          ref: 'firstName',
          name: 'firstName',
          type: 'text',
          value: 'Иван',
          error: ''
        },
        secondName: {
          label: 'Фамилия',
          ref: 'secondName',
          name: 'secondName',
          type: 'text',
          value: 'Иванов',
          error: ''
        },
        displayName: {
          label: 'Имя в чате',
          ref: 'displayName',
          name: 'displayName',
          type: 'text',
          value: 'Иван',
          error: ''
        },
        phone: {
          label: 'Телефон',
          ref: 'phone',
          name: 'phone',
          type: 'tel',
          value: '+79099673030',
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
                        {{{Form className="profile__form" data=inputs buttonText="Сохранить"}}}
                    </div>
                </div>
            </section>
        {{/Layout}}
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.isLoading
});

export default withRouter(withStore(ChangeProfilePage, mapStateToProps));
