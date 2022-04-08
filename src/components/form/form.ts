import { Block } from '../../core';
import { checkValidation } from '../../services';
import { IForm, ISubmitForm, IFormField } from '../../interfaces';
import './form.css';

export class Form extends Block {
  static componentName = 'Form';

  constructor(props: IForm) {
    super({
      ...props,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const newInputsState = Object.entries(this.refs).reduce((res: any, [name, item]) => {
            const input = item.querySelector<HTMLInputElement>('input');

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

          const result: ISubmitForm = Object.entries(this.state.inputs).reduce((submitRes: any, [key, data ]) => {
            submitRes[key] = (data as IFormField).value;

            return submitRes;
          }, {});

          console.log(result);
        }
      }
    });
  }

  protected getStateFromProps(props: IForm) {
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
