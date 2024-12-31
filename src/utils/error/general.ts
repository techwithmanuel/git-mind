#!/usr/bin/env node

import { cancel } from "@clack/prompts";
import chalk from "chalk";

export function safeExit(code = 0) {
  process.stdout.write("\x1B[?25h");
  process.exit(code);
}

export function generalError(message: string = "Operation cancelled") {
  cancel(chalk.red(message));

  return safeExit(1);
}
