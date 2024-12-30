#!/usr/bin/env node

import fs from "fs";
import chalk from "chalk";
import path from "path";
import { configFilePath } from "../../utils/path.js";

const claudeKeyFilePath = path.join(configFilePath, "claude.txt");

export function getClaudeAPIKey() {
  if (fs.existsSync(claudeKeyFilePath)) {
    try {
      const key = fs.readFileSync(claudeKeyFilePath, "utf-8").trim();
      return key;
    } catch (error) {
      console.log(
        chalk.red("Error reading Anthropic (Claude) Key file:", error)
      );
    }
  } else {
    console.log(chalk.red("Unable to find Anthropic (Claude) API Key"));
  }
}
