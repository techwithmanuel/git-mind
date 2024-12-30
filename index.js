#!/usr/bin/env node
import { verifyRemoteRepo } from "./dist/git/remote.js";
async function initGitCommit() {
  await verifyRemoteRepo();
}
initGitCommit();
