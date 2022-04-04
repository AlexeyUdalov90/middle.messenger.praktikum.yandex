import { Block } from '../../core';
import './input.css';

interface InputProps {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  name?: string;
  className?: string;
  onBlurAndFocus: () => {}
}

export class Input extends Block {
  constructor({ type = 'text', onBlurAndFocus, ...otherProps }: InputProps) {
    const props = {
      type,
      ...otherProps,
      events: {
        blur: onBlurAndFocus,
        focus: onBlurAndFocus
      }
    };

    super({...props});
  }

  render() {
    // language=hbs
    return `
      <input class="input {{className}}" type="{{type}}" name="{{name}}" value="{{value}}" placeholder="{{placeholder}}">
    `;
  }
}
