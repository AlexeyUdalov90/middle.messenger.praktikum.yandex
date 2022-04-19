import authAPI from '../api/authAPI';
import { UserDTO } from '../api/types';
import { apiHasError, transformUser } from '../utils';
import { store } from '../core';

export async function initApp() {
  store.set('isLoading', true);

  try {
    const response = await authAPI.getUser();

    if (apiHasError(response)) {
      return;
    }

    store.set('user', transformUser.fromDTO(response as UserDTO));
  } catch (err) {
    console.error(err);
  } finally {
    store.set('isLoading', false);
  }
}
