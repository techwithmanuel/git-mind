export function trailingMessages(message: string) {
  const cleanMessage = message
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\n/g, ", ")
    .replace(/"/g, "'");

  if (cleanMessage.length > 100) {
    const slicedMessage = cleanMessage.slice(0, 95);
    return `${slicedMessage} ...`;
  }

  return cleanMessage;
}
