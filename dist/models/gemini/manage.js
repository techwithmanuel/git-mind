#!/usr/bin/env node
import { text, confirm, intro, select, cancel } from "@clack/prompts";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { configFilePath } from "../../utils/path.js";
const geminiKeyFilePath = path.join(configFilePath, "gemini.txt");
export async function registerGeminiAPIKey() {
    const API_KEY = await text({
        message: "Enter your Gemini API Key:",
    });
    if (API_KEY.toString().includes("clack:cancel")) {
        return cancel(chalk.bgHex("#d96570")("Operation cancelled"));
    }
    fs.writeFileSync(geminiKeyFilePath, String(API_KEY));
    cancel(chalk.black.bgGreen("API Key registered successfully!"));
}
async function deleteGeminiAPIKey() {
    const confirmation = await confirm({
        message: "Are you sure you want to delete your Gemini API Key",
    });
    const confirmed = Boolean(confirmation);
    if (confirmed) {
        if (fs.existsSync(geminiKeyFilePath)) {
            fs.unlinkSync(geminiKeyFilePath);
            cancel(chalk.black.bgGreen("API Key deleted successfully!"));
        }
        else {
            cancel(chalk.bgHex("#d96570")("No API Key found to delete."));
        }
    }
    else {
        cancel(chalk.bgHex("#d96570")("Action cancelled"));
    }
}
async function updateGeminiAPIKey() {
    if (fs.existsSync(geminiKeyFilePath) && fs.existsSync(configFilePath)) {
        const currentAPIKey = fs.readFileSync(geminiKeyFilePath, {
            encoding: "utf8",
        });
        const updatedAPIKey = await text({
            message: "Enter your Gemini API Key:",
            defaultValue: currentAPIKey,
            initialValue: currentAPIKey,
        });
        if (updatedAPIKey.toString().includes("clack:cancel")) {
            return cancel(chalk.bgHex("#d96570")("Operation cancelled"));
        }
        fs.writeFileSync(geminiKeyFilePath, String(updatedAPIKey), {
            encoding: "utf8",
        });
        cancel(chalk.black.bgGreen("API Key updated successfully"));
    }
    else {
        cancel(chalk.bgHex("#d96570")("Please register your Gemini API Key first"));
    }
}
export async function manageGeminiAPIKey() {
    await intro(chalk.bgHex("#d96570")("🗄️ Manage Gemini"));
    const option = await select({
        message: "Actions",
        options: [
            { value: "register", label: "Register API KEY" },
            {
                value: "update",
                label: "Update API KEY",
            },
            {
                value: "delete",
                label: "Delete API KEY",
            },
        ],
    });
    const action = option;
    if (action === "register") {
        registerGeminiAPIKey();
    }
    else if (action === "update") {
        updateGeminiAPIKey();
    }
    else if (action === "delete") {
        deleteGeminiAPIKey();
    }
    else {
        cancel(chalk.bgHex("#d96570")("No option selected"));
    }
}
