import { Block } from '../../core';
import './chat.css'

type ChatProps = {
  chat: Nullable<Chat>;
  events: Record<string, (e: Event) => void>
}

export class Chat extends Block<ChatProps> {
  static componentName = 'Chat';

  constructor(props: ChatProps) {
    super({
      ...props,
      events: {
        click: (e) => {
          const element = e.target as HTMLElement;

          if (element.classList.contains('js-add-user') && !this.state.isOpenAddUserModal) {
            this.setState({
              ...this.state,
              isOpenAddUserModal: true
            });

            return;
          }

          if (element.classList.contains('js-delete-user') && !this.state.isOpenDeleteUserModal) {
            this.setState({
              ...this.state,
              isOpenDeleteUserModal: true
            });

            return;
          }

          if (this.state.isOpenAddUserModal && !element.closest('.js-modal-add-user')) {
            this.setState({
              ...this.state,
              isOpenAddUserModal: false
            });

            return;
          }

          if (this.state.isOpenDeleteUserModal && !element.closest('.js-modal-delete-user')) {
            this.setState({
              ...this.state,
              isOpenDeleteUserModal: false
            });

            return;
          }
        },
        submit: (e) => {
          e.preventDefault();

          if (this.state.isOpenAddUserModal) {
            const input = this.refs?.addUserLogin.querySelector<HTMLInputElement>('input');

            console.log('Add user login: ', input?.value);
          }

          if (this.state.isOpenDeleteUserModal) {
            const input = this.refs?.deleteUserLogin.querySelector<HTMLInputElement>('input');

            console.log('Delete user login: ', input?.value);
          }
        }
      }
    });
  }

  protected getStateFromProps() {
    this.state = {
      isOpenAddUserModal: false,
      isOpenDeleteUserModal: false
    }
  }

  render () {
    // language=hbs

    return `
      <div class="chat {{#if chat}}not-empty{{/if}}">
        {{#if chat}}
          <div class="chat__top">
            <div class="chat__avatar">
                {{#if chat.avatar}}
                    <img src={{chat.avatar}} alt="">
                {{/if}}
            </div>
            <span class="chat__user-name">{{chat.title}}</span>
            <div class="chat__setting">
              <button class="chat__setting-btn"></button>
              <div class="chat__setting-menu">
                  <div class="chat__setting-wrapper">
                      <button class="chat__add-user js-add-user"><span></span>Добавить пользователя</button>
                      <button class="chat__delete-user js-delete-user"><span></span>Удалить пользователя</button>
                  </div>
              </div>
            </div>
          </div>
          <div class="chat__content">
              {{#if chat.messages}}
                  {{#each data.messages}}
                      {{{Message
                              className="chat__message"
                              text=text
                              time=time
                              isMy=isMy
                      }}}
                  {{/each}}
                  <span class="chat__date">19 июня</span>
              {{/if}}
          </div>
          <div class="chat__bottom">
            {{{ChatForm}}}
          </div>
          <div class="modal {{#if isOpenAddUserModal}}modal_open{{/if}} chat__add-user-modal">
              <div class="modal__content js-modal-add-user">
                  <span class="modal__title">Добавить пользователя</span>
                  <form class="form modal__form">
                      {{{FormField className="form__input" ref="addUserLogin" label="Логин" type="text" name="login"}}}
                      {{{Button type="submit" text="Добавить" className="modal__button"}}}
                  </form>
              </div>
          </div>
          <div class="modal {{#if isOpenDeleteUserModal}}modal_open{{/if}} chat__delete-user-modal">
              <div class="modal__content js-modal-delete-user">
                  <span class="modal__title">Удалить пользователя</span>
                  <form class="form modal__form">
                      {{{FormField className="form__input" ref="deleteUserLogin" label="Логин" type="text" name="login"}}}
                      {{{Button type="submit" text="Удалить" className="modal__button"}}}
                  </form>
              </div>
          </div>
        {{else}}
          <p class="chat__empty-message">Выберите чат чтобы отправить сообщение</p>
        {{/if}}
      </div>
    `;
  }
}
