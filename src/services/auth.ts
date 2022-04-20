import authAPI from '../api/authAPI';
import { LoginRequestData, UserDTO } from '../api/types';
import { apiHasError, transformUser } from '../utils';

async function getUser() {
  const responseUser = await authAPI.getUser();

  if (apiHasError(responseUser)) {
    window.store.set('isLoading', false);

    return;
  }

  window.store.set('isLoading', false);
  window.store.set('user', transformUser.fromDTO(responseUser as UserDTO));
  window.store.set('isAuth', true);
}

export async function login(data: LoginRequestData) {
  window.store.set('isLoading', true);

  const responseLogin = await authAPI.login(data);

  if (apiHasError(responseLogin)) {
    window.store.set('isLoading', false);

    return;
  }

  await getUser();

  window.router.go('/chats');
}

export async function logout() {
  window.store.set('isLoading', true);

  const responseLogout = await authAPI.logout();

  if (apiHasError(responseLogout)) {
    window.store.set('isLoading', false);

    return;
  }

  window.store.set('isLoading', false);
  window.store.set('isAuth', false);
  window.store.set('user', null);

  window.router.go('/');
}

export async function createUser(data: CreateUserData) {
  window.store.set('isLoading', true);

  const responseCreate = await authAPI.createUser(transformUser.toDTO(data));

  if (apiHasError(responseCreate)) {
    window.store.set('isLoading', false);

    return;
  }

  await getUser();

  window.router.go('/chats');
}
