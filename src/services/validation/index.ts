const rules: { [key: string]: (value: string) => boolean } = {
  isLengthLess3: value => value.length < 3,
  isLengthLess8: value => value.length < 8,
  isLengthMore20: value => value.length > 20,
  isLengthMore40: value => value.length > 40,
  isOneCapitalLetter: value => {
    const regexp = /[A-ZА-Я]/;

    return !regexp.test(value);
  },
  isOneNumber: value => {
    const regexp = /[0-9]/;

    return !regexp.test(value);
  },
  isNumbersOnly: value => {
    const regexp = /^[0-9]+$/;

    return regexp.test(value);
  },
  isLoginFormat: value => {
    const regexp = /^[a-z0-9-_]+$/gi;

    return !regexp.test(value);
  }
}

type ValidationMessages = Array<{ isShow: boolean, text: string }>;

const validationMessages: { [key: string]: (value: string) => ValidationMessages } = {
  login: value => [
    { isShow: rules.isLengthLess3(value), text: 'Минимум 3 символа' },
    { isShow: rules.isLengthMore20(value), text: 'Максимум 20 символов' },
    { isShow: rules.isNumbersOnly(value), text: 'Не может состоять только из чисел' },
    { isShow: rules.isLoginFormat(value), text: 'Неверный формал логина' }
  ],
  password: value => [
    { isShow: rules.isLengthLess8(value), text: 'Миниму 8 символов' },
    { isShow: rules.isLengthMore40(value), text: 'Максимум 40 символов' },
    { isShow: rules.isOneCapitalLetter(value), text: 'Хотя бы одна заглавная буква' },
    { isShow: rules.isOneNumber(value), text: 'Хотя бы одна цифра' }
  ]
}

export default function (inputName: string, value: string): string {
  const messages = validationMessages[inputName]?.(value);

  if (!messages) {
    return '';
  }

  return messages.find(message => message.isShow)?.text ?? '';
}
