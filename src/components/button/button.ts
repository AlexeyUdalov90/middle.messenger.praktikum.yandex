import {Block} from '../../core';
import './button.css';

interface ButtonProps {
  text: string,
  className?: string,
  onClick: () => {}
}

export class Button extends Block {
  constructor({ onClick, ...otherProps }: ButtonProps) {
    super({
      ...otherProps,
      events: {
        click: onClick
      }
    });
  }

  render() {
    // language=hbs
    return `
        <button class="button {{className}}" type="button">{{text}}</button>
    `;
  }
}
