import { HTTPTransport } from '../core';
import {APIError, ChatsDTO, GetChatsRequestData} from './types';

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');

const chatsAPI = {
  getChats: (data: GetChatsRequestData = {}) => http.get<ChatsDTO | APIError>('/chats', {
    data
  })
};

export default chatsAPI;
