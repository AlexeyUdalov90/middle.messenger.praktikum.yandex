import { Block } from '../../core';
import './form-field.css';

interface FormFieldProps {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  label: string;
  value: string;
  name?: string;
  className?: string;
  error?: string;
}

export class FormField extends Block {
  constructor(props: FormFieldProps) {
    super({...props});
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  render() {
    // language=hbs
    return `
      <label class="form-field {{className}} {{#if error}}form-field_error{{/if}}">
        <span class="form-field__label">{{label}}</span>
        <input class="form-field__input" type="{{type}}" value="{{value}}" name="{{name}}" placeholder="{{placeholder}}" >
        <p class="form-field__error">{{error}}</p>
      </label>
    `;
  }
}
