import { Block } from '../../core';
import { MessageI } from '../../interfaces';
import './message.css';

export class Message extends Block {
  static componentName = 'Message';

  constructor(props: MessageI) {
    super({ ...props });
  }

  render () {
    // language=hbs

    return `
      <div class="message {{#if isMy}}my{{/if}} {{className}}">
        <p class="message__text">{{text}}</p>
        <div class="message__info">
          {{#if isMy}}
            <span class="message__status"></span>
          {{/if}}
          <span class="message__time">{{time}}</span>
        </div>
      </div>
    `;
  }
}
