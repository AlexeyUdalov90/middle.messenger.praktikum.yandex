import chatsAPI from '../api/chatsAPI';
import { searchUser } from './user';
import { CreateChatDTO } from '../api/types';
import { apiHasError, transformChats } from '../utils';

export async function createChat (data: CreateChatDTO) {
  window.store.set('isLoading', true);

  const responseCreateChat = await chatsAPI.createChat(data);

  if (apiHasError(responseCreateChat)) {
    window.store.set('isLoading', false);

    return;
  }

  const responseGetChats = await chatsAPI.getChats();

  if (apiHasError(responseGetChats)) {
    window.store.set('isLoading', false);

    return;
  }

  window.store.set('isLoading', false);
  window.store.set('chats', transformChats.fromDTO(responseGetChats));
}

type actionChatUser = {
  login: string;
  chatId: number;
}

export async function addUser ({ login, chatId }: actionChatUser) {
  window.store.set('isLoading', true);

  const responseSearchUser = await searchUser({
    login
  });

  if (responseSearchUser) {
    const users = responseSearchUser.map(user => user.id);

    const responseAddUser = await chatsAPI.addUser({
      users,
      chatId
    });

    if (apiHasError(responseAddUser)) {
      window.store.set('isLoading', false);

      return;
    }

    window.store.set('isLoading', false);
  }
}

export async function deleteUser ({ login, chatId }: actionChatUser) {
  window.store.set('isLoading', true);

  const responseSearchUser = await searchUser({
    login
  });

  if (responseSearchUser) {
    const users = responseSearchUser.map(user => user.id);

    const responseDeleteUser = await chatsAPI.deleteUser({
      users,
      chatId
    });

    if (apiHasError(responseDeleteUser)) {
      window.store.set('isLoading', false);

      return;
    }

    window.store.set('isLoading', false);
  }
}
