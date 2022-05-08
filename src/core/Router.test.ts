import Block from './Block';
import Router from './Router';
import { getByTestId } from '@testing-library/dom';

enum PATH {
  default = '/',
  messenger = '/messenger'
}

class MockLoginPage extends Block<any> {
  render () {
    return `<div data-testid="login"></div>`
  }
}

class MockMessengerPage extends Block<any> {
  render () {
    return `<div data-testid="messenger"></div>`
  }
}

describe('core/Router', () => {
  let router: Nullable<Router> = null;

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    router = new Router('#app');

    window.router = router;

    router
      .use(PATH.default, MockLoginPage)
      .use(PATH.messenger, MockMessengerPage)
      .start();
  });

  it('default login page', () => {
    expect(getByTestId(document.body, 'login')).toBeInTheDocument();
    expect(window.location.pathname).toEqual(PATH.default);
  });

  it('go messenger page', () => {
    router?.go(PATH.messenger);

    setTimeout(() => {
      expect(getByTestId(document.body, 'messenger')).toBeInTheDocument();
      expect(window.location.pathname).toEqual(PATH.messenger);
    }, 0);
  });

  it('window history length', () => {
    expect(window.history.length).toEqual(2);
  });

  it('window history work', () => {
    window.history.back();

    setTimeout(() => {
      expect(getByTestId(document.body, 'login')).toBeInTheDocument();
      expect(window.location.pathname).toEqual(PATH.default);
    }, 0);
  })
})
