import { Block } from '../../core';
import './conversation.css';
import {dateFormat, withStore} from '../../utils';

type ConversationProps = {
  data: Chat;
  activeChatId: Nullable<number>;
  userLogin: string;
  onClick: (id: number) => void;
  events: Record<string, () => void>;
};

class Conversation extends Block<ConversationProps> {
  static componentName = 'Conversation';

  constructor(props: ConversationProps) {
    super({
      ...props,
      events: {
        click: () => {
          if (this.state.id !== props.activeChatId) {
            props.onClick(this.state.id);
          }
        }
      }
    });
  }

  protected getStateFromProps(props: ConversationProps) {
    this.state = {
      id: props.data.id,
      title: props.data.title,
      avatar: props.data.avatar,
      unreadCount: props.data.unreadCount,
      lastMessage: null,
      isActive: Boolean(props.data.id === props.activeChatId),
      isPersonal: false
    }

    if (props.data.lastMessage) {
      this.state.lastMessage = {
        user: props.data.lastMessage.user,
        content: props.data.lastMessage.content,
        time: dateFormat(props.data.lastMessage.time)
      }

      this.state.isPersonal = props.data.lastMessage.user.login === props.userLogin
    }
  }

  render () {
    // language=hbs

    return `
      <div class="conversation {{#if isActive}}active{{/if}} {{className}}">
        <div class="conversation__content">
          <div class="conversation__avatar">
              {{#if avatar}}
                  <img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="Аватар чата">
              {{/if}}
          </div>
          <div class="conversation__wrapper">
            <span class="conversation__name">{{title}}</span>
            <span class="conversation__last-message">
              {{#if isPersonal}}
                <span class="conversation__you">Вы: </span>
              {{/if}}
              {{lastMessage.content}}
            </span>
            <span class="conversation__time">{{lastMessage.time}}</span>
            {{#if unreadCount}}
              <span class="conversation__badge">{{unreadCount}}</span>
            {{/if}}
          </div>
        </div>
      </div>
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  userLogin: state.user?.login
});

export default withStore(Conversation, mapStateToProps);
