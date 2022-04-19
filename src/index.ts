import { Block, registerComponent, Router, Store } from './core';
import './styles/style.css';
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
    store: Store;
    router: Router;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router('#app');
  const store = new Store();

  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   */
  window.router = router;
  window.store = store;

  console.log(process.env.API_BASE_URL)

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
