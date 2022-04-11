import { Block } from '../../core';
import '../../styles/profile.css';

export class ProfilePage extends Block {
  static componentName = 'ProfilePage';

  protected getStateFromProps() {
    this.state = {
      data: {
        email: {
          name: 'Почта',
          value: 'pochta@yandex.ru'
        },
        login: {
          name: 'Логин',
          value: 'ivanivanov'
        },
        firstName: {
          name: 'Имя',
          value: 'Иван'
        },
        secondName: {
          name: 'Фамилия',
          value: 'Иванов'
        },
        displayName: {
          name: 'Имя в чате',
          value: 'Иван'
        },
        phone: {
          name: 'Телефон',
          value: '+79099673030'
        }
      }
    }
  }

  render() {
    // language=hbs

    return `
      <section class="section profile">
        <div class="left-bar profile__left">
          {{{Link className="profile__back" to="/chats"}}}
        </div>
        <div class="profile__right">
          <div class="profile__content">
            <div class="profile__avatar">
              {{{Avatar}}}
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
                {{{Button className="button_text profile-data__logout-button" text="Выйти"}}}
              </li>
            </ul>
          </div>
        </div>
      </section>
    `;
  }
}
