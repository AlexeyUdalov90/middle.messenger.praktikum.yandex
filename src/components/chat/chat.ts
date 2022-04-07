import { Block } from '../../core';
import { ChatI } from '../../interfaces';
import './chat.css'

export class Chat extends Block {
  static componentName = 'Chat';

  constructor(props: ChatI) {
    super({...props});
  }

  render () {
    // language=hbs

    return `
      <div class="chat {{#if data}}not-empty{{/if}}">
        {{#if data}}
          <div class="chat__top">
            <div class="chat__avatar"></div>
            <span class="chat__user-name">Вадим</span>
            <button class="chat__setting-btn"></button>
          </div>
          <div class="chat__content">
            {{#each data.messages}}
              {{{Message
                  className="chat__message"
                  text=text
                  time=time
                  isMy=isMy
              }}}
            {{/each}}
            <span class="chat__date">19 июня</span>
          </div>
          <div class="chat__bottom">
            {{{ChatForm}}}
          </div>
        {{else}}
          <p class="chat__empty-message">Выберите чат чтобы отправить сообщение</p>
        {{/if}}
      </div>
    `;
  }
}
