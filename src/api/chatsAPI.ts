import { HTTPTransport } from '../core';
import {
  APIError,
  ChatsDTO,
  ChatUserActionDTO,
  CreateChatDTO,
  EmptyResponseData,
  GetChatsDTO,
  TokenResponse
} from './types';

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');

const chatsAPI = {
  getChats: (data: GetChatsDTO = {}) => http.get<ChatsDTO | APIError>('/chats', {
    data: JSON.stringify(data)
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
  }),
  getToken: (id: number) => http.post<TokenResponse | APIError>(`/chats/token/${id}`)
};

export default chatsAPI;
