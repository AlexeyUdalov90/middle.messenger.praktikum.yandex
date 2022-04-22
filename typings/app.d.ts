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
    user: User | null;
  };
  export type User = {
    id: number;
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
  }
}

export {};
