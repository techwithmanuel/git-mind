#!/usr/bin/env node

import Anthropic from "@anthropic-ai/sdk";
import chalk from "chalk";
import { exec } from "child_process";
import { answerPrompt } from "../prompt.js";
import { getClaudeAPIKey } from "./get-key.js";
import { cancel } from "@clack/prompts";

export async function generateClaudeAnswer(input: string) {
  const API_KEY = getClaudeAPIKey();
  if (API_KEY) {
    try {
      const genAI = new Anthropic({
        apiKey: API_KEY,
      });

      const result = await genAI.messages.create({
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: answerPrompt + `the question is ${input}`,
          },
        ],
        model: "claude-3-opus-20240229",
      });

      const text = result.content[0];
      return text;
    } catch (error) {
      exec("git reset");
      cancel(
        chalk.red(
          "An error occurred while generating the Claude response:",
          error
        )
      );
    }
  } else {
    cancel(chalk.red("Claude API Key not found"));
  }
}
