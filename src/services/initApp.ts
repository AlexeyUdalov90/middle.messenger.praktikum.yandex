import authAPI from '../api/authAPI';
import { UserDTO } from '../api/types';
import { apiHasError, transformUser } from '../utils';

export async function initApp() {
  window.store.set('isLoading', true);

  try {
    const response = await authAPI.getUser();

    if (apiHasError(response)) {
      return;
    }

    window.store.set('user', transformUser.fromDTO(response as UserDTO));
  } catch (err) {
    console.error(err);
  } finally {
    window.store.set('isLoading', false);
  }
}
