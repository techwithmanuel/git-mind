#!/usr/bin/env node

import { text, confirm, intro, select, cancel } from "@clack/prompts";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { configFilePath } from "../../utils/path.js";

export const gptKeyFilePath = path.join(configFilePath, "open-ai.txt");

type ACTIONS = "register" | "delete" | "update";

async function registerGPTAPIKey() {
  const API_KEY = await text({
    message: "Enter your OpenAI API Key:",
  });

  if (API_KEY.toString().includes("clack:cancel")) {
    return cancel(chalk.white.inverse("Operation cancelled"));
  }

  fs.writeFileSync(gptKeyFilePath, String(API_KEY));
  cancel(chalk.black.bgGreen("API Key registered successfully!"));
}

async function deleteGPTAPIKey() {
  const confirmation = await confirm({
    message: "Are you sure you want to delete your OpenAI API Key",
  });

  const confirmed = Boolean(confirmation);

  if (confirmed) {
    if (fs.existsSync(gptKeyFilePath)) {
      fs.unlinkSync(gptKeyFilePath);
      cancel(chalk.black.bgGreen("API Key deleted successfully!"));
    } else {
      cancel(chalk.white.inverse("No API Key found to delete."));
    }
  } else {
    cancel(chalk.white.inverse("Action cancelled"));
  }
}

async function updateGPTAPIKey() {
  if (fs.existsSync(gptKeyFilePath) && fs.existsSync(configFilePath)) {
    const currentAPIKey = fs.readFileSync(gptKeyFilePath, {
      encoding: "utf8",
    });

    const updatedAPIKey = await text({
      message: "Enter your OpenAI API Key:",
      defaultValue: currentAPIKey,
      initialValue: currentAPIKey,
    });

    if (updatedAPIKey.toString().includes("clack:cancel")) {
      return cancel(chalk.white.inverse("Operation cancelled"));
    }

    fs.writeFileSync(gptKeyFilePath, String(updatedAPIKey), {
      encoding: "utf8",
    });

    cancel(chalk.black.bgGreen("API Key updated successfully"));
  } else {
    cancel(chalk.white.inverse("Please register your OpenAI API Key first"));
  }
}

export async function manageGPTAPIKey() {
  await intro(chalk.inverse("🗄️ Manage OpenAI GPT"));

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
    registerGPTAPIKey();
  } else if (action === "update") {
    updateGPTAPIKey();
  } else if (action === "delete") {
    deleteGPTAPIKey();
  } else {
    cancel(chalk.white.inverse("No action selected"));
  }
}

manageGPTAPIKey();
