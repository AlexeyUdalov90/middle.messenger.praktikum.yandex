import { UserDTO } from '../api/types';

export const transformUser = (data: UserDTO): User => {
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
};
