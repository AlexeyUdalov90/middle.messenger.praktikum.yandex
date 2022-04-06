import {Block} from '../../core';
import './button.css';

interface ButtonProps {
  text: string,
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export class Button extends Block {
  constructor({ type = 'button', ...props }: ButtonProps) {
    super({
      ...props,
      type
    });
  }

  render() {
    // language=hbs
    return `
        <button class="button {{className}}" type="{{type}}">{{text}}</button>
    `;
  }
}
