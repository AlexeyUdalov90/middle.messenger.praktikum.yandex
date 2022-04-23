export interface IMessage {
  className?: string;
  text: string;
  time: string;
  isMy: boolean;
}

export interface IChat {
  data: Nullable<{
    userName: string;
    messages: Array<IMessage>;
  }>
}

export interface IFormField {
  type?: 'text' | 'password' | 'email' | 'tel';
  placeholder?: string;
  label: string;
  value: string;
  name?: string;
  error?: string;
  className?: string;
  events?: Record<string, (e: Event) => void>
}

export interface IFormFieldError {
  error: string;
}

export interface IForm {
  className: string;
  buttonText: string;
  inputs: Record<string, IFormField>;
  onSubmit: (data: unknown) => void;
}

export interface ISubmitForm {
  [key: string]: string;
}

export interface IButton {
  text: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onCLick?: () => void;
}

export interface IConversation {
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

export interface ISearchForm {
  value?: string;
  onSubmit: () => void;
}
