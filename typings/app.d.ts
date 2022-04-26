declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  export type PlainObject<T = unknown> = {
    [k in string]: T;
  };
  export type AppState = {
    isLoading: boolean;
    isAuth: boolean;
    user: Nullable<User>;
    chats: Nullable<Chats>;
    activeChat: Nullable<Chat>;
  };
  export type User = {
    id?: number;
    firstName: string;
    secondName: string;
    displayName?: string;
    login: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  export type Chat = {
    id: number;
    title: string;
    avatar: Nullable<string>;
    unreadCount: number;
    lastMessage: Nullable<LastMessage>;
  };
  export type LastMessage = {
    user: User;
    time: string;
    content: string;
  };
  export type Chats = Array<Chat> | [];
  export type ChatMessage = {
    chatId: number;
    time: string;
    type: string;
    userId: number;
    content: string;
    isRead: boolean;
    file?: {
      id: number;
      userId: number;
      path: string;
      filename: string;
      contentType: string;
      contentSize: number;
      uploadDate: string;
    }
  };
}

export {};
