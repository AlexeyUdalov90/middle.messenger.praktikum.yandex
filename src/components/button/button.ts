import { Block } from '../../core';
import { IButton } from '../../interfaces';
import './button.css';

export class Button extends Block {
  static componentName = 'Button';

  constructor({ type = 'button', ...props }: IButton) {
    super({
      ...props,
      type
    });
  }

  render() {
    // language=hbs
    return `
        <button class="button {{className}}" type="{{type}}" {{#if disabled}}disabled="{{disabled}}"{{/if}}>{{text}}</button>
    `;
  }
}
