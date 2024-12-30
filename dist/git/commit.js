#!/usr/bin/env node
import path from "path";
import { configFilePath } from "../utils/path.js";
import fs from "fs";
import { selectModel } from "../models/select.js";
import { generateClaudeCommit } from "../models/claude/commit.js";
import { generateGeminiCommit } from "../models/gemini/commit.js";
import { generalError } from "../utils/error/general.js";
const preferencesFilePath = path.join(configFilePath, "preferences");
export async function createGitCommit(diff) {
    if (fs.existsSync(preferencesFilePath)) {
        const preferences = fs
            .readFileSync(preferencesFilePath, "utf-8")
            .trim();
        const preferredModel = preferences;
        try {
            if (preferredModel === "claude") {
                const message = await generateClaudeCommit(diff);
                return message;
            }
            else if (preferredModel === "gemini") {
                const message = await generateGeminiCommit(diff);
                return message;
            }
            else if (preferredModel === "gpt") {
                const message = await generateGeminiCommit(diff);
                return message;
            }
            else {
                generalError("An error occured, please try again");
            }
        }
        catch (error) {
            generalError(`An error occured while creating Git commit with ${preferredModel} :  + ${error}`);
        }
    }
    else {
        selectModel();
    }
}
export async function hasPreferredModel() {
    if (fs.existsSync(preferencesFilePath)) {
        const preferences = fs
            .readFileSync(preferencesFilePath, "utf-8")
            .trim();
        const preferredModel = preferences;
        if (preferredModel) {
            return preferredModel;
        }
        return undefined;
    }
    else {
        return undefined;
    }
}
