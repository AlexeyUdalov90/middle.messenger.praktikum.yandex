import {Block} from '../../core';
import './input-error.css';

interface InputErrorProps {
  text: string;
  className: string;
}

export class InputError extends Block {
  constructor(props: InputErrorProps) {
    super({ ...props });
  }

  render() {
    // language=hbs
    return `
      <p class="input-error {{className}}">{{text}}</p>
    `;
  }
}
