import { Block } from '../../core';
import './profile.css';

export class ProfilePage extends Block {
  protected getStateFromProps() {
    this.state = {
      email: 'pochta@yandex.ru',
      login: 'ivanivanov',
      firstName: 'Иван',
      secondName: 'Иванов',
      displayName: 'Иван',
      phone: '+79099673030'
    }
  }

  render() {
    // language=hbs

    return `
      <section class="section profile">
        <div class="left-bar profile__left">
          <a class="profile__back" href="./messenger.html"></a>
        </div>
        <div class="profile__right">
          <div class="profile__content">
            <div class="profile__avatar">
              {{{Avatar}}}
            </div>
            <span class="profile__user-name">{{displayName}}</span>
            <ul class="profile-data profile__user-data">
              <li class="profile-data__item">
                <span class="profile-data__name">Почта</span>
                <span class="profile-data__value">{{email}}</span>
              </li>
              <li class="profile-data__item">
                <span class="profile-data__name">Логин</span>
                <span class="profile-data__value">{{login}}</span>
              </li>
              <li class="profile-data__item">
                <span class="profile-data__name">Имя</span>
                <span class="profile-data__value">{{firstName}}</span>
              </li>
              <li class="profile-data__item">
                <span class="profile-data__name">Фамилия</span>
                <span class="profile-data__value">{{secondName}}</span>
              </li>
              <li class="profile-data__item">
                <span class="profile-data__name">Имя в чате</span>
                <span class="profile-data__value">{{displayName}}</span>
              </li>
              <li class="profile-data__item">
                <span class="profile-data__name">Телефон</span>
                <span class="profile-data__value">{{phone}}</span>
              </li>
            </ul>
            <ul class="profile-data">
              <li class="profile-data__item">
                <a href="./change-profile.html">Изменить данные</a>
              </li>
              <li class="profile-data__item">
                <a href="./change-password.html">Изменить пароль</a>
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
