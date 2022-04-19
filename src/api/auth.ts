import { HTTPTransport } from '../core';
import { UserDTO, APIError } from './types';

type LoginRequestData = {
  login: string;
  password: string;
};

type CreateUserRequestData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

type LoginResponseData = object | APIError;

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');

const authAPI = {
  login: (data: LoginRequestData) => http.post<LoginResponseData>('/auth/signin', {
    data,
    headers: {
      'content-type': 'application/json'
    }
  }),
  logout: () => http.post<LoginResponseData>('/auth/logout'),
  createUser: (data: CreateUserRequestData) => http.post<LoginResponseData>('/auth/logout', {
    data,
    headers: {
      'content-type': 'application/json'
    }
  }),
  getUser: () => http.get<UserDTO | APIError>('/auth/user')
};

export default authAPI
