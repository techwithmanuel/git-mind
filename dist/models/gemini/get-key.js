#!/usr/bin/env node
import fs from "fs";
import chalk from "chalk";
import path from "path";
import { configFilePath } from "../../utils/path.js";
const geminiKeyFilePath = path.join(configFilePath, "gemini.txt");
export function getGeminiAPIKey() {
    if (fs.existsSync(geminiKeyFilePath)) {
        try {
            const key = fs.readFileSync(geminiKeyFilePath, "utf-8").trim();
            return key;
        }
        catch (error) {
            console.log(chalk.red("Error reading Gemini Key file:", error));
        }
    }
    else {
        console.log(chalk.red("Unable to find Gemini Key"));
    }
}
