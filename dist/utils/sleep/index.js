import { cancel, spinner } from "@clack/prompts";
import chalk from "chalk";
export const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
export async function awaitingFnCall(fn, successMessage = "Operation completed") {
    const s = spinner();
    s.start("Processing...");
    try {
        await fn();
        s.stop(successMessage);
    }
    catch (error) {
        s.stop("An error occurred.");
        cancel(chalk.red("An error occured", error));
    }
}
