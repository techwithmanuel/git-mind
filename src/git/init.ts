#!/usr/bin/env node
process.noDeprecation = true;

import { gitDiffForFile } from "./changes/diff.js";
import { checkGitStatus } from "./changes/files.js";
import { createGitCommit, hasPreferredModel } from "./commit.js";
import { verifyRemoteRepo, pushToRemoteRepo } from "./remote.js";
import { getClaudeAPIKey } from "../models/claude/get-key.js";
import { registerClaudeAPIKey } from "../models/claude/manage.js";
import { getGeminiAPIKey } from "../models/gemini/get-key.js";
import { registerGeminiAPIKey } from "../models/gemini/manage.js";
import { getGPTAPIKey } from "../models/gpt/get-key.js";
import { registerGPTAPIKey } from "../models/gpt/manage.js";
import { Model, selectModel } from "../models/select.js";
import { intro, outro, log, note } from "@clack/prompts";
import chalk from "chalk";
import { terminalCommand } from "../utils/command/index.js";
import { awaitingFnCall } from "../utils/sleep/index.js";
import { trailingMessages } from "../utils/text.js";

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

async function processGitChanges(files: string[]): Promise<void> {
  const file_names = files.join(", ");

  log.info(chalk.gray(`Changed Files: ${file_names}`));

  if (files.length >= 5) {
    log.info("More than 5 files, running git add .");
    terminalCommand("git add .");

    const diffs = files.slice(0, 2).map((file: string) => {
      const diff = gitDiffForFile(file);
      return diff ? diff : "";
    });

    const combinedDiff = diffs.join("\n");

    const commitMessage = await awaitingFnCall<string | undefined>(
      () => createGitCommit(combinedDiff),
      `Generated commit messages for ${file_names}`
    );

    if (commitMessage) {
      note(trailingMessages(commitMessage));

      const formattedCommitMessage = commitMessage
        .replace(/\n/g, " ")
        .replace(/"/g, "'");

      terminalCommand("rm -f .git/index.lock");
      terminalCommand(`git commit -m  "${formattedCommitMessage}"`);
    }
  } else {
    const failures: Array<{ file: string; error: Error }> = [];

    for (const file of files) {
      try {
        log.info(`Staging file: ${file}`);

        terminalCommand("rm -f .git/index.lock");
        terminalCommand(`git add "${file}"`);

        const diff = gitDiffForFile(file);

        if (!diff) {
          log.info(`No changes detected for file: ${file}`);
          continue;
        }

        const commitMessage = await awaitingFnCall<string | undefined>(
          () => createGitCommit(diff),
          `Generated commit message from ${file}`
        );

        if (!commitMessage) {
          log.warn(
            `No commit message generated for file: ${file}, skipping commit`
          );
          continue;
        } else {
          const formattedCommitMessage = commitMessage
            .replace(/\n/g, " ")
            .replace(/"/g, "'");

          note(trailingMessages(formattedCommitMessage));

          terminalCommand(`git commit -m "${formattedCommitMessage}"`);
          log.info(`Successfully committed changes for: ${file}`);
        }
      } catch (error) {
        failures.push({ file, error: error as Error });
        log.error(`Failed to process file: ${file}` + error);

        terminalCommand("rm -f .git/index.lock");
        terminalCommand(`git reset "${file}"`);
      }
    }
  }

  await pushToRemoteRepo();
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
