import 'regenerator-runtime/runtime';
import { registerComponent, Router, Store } from './core';
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
import components from './components';

Object.values(components).forEach(component => {
  registerComponent(component);
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
    .use('/sign-up', SignInPage)
    .use('/messenger', MessengerPage)
    .use('/settings', ProfilePage)
    .use('/settings-profile', ChangeProfilePage)
    .use('/settings-password', ChangePasswordPage)
    .use('/error', ErrorPage)
    .use('*', ErrorPage);

  /**
   * Загружаем данные для приложения
   */
  setTimeout(async () => {
    await initApp();
    router.start();
  }, 100);
});
