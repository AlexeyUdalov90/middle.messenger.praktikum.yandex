import userAPI from '../api/userAPI';
import {ChangePasswordDTO, ChangeProfileRequestData, SearchUserDTO, UserDTO} from '../api/types';
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

export async function setAvatar (data: FormData) {
  window.store.set('isLoading', true);

  const responseSetAvatar = await userAPI.setAvatar(data);

  if (apiHasError(responseSetAvatar)) {
    window.store.set('isLoading', false);

    return;
  }

  window.store.set('isLoading', false);
  window.store.set('user', transformUser.fromDTO(responseSetAvatar as UserDTO));
}

export async function searchUser (data: SearchUserDTO) {
  const responseSearchUser = await userAPI.searchUser(data);

  if (apiHasError(responseSearchUser)) {
    window.store.set('isLoading', false);

    return;
  }

  return responseSearchUser;
}
