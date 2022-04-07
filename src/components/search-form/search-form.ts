import { Block } from '../../core';
import { SearchFormI } from '../../interfaces';
import './search-form.css';

export class SearchForm extends Block {
  static componentName = 'SearchForm';

  constructor({ onSubmit, ...props }: SearchFormI) {
    super({
      ...props,
      events: {
        submit: onSubmit
      }
    });
  }

  render () {
    // language=hbs

    return `
      <form class="search">
        <input class="search__input" type="search" value="{{value}}" placeholder="Поиск">
        <button class="search__button"></button>
      </form>
    `;
  }
}
