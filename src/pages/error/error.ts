import { Block } from '../../core';
import './error.css';

export class ErrorPage extends Block {
  static componentName = 'ErrorPage';

  render() {
    // language=hbs
    return `
      <section class="section error-page">
        <h1 class="error-page__title">404</h1>
        <p class="error-page__message">Не туда попали</p>
        {{{Link className="error-page__link" to="/chats" text="Назад к чатам"}}}
      </section>
    `;
  }
}
