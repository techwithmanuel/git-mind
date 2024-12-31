import { exec } from "child_process";
import { generalError } from "../error/general.js";
import chalk from "chalk";

export function terminalCommand(command: string) {
  exec(command, (error) => {
    if (error) {
      const { message } = error;
      console.log(chalk.inverse("I'm the issue here"));
      generalError(message);
      exec("git reset");
    }
  });
}
