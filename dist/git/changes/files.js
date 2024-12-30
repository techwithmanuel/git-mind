#!/usr/bin/env node
import { execSync } from "child_process";
export function checkGitStatus() {
    try {
        const statusOutput = execSync("git status", { encoding: "utf-8" }).trim();
        const lines = statusOutput.split("\n");
        const files = [];
        let isModifiedSection = false;
        let isUntrackedSection = false;
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine === "")
                continue;
            switch (true) {
                case trimmedLine.startsWith("Changes not staged for commit:"):
                    isModifiedSection = true;
                    isUntrackedSection = false;
                    break;
                case trimmedLine.startsWith("Untracked files:"):
                    isModifiedSection = false;
                    isUntrackedSection = true;
                    break;
                case trimmedLine.startsWith("("):
                    continue;
                case isModifiedSection && trimmedLine.startsWith("modified:"):
                    const [, filePath] = trimmedLine.split(":");
                    if (filePath?.trim())
                        files.push(filePath.trim());
                    break;
                case isUntrackedSection && !trimmedLine.startsWith("no changes added"):
                    files.push(trimmedLine);
                    break;
            }
        }
        return files.filter(Boolean);
    }
    catch (error) {
        console.error("Error checking git status:", error);
        return [];
    }
}
