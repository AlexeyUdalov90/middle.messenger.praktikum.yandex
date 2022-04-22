import { HTTPTransport } from '../core';
import {ChangeProfileDTO, APIError, UserDTO} from './types';

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');

const userAPI = {
  changeProfile: (data: ChangeProfileDTO) => http.put<UserDTO | APIError>(
    '/user/profile',
    {
      data,
      headers: {
        'content-type': 'application/json'
      }
    })
}

export default userAPI;
