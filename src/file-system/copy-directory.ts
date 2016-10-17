#!/usr/bin/env node

import * as path from "path";
import * as process from "process";

import {dirExists, copyFolderRecursiveSync} from "./";

let args = process.argv.slice(2);
let source = path.resolve(args[0]);
let target = path.resolve(args[1]);

if (dirExists(source)) {
    copyFolderRecursiveSync(source, target);
}
