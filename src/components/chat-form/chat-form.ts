import { Block } from '../../core';
import './chat-form.css';

export class ChatForm extends Block {
  static componentName = 'ChatForm';

  constructor () {
    super({
      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const input = this.element?.querySelector('input') as HTMLInputElement;

          if (input && input.value) {
            console.log({
              message: input.value
            })
          }
        }
      }
    });
  }

  render () {
    // language=hbs

    return `
      <form class="chat-form">
        <button class="chat-form__add-file-btn" type="button"></button>
        <input class="chat-form__input" type="text" name="message" placeholder="Сообщение">
        <button class="chat-form__submit-btn" type="submit"></button>
      </form>
    `;
  }
}
