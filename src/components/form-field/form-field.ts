import { Block } from '../../core';
import { checkValidation } from '../../services';
import { FormFieldI } from '../../interfaces';
import './form-field.css';

export class FormField extends Block {
  static componentName = 'FormField';

  constructor(props: FormFieldI) {
    super({
      ...props,
      events: {
        focusout: (e: Event) => {
          const input = e.target as HTMLInputElement;

          if (input.value !== this.state.value) {
            this.setState({
              value: input.value,
              error: checkValidation(input.name, input.value)
            });
          }
        },
        focusin: (e: Event) => {
          const input = e.target as HTMLInputElement;
          const idErrorComp: string = this.refs.error.dataset.id ?? '';

          this.setChildState(idErrorComp, {
            error: checkValidation(input.name, input.value)
          });
        }
      }
    });
  }

  protected getStateFromProps({ value, error }: any) {
    this.state = {
      value,
      error
    };
  }

  render() {
    const { value, error } = this.state;
    // language=hbs

    return `
      <label class="form-field {{className}} form-field_error">
        <span class="form-field__label">{{label}}</span>
        <input class="form-field__input" type="{{type}}" value="${value}" name="{{name}}" placeholder="{{placeholder}}">
        {{{FormFieldError ref="error" error="${error}"}}}
      </label>
    `;
  }
}
