import { Block } from '../../core';
import { ConversationI } from '../../interfaces';
import './conversation.css';

export class Conversation extends Block {
  static componentName = 'Conversation';

  constructor(props: ConversationI) {
    super({...props});
  }

  render () {
    // language=hbs

    return `
      <div class="conversation {{#if isActive}}active{{/if}} {{className}}">
        <div class="conversation__content">
          <div class="conversation__avatar"></div>
          <div class="conversation__wrapper">
            <span class="conversation__name">{{userName}}</span>
            <span class="conversation__last-message">
              {{#if message.isPersonal}}
                <span class="conversation__you">Вы: </span>
              {{/if}}
              {{message.text}}
            </span>
            <span class="conversation__time">{{date}}</span>
            {{#if newMessages}}
              <span class="conversation__badge">{{newMessages}}</span>
            {{/if}}
          </div>
        </div>
      </div>
    `;
  }
}
