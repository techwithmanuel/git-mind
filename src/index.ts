#!/usr/bin/env node
process.noDeprecation = true;

import { Command } from "commander";
import { initGitCommit } from "./git/init.js";
import { manageGeminiAPIKey } from "./models/gemini/manage.js";
import { manageClaudeAPIKey } from "./models/claude/manage.js";
import { manageGPTAPIKey } from "./models/gpt/manage.js";

const program = new Command();

program
  .name("git-mind")
  .description(
    "A CLI tool that generates intelligent git commit messages using AI, with support for Gemini, ChatGPT, and Claude AI."
  )
  .version("0.0.1");

program
  .command("init")
  .description("Initialize Git Commit")
  .action(initGitCommit);

program
  .command("manage-gemini")
  .description("Manage the Gemini model")
  .action(manageGeminiAPIKey);

program
  .command("manage-claude")
  .description("Manage the Claude model")
  .action(manageClaudeAPIKey);

program
  .command("manage-gpt")
  .description("Manage the GPT model")
  .action(manageGPTAPIKey);

program.parse(process.argv);
