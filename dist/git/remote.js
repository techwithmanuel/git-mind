#!/usr/bin/env node
import { confirm, intro, outro, text } from "@clack/prompts";
import chalk from "chalk";
import { exec } from "child_process";
import { symbolResponseError } from "../utils/error/symbol.js";
import { generalError } from "../utils/error/general.js";
function isGitInitialized() {
    return new Promise((resolve) => {
        exec("git rev-parse --is-inside-work-tree", (error) => {
            resolve(!error);
        });
    });
}
async function initializeGit() {
    return new Promise((resolve, reject) => {
        exec("git init; git add .; git commit -m 'chore: initial commit'", (error) => {
            if (error)
                reject(error);
            resolve(true);
        });
    });
}
async function addRemoteRepo() {
    intro(chalk.cyanBright("No remote repository found. Please create a new repository on GitHub and provide the connection details."));
    const username = await text({
        message: "What is your Github username:",
    });
    symbolResponseError(username);
    const repository = await text({
        message: "What is the name of your repository:",
    });
    symbolResponseError(repository);
    const remoteRepoURL = `https://github.com/${String(username)}/${String(repository)}.git`;
    const confirmedRemoteURL = await text({
        message: "Is this URL correct?",
        initialValue: remoteRepoURL,
        defaultValue: remoteRepoURL,
    });
    symbolResponseError(confirmedRemoteURL);
    return new Promise((resolve, reject) => {
        exec(`git remote add origin ${confirmedRemoteURL.toString()}`, (error) => {
            if (error)
                reject(error);
            resolve(true);
        });
    });
}
export async function pushToRemoteRepo() {
    return new Promise((resolve, reject) => {
        exec("git push", (error) => {
            if (error)
                reject(error);
            resolve(true);
        });
    });
}
async function handleInitialPush() {
    const shouldMerge = await confirm({
        message: "Would you like to push to your remote repo?",
    });
    if (shouldMerge) {
        const gitPushCommand = await text({
            message: "Is this command correct?",
            initialValue: "git push -u origin master",
            defaultValue: "git push -u origin master",
        });
        symbolResponseError(gitPushCommand);
        return new Promise((resolve, reject) => {
            exec(String(gitPushCommand), (error) => {
                if (error)
                    reject(error);
                resolve(true);
            });
        });
    }
    return false;
}
async function isConnectedToRemoteRepo() {
    return new Promise((resolve) => {
        exec("git remote -v", (error, _, stderr) => {
            resolve(!(error || stderr));
        });
    });
}
export async function verifyRemoteRepo() {
    try {
        const isInitialized = await isGitInitialized();
        if (!isInitialized) {
            await initializeGit();
        }
        const hasRemote = await isConnectedToRemoteRepo();
        console.log(hasRemote);
        if (!hasRemote) {
            await addRemoteRepo();
            await handleInitialPush();
            outro(chalk.green("Repository setup completed successfully"));
        }
    }
    catch (error) {
        generalError("An error occurred: " + error);
    }
}
