#!/usr/bin/env node
process.noDeprecation = true;
import { exec } from "child_process";
import { gitDiffForFile } from "./git/changes/diff.js";
import { checkGitStatus } from "./git/changes/files.js";
import { createGitCommit, hasPreferredModel } from "./git/commit.js";
import { verifyRemoteRepo, pushToRemoteRepo } from "./git/remote.js";
import { getClaudeAPIKey } from "./models/claude/get-key.js";
import { registerClaudeAPIKey } from "./models/claude/manage.js";
import { getGeminiAPIKey } from "./models/gemini/get-key.js";
import { registerGeminiAPIKey } from "./models/gemini/manage.js";
import { getGPTAPIKey } from "./models/gpt/get-key.js";
import { registerGPTAPIKey } from "./models/gpt/manage.js";
import { selectModel } from "./models/select.js";
async function validateAPIKey(model) {
    let key;
    if (model === "claude") {
        key = getClaudeAPIKey();
    }
    else if (model === "gpt") {
        key = getGPTAPIKey();
    }
    else if (model === "gemini") {
        key = getGeminiAPIKey();
    }
    console.log(key);
    if (!key || key.length === 0) {
        return false;
    }
    return true;
}
async function registerKey(model) {
    const registrations = {
        claude: registerClaudeAPIKey,
        gpt: registerGPTAPIKey,
        gemini: registerGeminiAPIKey,
    };
    await registrations[model]();
}
async function processGitChanges(files) {
    if (files.length > 5) {
        console.log("More than 5 files, running git add .");
        exec("git add .", (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(stdout);
            console.error(stderr);
        });
        const diffs = await Promise.all(files.slice(0, 2).map(async (file) => {
            const diff = await gitDiffForFile(file);
            return diff ? diff : "";
        }));
        const combinedDiff = diffs.join("\n");
        console.log("generating");
        const commitMessage = await createGitCommit(combinedDiff);
        exec(`git commit -am "${commitMessage}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(stdout);
            console.error(stderr);
        });
    }
    else {
        for (const file of files) {
            console.log(`Staging file: ${file}`);
            exec(`git add ${file}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(stdout);
                console.error(stderr);
            });
            const diff = await gitDiffForFile(file);
            if (diff) {
                console.log("generating");
                const commitMessage = await createGitCommit(diff);
                exec(`git commit -am "${commitMessage}"`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                    console.log(stdout);
                    console.error(stderr);
                });
            }
        }
    }
    await pushToRemoteRepo();
}
async function initGitCommit() {
    try {
        await verifyRemoteRepo();
        const files = checkGitStatus();
        let model = await hasPreferredModel();
        if (!model) {
            await selectModel();
        }
        else {
            const hasValidKey = await validateAPIKey(model);
            if (!hasValidKey) {
                await registerKey(model);
                return;
            }
            else {
                await processGitChanges(files);
            }
        }
    }
    catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}
initGitCommit();
