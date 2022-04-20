import { Block, Router } from '../../core';
import './error.css';
import { withStore, withRouter } from '../../utils';

type ErrorPageProps = {
  router: Router;
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
                {{{Link className="error-page__link" router=router to="/chats" text="Назад к чатам"}}}
            </section>
        {{/Layout}}

    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.isLoading
});

export default withRouter(withStore(ErrorPage, mapStateToProps));
