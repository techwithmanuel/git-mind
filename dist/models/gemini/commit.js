#!/usr/bin/env node
import chalk from "chalk";
import { exec } from "child_process";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { base } from "../prompt.js";
import { getGeminiAPIKey } from "./get-key.js";
import { cancel } from "@clack/prompts";
export async function generateGeminiCommit(input) {
    const API_KEY = getGeminiAPIKey();
    if (API_KEY) {
        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(base + `the git diff is ${input}`);
            const response = await result.response;
            const text = response.text();
            return text;
        }
        catch (error) {
            exec("git reset");
            cancel(chalk.red("An error occurred while generating the Gemini response:", error));
        }
    }
    else {
        cancel(chalk.red("Gemini API Key not found"));
    }
}
