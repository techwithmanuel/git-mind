#!/usr/bin/env node

import chalk from "chalk";
import path from "path";
import fs from "fs";
import { cancel, intro, select } from "@clack/prompts";
import { configFilePath } from "../utils/path.js";

const preferencesFilePath = path.join(configFilePath, "preferences");

export type Model = "claude" | "gpt" | "gemini";

export async function selectModel() {
  intro(chalk.grey("Models Fetched 🔎"));

  const defaultModel: any = await select({
    message: "Select default model",
    options: [
      {
        label: "Gemini",
        value: "gemini",
        hint: "recommended",
      },
      {
        label: "Open AI GPT",
        value: "gpt",
      },
      {
        label: "Claude",
        value: "claude",
      },
    ],
  });

  const selectedDefault: Model = defaultModel;

  if (
    selectedDefault === "claude" ||
    selectedDefault === "gemini" ||
    selectedDefault === "gpt"
  ) {
    fs.writeFileSync(preferencesFilePath, String(selectedDefault));
    cancel(
      chalk.green(
        `Preference Saved, run 'git-mind manage-${selectedDefault}' to manage your model`
      )
    );
  } else {
    cancel("Operation cancelled");
  }
}
