import { HTTPTransport } from '../core';
import {
  APIError,
  ChatsDTO,
  ChatUserActionDTO,
  CreateChatDTO,
  EmptyResponseData,
  GetChatsDTO,
} from './types';

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');

const chatsAPI = {
  getChats: (data: GetChatsDTO = {}) => http.get<ChatsDTO | APIError>('/chats', {
    data
  }),
  createChat: (data: CreateChatDTO) => http.post<EmptyResponseData>('/chats', {
    data: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }),
  addUser: (data: ChatUserActionDTO) => http.put<EmptyResponseData>('/chats/users', {
    data: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }),
  deleteUser: (data: ChatUserActionDTO) => http.delete<EmptyResponseData>('/chats/users', {
    data: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  })
};

export default chatsAPI;
