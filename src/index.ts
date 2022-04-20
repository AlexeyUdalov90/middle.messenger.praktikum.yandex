import { Block, registerComponent, Router, Store } from './core';
import './styles/style.css';
import { defaultState } from './store';
import { initApp } from './services';
import LoginPage from './pages/login';
import SignInPage from './pages/signin';
import MessengerPage from './pages/messenger';
import ProfilePage from './pages/profile';
import ChangeProfilePage from './pages/change-profile';
import ChangePasswordPage from './pages/change-password';
import ErrorPage from './pages/error';

const components = require('./components/**/index.ts') as {[key: string]: { default: typeof Block }};

Object.values(components).forEach(component => {
  registerComponent(component.default);
});

declare global {
  interface Window {
    store: Store<AppState>;
    router: Router;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new Router('#app');

  window.router = router;
  window.store = store;

  router
    .use('/', LoginPage)
    .use('/signin', SignInPage)
    .use('/chats', MessengerPage)
    .use('/profile', ProfilePage)
    .use('/change-profile', ChangeProfilePage)
    .use('/change-password', ChangePasswordPage)
    .use('/error', ErrorPage)
    .use('*', ErrorPage)
    .start();

  /**
   * Загружаем данные для приложения
   */
  setTimeout(() => {
    initApp();
  }, 100);
});
