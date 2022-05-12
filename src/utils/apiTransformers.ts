import {
  UserDTO,
  CreateUserRequestData,
  CreateUserDTO,
  ChangeProfileRequestData,
  ChangeProfileDTO,
  ChatsDTO, messageDTO,
} from '../api/types';

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

export const transformChats = {
  fromDTO (data: ChatsDTO) {
    if (!data.length) {
      return null;
    }

    return data.map(chat => {
      let lastMessage = null;

      if (chat.last_message) {
        lastMessage = {
          ...chat.last_message,
          user: this._user(chat.last_message.user)
        }
      }

      return {
        id: chat.id,
        title: chat.title,
        avatar: chat.avatar,
        unreadCount: chat.unread_count,
        lastMessage
      }
    });
  },
  _user (data: UserDTO) {
    return {
      firstName: data.first_name,
      secondName: data.second_name,
      login: data.login,
      email: data.email,
      phone: data.phone
    };
  }
}

export const transformMessage = {
  fromDTO (data: messageDTO) {
    return {
      chatId: data.chat_id,
      time: data.time,
      type: data.type,
      userId: data.user_id,
      content: data.content,
      isRead: data.is_read,
      file: data?.file && {
        id: data.file.id,
        userId: data.file.user_id,
        path: data.file.path,
        filename: data.file.filename,
        contentType: data.file.content_type,
        contentSize: data.file.content_size,
        uploadDate: data.file.upload_date
      }
    };
  }
}
