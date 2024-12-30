#!/usr/bin/env node

import { text, confirm, intro, select, cancel } from "@clack/prompts";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { configFilePath } from "../../utils/path.js";

export const claudeKeyFilePath = path.join(configFilePath, "claude.txt");

type ACTIONS = "register" | "delete" | "update";

export async function registerClaudeAPIKey() {
  const API_KEY = await text({
    message: "Enter your Anthropic (Claude) API Key:",
  });

  if (API_KEY.toString().includes("clack:cancel")) {
    return cancel(chalk.bgHex("#cc785c")("Operation cancelled"));
  }

  fs.writeFileSync(claudeKeyFilePath, String(API_KEY));
  cancel(chalk.black.bgGreen("API Key Registered"));
}

async function deleteClaudeAPIKey() {
  const confirmation = await confirm({
    message: "Are you sure you want to delete your Anthropic API Key",
  });

  const confirmed = Boolean(confirmation);

  if (confirmed) {
    if (fs.existsSync(claudeKeyFilePath)) {
      fs.unlinkSync(claudeKeyFilePath);
      cancel(chalk.black.bgGreen("API Key Deleted"));
    } else {
      cancel(chalk.bgHex("#cc785c")("No API Key found to delete."));
    }
  } else {
    cancel(chalk.bgHex("#cc785c")("Action cancelled"));
  }
}

async function updateClaudeAPIKey() {
  if (fs.existsSync(claudeKeyFilePath) && fs.existsSync(configFilePath)) {
    const currentAPIKey = fs.readFileSync(claudeKeyFilePath, {
      encoding: "utf8",
    });

    const updatedAPIKey = await text({
      message: "Enter your Anthropic (Claude) API Key:",
      defaultValue: currentAPIKey,
      initialValue: currentAPIKey,
    });

    if (updatedAPIKey.toString().includes("clack:cancel")) {
      return cancel(chalk.bgHex("#cc785c")("Operation cancelled"));
    }

    fs.writeFileSync(claudeKeyFilePath, String(updatedAPIKey), {
      encoding: "utf8",
    });

    cancel(chalk.black.bgGreen("API Key Updated"));
  } else {
    cancel(
      chalk.bgHex("#cc785c")("Please register your Anthropic API Key first")
    );
  }
}

export async function manageClaudeAPIKey() {
  await intro(chalk.bgHex("#cc785c")("🗄️ Manage Claude"));

  const option: any = await select({
    message: "Actions",
    options: [
      { value: "register", label: "Register API KEY" },
      {
        value: "update",
        label: "Update API KEY",
      },
      {
        value: "delete",
        label: "Delete API KEY",
      },
    ],
  });

  const action: ACTIONS = option;

  if (action === "register") {
    registerClaudeAPIKey();
  } else if (action === "update") {
    updateClaudeAPIKey();
  } else if (action === "delete") {
    deleteClaudeAPIKey();
  } else {
    cancel(chalk.bgHex("#cc785c")("No option selected"));
  }
}
