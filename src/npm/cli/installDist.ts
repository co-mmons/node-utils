#!/usr/bin/env node

import fse from "fs-extra";
import path from "path";
import process from "process";

import {copyDirRecursiveSync, dirExists} from "../../file-system";

if (process.cwd().indexOf("node_modules") > -1) {
    const source = path.join(process.cwd(), "dist");
    const target = process.cwd();

    if (dirExists(source)) {
        copyDirRecursiveSync(source, target, {exclude: ["dist/package.json$", "dist/package-lock.json$", "dist/node_modules"]});
        fse.removeSync(source);
    }
}
