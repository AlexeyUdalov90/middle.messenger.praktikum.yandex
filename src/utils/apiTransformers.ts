import {UserDTO, CreateUserRequestData, CreateUserDTO, ChangeProfileRequestData, ChangeProfileDTO} from '../api/types';

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
  toDTO (data: CreateUserRequestData): CreateUserDTO {
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

export const transformUserProfile = {
  toDTO (data: ChangeProfileRequestData): ChangeProfileDTO {
    return {
      first_name: data.firstName,
      second_name: data.secondName,
      display_name: data.displayName,
      login: data.login,
      email: data.email,
      phone: data.phone,
    }
  }
}
