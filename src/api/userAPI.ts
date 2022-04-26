import { HTTPTransport } from '../core';
import {ChangeProfileDTO, APIError, UserDTO, ChangePasswordDTO, EmptyResponseData, SearchUserDTO} from './types';

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');

const userAPI = {
  changeProfile: (data: ChangeProfileDTO) => http.put<UserDTO | APIError>('/user/profile', {
    data: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }),
  changePassword: (data: ChangePasswordDTO) => http.put<EmptyResponseData>('/user/password', {
    data: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }),
  setAvatar: (data: FormData) => http.put<UserDTO | APIError>('/user/profile/avatar', {
    data
  }),
  searchUser: (data: SearchUserDTO) => http.post<Array<UserDTO> | APIError>('/user/search', {
    data: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  })
}

export default userAPI;
