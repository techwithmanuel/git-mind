export function trailingMessages(message: string) {
  const cleanMessage = message
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\n/g, ", ")
    .replace(/"/g, "'");

  if (cleanMessage.length > 115) {
    const slicedMessage = cleanMessage.slice(0, 115);
    return `${slicedMessage} ...`;
  }

  return cleanMessage;
}
