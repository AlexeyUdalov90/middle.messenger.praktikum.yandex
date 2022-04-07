import { Block } from '../../core';
import { checkValidation } from '../../services';
import './form.css';

interface FormProps {
  className: string;
  buttonText: string;
  data: {
    [key: string]: InputData;
  }
}

interface InputData {
  type?: 'text' | 'password' | 'email' | 'tel';
  placeholder?: string;
  label: string;
  value: string;
  name?: string;
  error?: string;
  ref?: string;
}

interface SubmitData {
  [key: string]: string;
}

export class Form extends Block {
  static componentName = 'Form';

  constructor(props: FormProps) {
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

          const result: SubmitData = Object.entries(this.state.inputs).reduce((submitRes: any, [key, data ]) => {
            submitRes[key] = (data as InputData).value;

            return submitRes;
          }, {});

          console.log(result);
        }
      }
    });
  }

  protected getStateFromProps(props: FormProps) {
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
