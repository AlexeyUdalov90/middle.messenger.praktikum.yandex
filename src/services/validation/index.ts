const rules: { [key: string]: (value: string) => boolean } = {
  isLengthLess3: value => value.length < 3,
  isLengthLess8: value => value.length < 8,
  isLengthLess10: value => value.length < 10,
  isLengthMore15: value => value.length > 15,
  isLengthMore20: value => value.length > 20,
  isLengthMore40: value => value.length > 40,
  isHasNotOneCapitalLetter: value => {
    const regexp = /[A-ZА-Я]/;

    return !regexp.test(value);
  },
  isHasNotOneNumber: value => {
    const regexp = /[0-9]/;

    return !regexp.test(value);
  },
  isNumbersOnly: value => {
    const regexp = /^[0-9]+$/;

    return regexp.test(value);
  },
  isInvalidLogin: value => {
    const regexp = /^[a-z0-9-_]+$/gi;

    return !regexp.test(value);
  },
  isFirstNotCapitalLetter: value => {
    const regexp = /^[A-ZА-Я]/;

    return !regexp.test(value);
  },
  isInvalidName: value => {
    const regexp = /^[A-ZА-Я-]+$/gi;

    return !regexp.test(value);
  },
  isInvalidPhone: value => {
    const regexp = /^(?:\+|\d)\d+/g;

    return !regexp.test(value);
  },
  isInvalidEmail: value => {
    const regexp = /[a-zA-Z0-9-_]+@[a-zA-Z0-9-_]+\.[a-zA-Z0-9]+/g;

    return !regexp.test(value);
  }
}

type ValidationMessages = Array<{ isShow: boolean, text: string }>;

const validationMessages: { [key: string]: (value: string) => ValidationMessages } = {
  login: value => [
    { isShow: rules.isLengthLess3(value), text: 'Минимум 3 символа' },
    { isShow: rules.isLengthMore20(value), text: 'Максимум 20 символов' },
    { isShow: rules.isNumbersOnly(value), text: 'Не может состоять только из чисел' },
    { isShow: rules.isInvalidLogin(value), text: 'Неверный формал логина' }
  ],
  password: value => [
    { isShow: rules.isLengthLess8(value), text: 'Миниму 8 символов' },
    { isShow: rules.isLengthMore40(value), text: 'Максимум 40 символов' },
    { isShow: rules.isHasNotOneCapitalLetter(value), text: 'Хотя бы одна заглавная буква' },
    { isShow: rules.isHasNotOneNumber(value), text: 'Хотя бы одна цифра' }
  ],
  firstName: value => [
    { isShow: rules.isFirstNotCapitalLetter(value), text: 'Первая заглавная буква' },
    { isShow: rules.isInvalidName(value), text: 'Неверный формат имени' },
  ],
  secondName: value => [
    { isShow: rules.isFirstNotCapitalLetter(value), text: 'Первая заглавная буква' },
    { isShow: rules.isInvalidName(value), text: 'Неверный формат фамилии' },
  ],
  phone: value => [
    { isShow: rules.isLengthLess10(value), text: 'Миниму 10 символов' },
    { isShow: rules.isLengthMore15(value), text: 'Максимум 15 символов' },
    { isShow: rules.isInvalidPhone(value), text: 'Неверный формат телефона' }
  ],
  email: value => [
    { isShow: rules.isInvalidEmail(value), text: 'Неверный формат почты' }
  ]
}

export default function (inputName: string, value: string): string {
  const messages = validationMessages[inputName]?.(value);

  if (!messages) {
    return '';
  }

  return messages.find(message => message.isShow)?.text ?? '';
}
