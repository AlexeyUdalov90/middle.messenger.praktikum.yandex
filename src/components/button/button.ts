import { Block } from '../../core';
import './button.css';

type ButtonProps = {
  text: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onCLick?: () => void;
  events: Record<string, any>;
}

export class Button extends Block<ButtonProps> {
  static componentName = 'Button';

  constructor({ type = 'button', onCLick, ...props }: ButtonProps) {
    super({
      ...props,
      type,
      events: {
        click: () => {
          if (typeof onCLick === 'function') {
            onCLick()
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
