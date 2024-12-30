import { generalError } from "./general.js";

export function symbolResponseError(
  value: string | symbol,
  message = "Operation cancelled"
) {
  if (value.toString().includes("clack:cancel")) {
    generalError(message);
  }
}
