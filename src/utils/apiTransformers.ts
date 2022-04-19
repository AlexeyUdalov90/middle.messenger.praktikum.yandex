import { UserDTO, CreateUserRequestData } from '../api/types';

export const transformUser = {
  fromDTO (data: UserDTO): User {
    return {
      id: data.id,
      firstName: data.first_name,
      secondName: data.second_name,
      displayName: data.display_name,
      login: data.login,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar
    };
  },
  toDTO (data: CreateUserData): CreateUserRequestData {
    return {
      first_name: data.firstName,
      second_name: data.secondName,
      login: data.login,
      email: data.email,
      phone: data.phone,
      password: data.password
    }
  }
};
