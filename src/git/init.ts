#!/usr/bin/env node
process.noDeprecation = true;

import { checkGitStatus } from "./changes/files.js";
import { hasPreferredModel } from "./commit.js";
import { verifyRemoteRepo } from "./remote.js";
import { getClaudeAPIKey } from "../models/claude/get-key.js";
import { registerClaudeAPIKey } from "../models/claude/manage.js";
import { getGeminiAPIKey } from "../models/gemini/get-key.js";
import { registerGeminiAPIKey } from "../models/gemini/manage.js";
import { getGPTAPIKey } from "../models/gpt/get-key.js";
import { registerGPTAPIKey } from "../models/gpt/manage.js";
import { Model, selectModel } from "../models/select.js";
import { intro, outro, log, note } from "@clack/prompts";
import chalk from "chalk";
import { processGitChanges } from "./process.js";

export async function validateAPIKey(model: Model): Promise<boolean> {
  let key;

  if (model === "claude") {
    key = getClaudeAPIKey();
  } else if (model === "gpt") {
    key = getGPTAPIKey();
  } else if (model === "gemini") {
    key = getGeminiAPIKey();
  }

  if (!key || key.length === 0) {
    return false;
  }

  return true;
}

export async function registerKey(model: Model) {
  const registrations = {
    claude: registerClaudeAPIKey,
    gpt: registerGPTAPIKey,
    gemini: registerGeminiAPIKey,
  };
  await registrations[model]();
}

export async function initGitCommit() {
  intro(chalk.gray("Git Mind Initialized 🔎 "));

  try {
    await verifyRemoteRepo();
    const files = checkGitStatus();

    let model = await hasPreferredModel();

    if (!model) {
      await selectModel();
    } else {
      const hasValidKey = await validateAPIKey(model);
      if (!hasValidKey) {
        await registerKey(model);
        return;
      } else {
        await processGitChanges(files);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }

  outro(chalk.blue("All commits resolved 🎉"));
}
