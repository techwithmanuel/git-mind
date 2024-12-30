import { cancel, spinner } from "@clack/prompts";
import chalk from "chalk";

export const sleep = (ms = 1000): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function awaitingFnCall<T>(
  fn: () => Promise<T>,
  successMessage?: string
): Promise<T | any> {
  const s = spinner();
  s.start();

  try {
    const result = await fn();
    s.stop(successMessage);
    return result;
  } catch (error) {
    s.stop("An error occurred.");
    cancel(chalk.red("An error occurred:", error));
  }
}
