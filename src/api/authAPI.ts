import { HTTPTransport } from '../core';
import {
  UserDTO,
  APIError,
  LoginRequestData,
  EmptyResponseData,
  CreateUserDTO,
} from './types';

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');

const authAPI = {
  login: (data: LoginRequestData) => http.post<EmptyResponseData>('/auth/signin', {
    data,
    headers: {
      'content-type': 'application/json'
    }
  }),
  logout: () => http.post<EmptyResponseData>('/auth/logout'),
  createUser: (data: CreateUserDTO) => http.post<CreateUserDTO | APIError>('/auth/signup', {
    data,
    headers: {
      'content-type': 'application/json'
    }
  }),
  getUser: () => http.get<UserDTO | APIError>('/auth/user')
};

export default authAPI
