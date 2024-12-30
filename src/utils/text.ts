export function trailingMessages(message: string) {
  if (message.length >= 100) {
    return `${message.slice(0, 95)} ...`;
  }

  return message;
}
