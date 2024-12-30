#!/usr/bin/env node

import os from "os";
import path from "path";
import fs from "fs";

export const configFilePath = path.join(os.homedir(), "git-mind");

if (!fs.existsSync(configFilePath)) {
  fs.mkdirSync(configFilePath, { recursive: true });
}
