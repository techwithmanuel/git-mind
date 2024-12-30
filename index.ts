#!/usr/bin/env node

import { gitDiffForFile } from "./src/git/changes/diff.js";
import { checkGitStatus } from "./src/git/changes/files.js";
import { createGitCommit } from "./src/git/commit.js";
import { verifyRemoteRepo, pushToRemoteRepo } from "./src/git/remote.js";

async function initGitCommit() {
  await verifyRemoteRepo();
}

initGitCommit();
