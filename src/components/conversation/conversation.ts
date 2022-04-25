import { Block } from '../../core';
import './conversation.css';
import { dateFormat } from '../../utils';

type ConversationProps = {
  id: number;
  title: string;
  avatar: Nullable<string>;
  unreadCount: number;
  lastMessage: Nullable<LastMessage>;
  activeChatId: Nullable<number>;
  events: Record<string, () => void>;
};

export class Conversation extends Block<ConversationProps> {
  static componentName = 'Conversation';

  constructor(props: ConversationProps) {
    super({
      ...props,
      events: {
        click: () => {
          if (this.state.id !== props.activeChatId) {
            window.store.set('activeChatId', this.state.id);
          }
        }
      }
    });
  }

  protected getStateFromProps(props: ConversationProps) {
    this.state = {
      id: props.id,
      title: props.title,
      avatar: props.avatar,
      unreadCount: props.unreadCount,
      lastMessage: null,
      isActive: Boolean(props.id === props.activeChatId),
    }

    if (props.lastMessage) {
      this.state.lastMessage = {
        user: props.lastMessage.user,
        content: props.lastMessage.content,
        time: dateFormat(props.lastMessage.time)
      }
    }
  }

  render () {
    // language=hbs

    return `
      <div class="conversation {{#if isActive}}active{{/if}} {{className}}">
        <div class="conversation__content">
          <div class="conversation__avatar">
              {{#if avatar}}
                  <img src={{avatar}} alt="">
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
