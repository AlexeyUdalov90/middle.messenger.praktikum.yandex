import authAPI from '../api/auth';
import { UserDTO } from '../api/types';
import { apiHasError, transformUser } from '../utils';

export async function initApp() {
  window.store.set('isLoading', true);

  try {
    const response = await authAPI.getUser();

    debugger

    if (apiHasError(response)) {
      return;
    }

    window.store.set('user', transformUser(response as UserDTO));
  } catch (err) {
    console.error(err);
  } finally {
    window.store.set('isLoading', false);
  }
}
