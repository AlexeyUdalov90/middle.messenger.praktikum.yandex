import { Block, Router } from '../../core';
import '../../styles/profile.css';
import { withStore, withRouter } from '../../utils';

type ChangePasswordPageProps = {
  router: Router;
  isLoading: boolean;
}

class ChangePasswordPage extends Block<ChangePasswordPageProps> {
  static componentName = 'ChangePasswordPage';

  protected getStateFromProps() {
    this.state = {
      inputs: {
        oldPassword: {
          label: 'Старый пароль',
          ref: 'oldPassword',
          name: 'oldPassword',
          type: 'password',
          value: '',
          error: ''
        },
        newPassword: {
          label: 'Новый пароль',
          ref: 'newPassword',
          name: 'newPassword',
          type: 'password',
          value: '',
          error: ''
        },
        repeatPassword: {
          label: 'Повторите новый пароль',
          ref: 'repeatPassword',
          name: 'repeatPassword',
          type: 'password',
          value: '',
          error: ''
        }
      }
    }
  }

  render () {
    // language=hbs

    return `
        {{#Layout name="ChangePasswordPage" isLoading=isLoading}}
            <section class="section profile">
                <div class="left-bar profile__left">
                    {{{Link className="profile__back" router=router to="/profile"}}}
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

export default withRouter(withStore(ChangePasswordPage, mapStateToProps));
