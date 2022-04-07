import { Block } from '../../core';
import { checkValidation } from '../../services';
import { FormI, SubmitFormI, FormFieldI } from '../../interfaces';
import './form.css';

export class Form extends Block {
  static componentName = 'Form';

  constructor(props: FormI) {
    super({
      ...props,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const newInputsState = Object.entries(this.refs).reduce((res: any, [name, item]) => {
            const input = item.querySelector('input') as HTMLInputElement;

            if (input) {
              res[name] = {
                ...this.state.inputs[name],
                value: input.value,
                error: checkValidation(name, input.value)
              };
            }

            return res;
          }, {});

          this.setState({
            inputs: { ...newInputsState }
          });

          const result: SubmitFormI = Object.entries(this.state.inputs).reduce((submitRes: any, [key, data ]) => {
            submitRes[key] = (data as FormFieldI).value;

            return submitRes;
          }, {});

          console.log(result);
        }
      }
    });
  }

  protected getStateFromProps(props: FormI) {
    this.state = {
      inputs: { ...props.data }
    }
  }

  render () {
    // language=hbs

    return `
      <form class="form {{className}}">
        {{#each inputs}}
          {{{FormField className="form__input" ref=ref label=label type=type name=name value=value error=error}}}
        {{/each}}
        {{{Button type="submit" text=buttonText className="form__button"}}}
      </form>
    `;
  }
}
