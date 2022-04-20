import authAPI from '../api/authAPI';
import { LoginRequestData, UserDTO } from '../api/types';
import { apiHasError, transformUser } from '../utils';
import { store, router } from '../core';

async function getUser() {
  const responseUser = await authAPI.getUser();

  if (apiHasError(responseUser)) {
    return;
  }

  store.set('user', transformUser.fromDTO(responseUser as UserDTO));
  store.set('isLoading', false);

  router.go('/chats');
}

export async function login(data: LoginRequestData) {
  store.set('isLoading', true);

  const responseLogin = await authAPI.login(data);

  if (apiHasError(responseLogin)) {
    store.set('isLoading', false);

    return;
  }

  await getUser();

  store.set('isLoading', false);
}

export async function logout() {
  store.set('isLoading', true);

  const responseLogout = await authAPI.logout();

  if (apiHasError(responseLogout)) {
    store.set('isLoading', false);

    return;
  }

  store.set('isLoading', false);
  store.set('user', null);

  router.go('/');
}

export async function createUser(data: CreateUserData) {
  store.set('isLoading', true);

  const responseCreate = await authAPI.createUser(transformUser.toDTO(data));

  if (apiHasError(responseCreate)) {
    store.set('isLoading', false);

    return;
  }

  await getUser();

  store.set('isLoading', false);
}
