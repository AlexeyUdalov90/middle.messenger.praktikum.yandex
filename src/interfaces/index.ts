export interface MessageI {
  className?: string;
  text: string;
  time: string;
  isMy: boolean;
}

export interface ChatI {
  data: Nullable<{
    userName: string;
    messages: Array<MessageI>;
  }>
}

export interface FormFieldI {
  type?: 'text' | 'password' | 'email' | 'tel';
  placeholder?: string;
  label: string;
  value: string;
  name?: string;
  error?: string;
  className?: string;
}

export interface FormFieldErrorI {
  error: string;
}

export interface FormI {
  className: string;
  buttonText: string;
  data: {
    [key: string]: FormFieldI;
  }
}

export interface SubmitFormI {
  [key: string]: string;
}

export interface ButtonI {
  text: string,
  className?: string
  type?: 'button' | 'submit' | 'reset',
  disabled?: boolean
}

export interface ConversationI {
  className?: string;
  isActive: boolean;
  userName: string;
  message: {
    text: string;
    isPersonal: boolean;
  },
  date: string;
  newMessages?: number;
}

export interface SearchFormI {
  value?: string;
  onSubmit: () => {};
}
