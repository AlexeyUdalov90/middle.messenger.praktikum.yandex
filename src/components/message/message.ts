import { Block } from '../../core';
import './message.css';
import { dateFormat } from '../../utils';

type MessageProps = {
  className: string;
  data: ChatMessage;
  userId: number;
}

export class Message extends Block<MessageProps> {
  static componentName = 'Message';

  constructor(props: MessageProps) {
    super({ ...props });
  }

  protected getStateFromProps(props: MessageProps) {
    this.state = {
      time: dateFormat(props.data.time),
      text: props.data.content,
      isRead: props.data.isRead && props.userId === props.data.userId,
      isMy: props.userId === props.data.userId
    }
  }

  render () {
    // language=hbs

    return `
      <div class="message {{#if isMy}}my{{/if}} {{className}}">
        <p class="message__text">{{text}}</p>
        <div class="message__info">
          {{#if isRead}}
            <span class="message__status"></span>
          {{/if}}
          <time class="message__time">{{time}}</time>
        </div>
      </div>
    `;
  }
}
