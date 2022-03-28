#!/usr/bin/env node

import * as path from "path";
import * as process from "process";
import {clearDir, copyDirRecursiveSync, dirExists} from "../../file-system";

console.log("Install dist", process.cwd());

if (process.cwd().indexOf("node_modules") > -1) {
    const source = path.join(process.cwd(), "dist");
    const target = process.cwd();

    if (dirExists(source)) {
        console.log("Copy dist", source, "==>", target);
        copyDirRecursiveSync(source, target, {exclude: ["dist/package.json$", "dist/package-lock.json$", "dist/node_modules"]});
        clearDir(source);
    }
}
