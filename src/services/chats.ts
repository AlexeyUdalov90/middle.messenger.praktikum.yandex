import chatsAPI from '../api/chatsAPI';
import { CreateChatRequestData } from '../api/types';
import { apiHasError, transformChats } from '../utils';

export async function createChat (data: CreateChatRequestData) {
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
