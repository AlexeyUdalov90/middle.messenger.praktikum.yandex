import { Block, registerComponent, Router } from './core';
import './styles/style.css';
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

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router('#app');

  // TODO: Нужно добавить путь / и это будет MessengerPage и если пользователь не авториован то редиректить на /login
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
});
