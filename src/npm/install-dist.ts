#!/usr/bin/env node

import * as path from "path";
import * as process from "process";

import {dirExists, copyFolderRecursiveSync} from "../file-system";

if (path.resolve(process.env.PWD, "../../node_modules") == process.env.PWD) {
    let source = path.join(process.env.PWD, "dist");
    let target = process.env.PWD;

    if (dirExists(source)) {
        copyFolderRecursiveSync(source, target);
    }
}
