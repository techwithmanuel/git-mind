import { exec } from "child_process";
import { generalError } from "../error/general.js";

export function terminalCommand(command: string) {
  exec(command, (error) => {
    if (error) {
      const { message } = error;
      generalError(message);
    }
  });
}
