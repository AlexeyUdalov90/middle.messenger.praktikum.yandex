export type APIError = {
  reason: string;
};

export type UserDTO = {
  id: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  phone: string;
  avatar?: string;
};

export type LoginRequestData = {
  login: string;
  password: string;
};

export type CreateUserDTO = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type CreateUserRequestData = {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};

export type ChangeProfileDTO = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type ChangeProfileRequestData = {
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
};

export type ChangePasswordDTO = {
  oldPassword: string;
  newPassword: string;
}

export type GetChatsDTO = {
  offset?: number;
  limit?: number;
  title?: string;
}

export type ChatsDTO = Array<{
  id: number;
  title: string;
  avatar: string;
  unread_count: string;
  last_message: Nullable<LastMessageDTO>
}> | [];

export type LastMessageDTO = {
  user: UserDTO;
  time: string;
  content: string;
};

export type CreateChatDTO = {
  title: string;
};

export type SearchUserDTO = {
  login: string;
};

export type ChatUserActionDTO = {
  users: Array<number>;
  chatId: number;
};

export type EmptyResponseData = object | APIError;
