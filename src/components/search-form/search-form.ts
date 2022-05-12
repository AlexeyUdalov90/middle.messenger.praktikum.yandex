import { Block } from '../../core';
import './search-form.css';

type SearchFormProps = {
  value?: string;
  onSubmit?: () => void;
  events: Record<string, () => void>;
}

export class SearchForm extends Block<SearchFormProps> {
  static componentName = 'SearchForm';

  constructor({ onSubmit, ...props }: SearchFormProps) {
    super({
      ...props,
      events: {
        submit: () => {
          if (typeof onSubmit === 'function') {
            onSubmit();
          }
        }
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
