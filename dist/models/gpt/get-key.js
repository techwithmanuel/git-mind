#!/usr/bin/env node
import fs from "fs";
import chalk from "chalk";
import path from "path";
import { configFilePath } from "../../utils/path.js";
const gptKeyFilePath = path.join(configFilePath, "open-ai.txt");
export function getGPTAPIKey() {
    if (fs.existsSync(gptKeyFilePath)) {
        try {
            const key = fs.readFileSync(gptKeyFilePath, "utf-8").trim();
            return key;
        }
        catch (error) {
            console.log(chalk.red("Error reading OpenAI Key file:", error));
        }
    }
    else {
        console.log(chalk.red("Unable to find OpenAI Key"));
    }
}
