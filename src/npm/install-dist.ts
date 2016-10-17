#!/usr/bin/env node

import * as path from "path";
import * as process from "process";

import {dirExists, copyFolderRecursiveSync} from "../file-system";

let pwd = (process.env.PWD as string).split(path.sep);

if (pwd[pwd.length - 1] == "node_modules") {
    let source = path.join(process.env.PWD, "dist");
    let target = process.env.PWD;

    if (dirExists(source)) {
        copyFolderRecursiveSync(source, target);
    }
}
