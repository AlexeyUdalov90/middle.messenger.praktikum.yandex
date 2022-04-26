export function dateFormat (dateStr: string): string {
  const date = new Date(dateStr);
  let formatter = null;

  if (isToday(date)) {
    formatter = new Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: 'numeric'
    });
  } else {
    formatter = new Intl.DateTimeFormat('ru', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  return formatter.format(date);
}

function isToday (date: Date): boolean {
  const today = new Date();

  return today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && today.getDate() === date.getDate();




}
