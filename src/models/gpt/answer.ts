#!/usr/bin/env node

import { ChatGPTAPI } from "chatgpt";
import chalk from "chalk";
import { answerPrompt } from "../prompt.js";
import { getGPTAPIKey } from "./get-key.js";
import { cancel } from "@clack/prompts";

export async function generateGPTAnswer(input: string) {
  const API_KEY = getGPTAPIKey();
  if (API_KEY) {
    try {
      const genAI = new ChatGPTAPI({
        apiKey: API_KEY,
      });

      const result = await genAI.sendMessage(
        answerPrompt + `the question is ${input}`
      );
      const text = result.text;
      return text;
    } catch (error) {
      cancel(
        chalk.red("An error occurred while generating the GPT response:", error)
      );
    }
  } else {
    cancel(chalk.red("GPT API Key not found"));
  }
}
