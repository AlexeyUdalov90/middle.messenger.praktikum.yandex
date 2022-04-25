import authAPI from '../api/authAPI';
import chatsAPI from '../api/chatsAPI';
import { UserDTO } from '../api/types';
import { apiHasError, transformUser, transformChats } from '../utils';

export async function initApp() {
  window.store.set('isLoading', true);

  try {
    const response = await authAPI.getUser();

    if (apiHasError(response)) {
      return;
    }

    const responseChats = await chatsAPI.getChats();

    if (apiHasError(responseChats)) {
      return;
    }

    window.store.set('user', transformUser.fromDTO(response as UserDTO));
    window.store.set('chats', transformChats.fromDTO(responseChats));
    window.store.set('isAuth', true);
  } catch (err) {
    console.error(err);
  } finally {
    window.store.set('isLoading', false);
  }
}
