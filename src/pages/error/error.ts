import { Block } from '../../core';
import './error.css';
import { withStore } from '../../utils';

type ErrorPageProps = {
  isLoading: boolean;
}

class ErrorPage extends Block<ErrorPageProps> {
  static componentName = 'ErrorPage';

  render() {
    // language=hbs
    return `
        {{#Layout name="ErrorPage" isLoading=isLoading}}
            <section class="section error-page">
                <h1 class="error-page__title">404</h1>
                <p class="error-page__message">Не туда попали</p>
                {{{Link className="error-page__link" to="/messenger" text="Назад к чатам"}}}
            </section>
        {{/Layout}}

    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.isLoading
});

export default withStore(ErrorPage, mapStateToProps);
