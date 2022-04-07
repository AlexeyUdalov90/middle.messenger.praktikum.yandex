import { Block } from '../../core';
import '../../styles/profile.css';

export class ChangePasswordPage extends Block {
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
      <section class="section profile">
        <div class="left-bar profile__left">
          <a class="profile__back" href="./profile.html"></a>
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
    `;
  }
}
