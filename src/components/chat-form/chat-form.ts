import { Block } from '../../core';
import './chat-form.css';

type ChatFormProps = {
  onSubmit: (data: Record<string, unknown>) => void;
  events: Record<string, (e: Event) => void>;
};

export class ChatForm extends Block<ChatFormProps> {
  static componentName = 'ChatForm';

  constructor (props: ChatFormProps) {
    super({
      ...props,
      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const input = this.element?.querySelector<HTMLInputElement>('input');

          if (input && input.value) {
            props.onSubmit({
              content: input.value,
              type: 'message'
            });

            input.value = '';
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
