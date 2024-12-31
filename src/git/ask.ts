import { text, outro, intro, cancel, isCancel, note } from "@clack/prompts";
import { Model, selectModel } from "../models/select.js";
import { hasPreferredModel } from "./commit.js";
import { registerKey, validateAPIKey } from "./init.js";
import { symbolResponseError } from "../utils/error/symbol.js";
import { generateGeminiAnswer } from "../models/gemini/answer.js";
import { generateGPTAnswer } from "../models/gpt/answer.js";
import { generateClaudeAnswer } from "../models/claude/answer.js";
import chalk from "chalk";
import { awaitingFnCall } from "../utils/sleep/index.js";

async function queryModel(model: Model) {
  intro(chalk.gray("Ask your AI Git related questions 🔎"));

  const question = await text({
    message: "What command are you trying to write",
  });

  if (isCancel(question)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  symbolResponseError(String(question));

  let answer;

  switch (model) {
    case "claude":
      answer = await awaitingFnCall(() =>
        generateClaudeAnswer(String(question))
      );
      break;
    case "gemini":
      answer = await awaitingFnCall<string | undefined>(() =>
        generateGeminiAnswer(String(question))
      );
      break;
    case "gpt":
      answer = await awaitingFnCall<string | undefined>(() =>
        generateGPTAnswer(String(question))
      );
      break;
    default:
      cancel(`Model ${model} is not recognized`);
      return;
  }

  note(String(answer));

  outro("Run this command(s) in your terminal");
}

export async function askPreferredModel() {
  let model = await hasPreferredModel();

  if (!model) {
    await selectModel();
  } else {
    const hasValidKey = await validateAPIKey(model);

    if (!hasValidKey) {
      await registerKey(model);
    } else {
      await queryModel(model);
    }
  }
}
