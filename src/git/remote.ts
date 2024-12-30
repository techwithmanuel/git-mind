#!/usr/bin/env node

import { confirm, intro, outro, text } from "@clack/prompts";
import chalk from "chalk";
import { exec } from "child_process";
import { symbolResponseError } from "../utils/error/symbol.js";
import { generalError } from "../utils/error/general.js";

async function addRemoteRepo() {
  intro(
    chalk.cyanBright(
      "No remote repository found. Please create a new repository on GitHub and then provide the necessary details to connect it."
    )
  );

  exec(
    " git init; git add .; git commit -m 'chore: initial commit' ",
    (error) => {
      if (error) {
        generalError(
          "An error occured while pushing to your remote repo: " + error
        );
      }
    }
  );

  const username = await text({
    message: "What is your Github username:",
  });

  symbolResponseError(username);

  const repository = await text({
    message: "What is the name of your repository:",
  });

  symbolResponseError(repository);

  const remoteRepoURL = `https://github.com/${String(
    username.toString()
  )}/${String(repository.toString())}.git`;

  const confirmedRemoteURL = await text({
    message: "Is this URL correct ?",
    initialValue: remoteRepoURL,
    defaultValue: remoteRepoURL,
  });

  symbolResponseError(confirmedRemoteURL);

  exec(`git remote add origin ${confirmedRemoteURL.toString()}`, (error) => {
    if (error) {
      generalError("An error occured while connecting to remote repo" + error);
    }
  });

  const shouldMerge = await confirm({
    message: "Would you like to push to your remote repo ?",
  });

  if (Boolean(shouldMerge) === true) {
    const gitPushCommand = await text({
      message: "Is this command correct ?",
      initialValue: "git push -u origin master",
      defaultValue: "git push -u origin master",
    });

    symbolResponseError(gitPushCommand);

    exec(String(gitPushCommand.toString()), (error) => {
      if (error) {
        generalError(
          "An error occured while pushing to your remote repo: " + error
        );
      }
    });

    outro(chalk.green("Updates pushed succesfully"));
  } else {
    generalError();
  }
}

export async function pushToRemoteRepo() {
  exec(String("git push"), (error) => {
    if (error) {
      generalError(
        "An error occured while pushing to your remote repo: " + error
      );
    }
  });

  outro(chalk.green("Updates pushed succesfully"));
}

export async function verifyRemoteRepo() {
  intro(chalk.grey("Analyzing Repository ..."));

  const isConnectedToRemoteRepo = () => {
    return new Promise((resolve, _) => {
      exec("git remote -v", (error, _, stderr) => {
        if (error || stderr) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  };

  isConnectedToRemoteRepo().then((isConnected) => {
    if (!isConnected) {
      addRemoteRepo();
    }
  });
}

verifyRemoteRepo();
