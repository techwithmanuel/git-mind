#!/usr/bin/env node

import { cancel, isCancel } from "@clack/prompts";
import { safeExit } from "./general.js";

export function symbolResponseError(
  value: string | symbol,
  message = "Operation cancelled. "
) {
  if (isCancel(value)) {
    cancel(message);
    safeExit(1);
  }
}
