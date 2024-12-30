export function trailingMessages(message: string) {
  if (message.length > 30) {
    return `${message.slice(0, 35)} ...`;
  }

  return message;
}
