import { Block } from '../../core';
import { IFormField } from '../../interfaces';
import './form-field.css';

export class FormField extends Block<IFormField> {
  static componentName = 'FormField';

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
