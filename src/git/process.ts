import { terminalCommand } from "../utils/command/index.js";
import chalk from "chalk";
import { log, note } from "@clack/prompts";
import { gitDiffForFile } from "./changes/diff.js";
import { awaitingFnCall } from "../utils/sleep/index.js";
import { createGitCommit } from "./commit.js";
import { trailingMessages } from "../utils/text.js";

export async function processGitChanges(files: string[]): Promise<void> {
  const file_names = files.join(", ");
  log.info(chalk.gray(`Changed Files: ${file_names}`));

  if (files.length >= 5) {
    await handleBulkChanges(files);
  } else {
    await handleIndividualFiles(files);
  }
}

async function handleBulkChanges(files: string[]): Promise<void> {
  log.info("More than 5 files, running git add .");
  terminalCommand("git add .");

  const diffs = files.slice(0, 2).map((file: string) => {
    const fileWithoutDeleteFlag = file.replace(" :deleted", "");
    const diff = gitDiffForFile(fileWithoutDeleteFlag);
    return diff ? diff : "";
  });

  const combinedDiff = diffs.join("\n");
  const commitMessage = await awaitingFnCall<string | undefined>(
    () => createGitCommit(combinedDiff),
    `Generated commit messages for ${files.join(", ")}`
  );

  if (commitMessage) {
    note(trailingMessages(commitMessage));
    const formattedCommitMessage = formatCommitMessage(commitMessage);
    terminalCommand(`git commit -m "${formattedCommitMessage}"; git push `);
  }
}

async function handleIndividualFiles(files: string[]): Promise<void> {
  const failures: Array<{ file: string; error: Error }> = [];

  for (const file of files) {
    try {
      const isDeleted = file.endsWith(" :deleted");
      const fileWithoutDeleteFlag = file.replace(" :deleted", "");

      log.info(`Staging file: ${fileWithoutDeleteFlag}`);
      terminalCommand(`git add "${fileWithoutDeleteFlag}"`);

      if (isDeleted) {
        await handleDeletedFile(fileWithoutDeleteFlag);
      } else {
        await handleModifiedFile(fileWithoutDeleteFlag);
      }
    } catch (error) {
      failures.push({ file, error: error as Error });
      log.error(`Failed to process file: ${file}` + error);
      terminalCommand(`git reset "${file.replace(" :deleted", "")}`);
    }
  }
}

async function handleDeletedFile(file: string): Promise<void> {
  const formattedCommitMessage = `chore: removed redundant file ${file}`;
  note(trailingMessages(formattedCommitMessage));
  terminalCommand(`git commit -m "${formattedCommitMessage}"; git push`);
  log.info(`Successfully pushed and committed deleted file: ${file}`);
}

async function handleModifiedFile(file: string): Promise<void> {
  const diff = gitDiffForFile(file);

  if (!diff) {
    log.info(`No changes detected for file: ${file}`);
    return;
  }

  const commitMessage = await awaitingFnCall<string | undefined>(
    () => createGitCommit(diff),
    `Generated commit message from ${file}`
  );

  if (!commitMessage) {
    log.warn(`No commit message generated for file: ${file}, skipping commit`);
    return;
  }

  const formattedCommitMessage = formatCommitMessage(commitMessage);
  note(trailingMessages(formattedCommitMessage));
  terminalCommand(`git commit -m "${formattedCommitMessage}"; git push`);
  log.info(`Successfully pushed and committed changes for: ${file}`);
}

function formatCommitMessage(message: string): string {
  return message.replace(/\n/g, " ").replace(/"/g, "'");
}
