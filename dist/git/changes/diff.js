#!/usr/bin/env node
import { execSync } from "child_process";
export function gitDiffForFile(fileName) {
    try {
        const diffOutput = execSync(`git diff --minimal --unified=0 ${fileName}`)
            .toString()
            .trim();
        const diffCached = execSync(`git diff --cached --minimal --unified=0 ${fileName}`)
            .toString()
            .trim();
        if (diffOutput) {
            return diffOutput;
        }
        else if (diffCached) {
            return diffCached;
        }
        else {
            throw new Error(`Unable to track ${fileName}`);
        }
    }
    catch (error) {
        console.error(`Error executing git diff: ${error}`);
    }
}
