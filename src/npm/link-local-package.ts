#!/usr/bin/env node

import * as FileSystem from "fs";
import * as Path from "path";
import * as ChildProcess from "child_process";

let args = process.argv.slice(2);

let nodeModulesPath = Path.join(process.cwd(), "node_modules");
let packageName = args.length > 0 ? args[0] : undefined;
let packageSrc = args.length > 1 ? Path.resolve(args[1]) : undefined;
let packageTmpPath = Path.join(nodeModulesPath, ".tmp-" + packageName);
let packagePath = Path.join(nodeModulesPath, packageName);

try {
    ChildProcess.execSync("hln -u " + packagePath);
} catch (e) {}

try {
    FileSystem.unlinkSync(packageTmpPath);
} catch (e) {}

ChildProcess.execSync("ln -s " + packageSrc + " " + packageTmpPath);

ChildProcess.execSync("hln " + packageTmpPath + " " + packagePath);
