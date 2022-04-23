import userAPI from '../api/userAPI';
import {ChangePasswordDTO, ChangeProfileRequestData, UserDTO} from '../api/types';
import { apiHasError, transformUser, transformUserProfile } from '../utils';

export async function changeProfile (data: ChangeProfileRequestData) {
  window.store.set('isLoading', true);

  const responseChangeProfile = await userAPI.changeProfile(transformUserProfile.toDTO(data));

  if (apiHasError(responseChangeProfile)) {
    window.store.set('isLoading', false);

    return;
  }

  window.store.set('isLoading', false);
  window.store.set('user', transformUser.fromDTO(responseChangeProfile as UserDTO));
}

export async function changePassword (data: ChangePasswordDTO) {
  window.store.set('isLoading', true);

  const responseChangePassword = await userAPI.changePassword(data);

  if (apiHasError(responseChangePassword)) {
    window.store.set('isLoading', false);

    return;
  }

  window.store.set('isLoading', false);
}
