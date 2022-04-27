import { Block } from '../../core';
import './layout.css';

interface LayoutProps {
  isLoading: boolean;
}

export class Layout extends Block<LayoutProps> {
  static componentName = 'Layout';

  render() {
    // language=hbs

    return `
        <div class="page {{#if isLoading}}loading{{/if}}">
            <div class="page__loader"></div>
            <div class="page__content" data-layout=1></div>
        </div>
    `;
  }
}
