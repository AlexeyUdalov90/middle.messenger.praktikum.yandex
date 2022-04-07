import { Block } from '../../core';
import { ButtonI } from '../../interfaces';
import './button.css';

export class Button extends Block {
  static componentName = 'Button';

  constructor({ type = 'button', ...props }: ButtonI) {
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
