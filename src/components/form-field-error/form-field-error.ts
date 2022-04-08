import { Block } from '../../core';
import { IFormFieldError } from '../../interfaces';

export class FormFieldError extends Block {
  static componentName = 'FormFieldError';

  protected getStateFromProps(props: IFormFieldError) {
    this.state = { ...props };
  }

  render () {
    const { error } = this.state;
    // language=hbs

    return `<p class="form-field__error" data-id="${this.id}">${error}</p>`;
  }
}
