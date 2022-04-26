import { Block } from '../../core';
import './chat.css'
import { addUser, deleteUser, getToken } from '../../services';
import { isArray, transformMessage } from '../../utils';

type ChatProps = {
  chat: Chat;
  userId: number;
  events: Record<string, (e: Event) => void>;
  onSendMessage: (data: Record<string, any>) => void;
};

export class Chat extends Block<ChatProps> {
  static componentName = 'Chat';

  private webSocket?: Nullable<WebSocket>;

  constructor(props: ChatProps) {
    super({
      ...props,
      onSendMessage: (data) => {
        this.webSocket?.send(JSON.stringify(data));
      },
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

          if (this.state.isOpenAddUserModal && this.props.chat) {
            const input = this.refs?.addUserLogin.querySelector<HTMLInputElement>('input');

            addUser({
              login: input?.value ?? '',
              chatId: Number(this.props.chat.id)
            }).finally(() => {
              this.setState({
                ...this.state,
                isOpenAddUserModal: false
              });
            })
          }

          if (this.state.isOpenDeleteUserModal && this.props.chat) {
            const input = this.refs?.deleteUserLogin.querySelector<HTMLInputElement>('input');

            deleteUser({
              login: input?.value ?? '',
              chatId: Number(this.props.chat.id)
            }).finally(() => {
              this.setState({
                ...this.state,
                isOpenDeleteUserModal: false
              });
            })
          }
        }
      }
    });
  }

  protected getStateFromProps() {
    this.state = {
      isOpenAddUserModal: false,
      isOpenDeleteUserModal: false,
      messages: [],
      intervalId: null
    }
  }

  componentDidMount() {
    if (!this.webSocket) {
      getToken(Number(this.props.chat.id))
        .then(token => {
          this.webSocket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.props.userId}/${Number(this.props.chat.id)}/${token}`);

          this.webSocket.addEventListener('open', () => {
            console.log('WS open');

            this.webSocket?.send(JSON.stringify({
              content: '0',
              type: 'get old'
            }));

            this.state.intervalId = setInterval(() => {
              this.webSocket?.send(JSON.stringify({
                type: 'ping'
              }))
            }, 1000);
          })

          this.webSocket.addEventListener('message', (e: MessageEvent) => {
            try {
              const data = JSON.parse(e.data);

              if (isArray(data)) {
                this.setState({
                  ...this.state,
                  messages: data.map(message => transformMessage.fromDTO(message))
                });
              } else {
                if (data.type === 'message') {
                  this.setState({
                    ...this.state,
                    messages: [
                      ...[transformMessage.fromDTO(data)],
                      ...this.state.messages
                    ]
                  });
                }
              }
            } catch (err) {
              console.error(err);
            }
          })

          this.webSocket.addEventListener('error', (e) => {
            console.log((e as ErrorEvent).message);
            this.webSocket?.close();
          })

          this.webSocket.addEventListener('close', (e: CloseEvent) => {
            console.log('Close WS');

            clearInterval(this.state.intervalId);
            this.state.timeoutId = null;

            if (!e.wasClean) {
              console.log(`Code: ${e.code} | Reason: ${e.reason}`);
            }
          })
        })
    }
  }

  componentWillUnmount() {
    if (this.webSocket) {
      this.webSocket.close();
    }
  }

  render () {
    // language=hbs

    return `
      <div class="chat">
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
              {{#each messages}}
                  {{{Message
                      className="chat__message"
                      data=this
                      userId=@root.userId
                  }}}
              {{/each}}
          </div>
          <div class="chat__bottom">
            {{{ChatForm onSubmit=onSendMessage}}}
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
      </div>
    `;
  }
}
