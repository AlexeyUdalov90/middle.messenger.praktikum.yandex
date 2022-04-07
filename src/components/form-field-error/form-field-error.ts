import { Block } from '../../core';
import { FormFieldErrorI } from '../../interfaces';

export class FormFieldError extends Block {
  static componentName = 'FormFieldError';

  protected getStateFromProps(props: FormFieldErrorI) {
    this.state = { ...props };
  }

  render () {
    const { error } = this.state;
    // language=hbs

    return `<p class="form-field__error" data-id="${this.id}">${error}</p>`;
  }
}
