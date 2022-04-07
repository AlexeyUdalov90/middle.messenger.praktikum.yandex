import {Block} from '../../core';
import './avatar.css';

export class Avatar extends Block {
  static componentName = 'Avatar';

  render() {
    // language=hbs
    return `
      <button class="avatar">
        <span class="avatar__text">Поменять<br>аватар</span>
      </button>
    `;
  }
}
