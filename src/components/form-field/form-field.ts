import { Block } from '../../core';
import './form-field.css';
import { checkValidation } from '../../services';

export class FormField extends Block<Input> {
  static componentName = 'FormField';

  constructor({type = 'text', ...props}: Input) {
    super({
      ...props,
      type,
      events: {
        focusout: (e) => {
          const input = e.target as HTMLInputElement;

          if (input.tagName === 'INPUT') {
            const { name, value } = input;
            const error = checkValidation(name, value);
            const errorBlock = input.nextElementSibling as HTMLElement;

            if (value !== this.props.value) {
              this.setProps({
                ...this.props,
                value,
                error
              });
            }

            if (errorBlock && errorBlock.classList.contains('form-field__error') && error) {
              errorBlock.style.display = 'block';
            }
          }

        },
        focusin: (e) => {
          const input = e.target as HTMLInputElement;
          const errorBlock = input.nextElementSibling as HTMLElement;

          if (errorBlock && errorBlock.classList.contains('form-field__error')) {
            errorBlock.style.display = 'none';
          }
        }
      }
    });
  }

  render() {
    // language=hbs

    return `
      <label class="form-field {{className}} {{#if error}}form-field_error{{/if}}">
        <span class="form-field__label">{{label}}</span>
        <input class="form-field__input" type="{{type}}" value="{{value}}" name="{{name}}" placeholder="{{placeholder}}">
        <p class="form-field__error">{{error}}</p>
      </label>
    `;
  }
}
