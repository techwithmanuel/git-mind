export function trailingMessages(message: string) {
  const cleanMessage = message
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\n/g, ", ")
    .replace(/"/g, "'");

  if (cleanMessage.length > 125) {
    const slicedMessage = cleanMessage.slice(0, 125);
    return `${slicedMessage} ...`;
  }

  return cleanMessage;
}
