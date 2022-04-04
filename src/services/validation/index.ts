export default function(value: string = ''): string {
  if (!value) {
    return 'Поле не может быть пустым';
  }

  if (value.length < 2) {
    return 'Не менее 2 символов'
  }

  return '';
}
