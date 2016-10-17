#!/usr/bin/env node

import * as path from "path";
import * as process from "process";

import {dirExists, copyFolderRecursiveSync} from "../file-system";

let args = process.argv.slice(2);
let source = path.join(process.env.PWD, "dist");
let target = process.env.PWD;
console.log(source);
if (dirExists(source)) {
    //copyFolderRecursiveSync(source, target);
}
