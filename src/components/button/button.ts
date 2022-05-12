import { Block } from '../../core';
import './button.css';

type ButtonProps = {
  text: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  events: Record<string, () => void>;
}

export class Button extends Block<ButtonProps> {
  static componentName = 'Button';

  constructor({ type = 'button', onClick, ...props }: ButtonProps) {
    super({
      ...props,
      type,
      events: {
        click: () => {
          if (typeof onClick === 'function') {
            onClick()
          }
        }
      }
    });
  }

  render() {
    // language=hbs
    return `
        <button class="button {{className}}" type="{{type}}" {{#if disabled}}disabled="{{disabled}}"{{/if}}>{{text}}</button>
    `;
  }
}
