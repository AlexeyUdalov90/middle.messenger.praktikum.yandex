import { HTTPTransport } from '../core';
import {APIError, ChatsDTO, CreateChatRequestData, EmptyResponseData, GetChatsRequestData} from './types';

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');

const chatsAPI = {
  getChats: (data: GetChatsRequestData = {}) => http.get<ChatsDTO | APIError>('/chats', {
    data
  }),
  createChat: (data: CreateChatRequestData) => http.post<EmptyResponseData>('/chats', {
    data: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  })
};

export default chatsAPI;
