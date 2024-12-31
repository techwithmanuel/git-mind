export function trailingMessages(message: string) {
  const cleanMessage = message.trim().replace(/\s+/g, " ").replace(/\n/g, ", ");

  return cleanMessage;
}
