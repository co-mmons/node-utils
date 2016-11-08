#!/usr/bin/env node

import * as path from "path";
import * as process from "process";

import {dirExists, copyFolderRecursiveSync} from "../file-system";

if (process.cwd().indexOf("node_modules") > -1) {
    let source = path.join(process.cwd(), "dist");
    let target = process.cwd();

    if (dirExists(source)) {
        copyFolderRecursiveSync(source, target);
    }
}
