import { Block } from '../../core';
import './add-chat.css';
import { createChat } from '../../services';

type AddChatProps = {
  events: Record<string, (e: Event) => void>;
}

export class AddChat extends Block<AddChatProps> {
  static componentName = 'AddChat';

  constructor() {
    super({
      events: {
        click: (e) => {
          const element = e.target as HTMLElement;

          if (element.classList.contains('js-add-chat-button') && !this.state.isOpenModal) {
            this.setState({
              ...this.state,
              isOpenModal: true
            });

            return;
          }

          if (this.state.isOpenModal && !element.closest('.js-modal-content')) {
            this.setState({
              ...this.state,
              isOpenModal: false
            });

            return;
          }
        },
        submit: (e) => {
          e.preventDefault();

          const newState = Object.entries(this.refs).reduce((res: any, [name, item]) => {
            const input = item.querySelector<HTMLInputElement>('input');

            if (input) {
              res[name] = input.value;
            }

            return res;
          }, {});

          this.setState({
            ...this.state,
            ...newState
          })

          if (this.state.chatTitle) {
            createChat({
              title: this.state.chatTitle
            }).finally(() => {
              this.setState({
                chatTitle: '',
                isOpenModal: false
              })
            })
          }
        }
      }
    });
  }

  protected getStateFromProps() {
    this.state = {
      chatTitle: '',
      isOpenModal: false
    }
  }

  render() {
    // language=hbs
    return `
        <div class="add-chat">
            <button class="add-chat__button js-add-chat-button">+</button>
            <div class="modal {{#if isOpenModal}}modal_open{{/if}} add-chat__modal">
                <div class="modal__content js-modal-content">
                    <span class="modal__title">Создать чат</span>
                    <form class="form modal__form" name="avatar">
                        {{{FormField className="form__input" ref="chatTitle" label="Название чата" type="text" name="title" value=chatTitle}}}
                        {{{Button type="submit" text="Создать" className="modal__button"}}}
                    </form>
                </div>
            </div>
        </div>
    `;
  }
}
