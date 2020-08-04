#!/usr/bin/env node

import * as ChildProcess from "child_process";
import * as FileSystem from "fs";
import * as Path from "path";

const args = process.argv.slice(2);

const nodeModulesPath = Path.join(process.cwd(), "node_modules");
const packageName = args.length > 0 ? args[0] : undefined;
const packageSrc = args.length > 1 ? Path.resolve(args[1]) : undefined;
const packageTmpPath = Path.join(nodeModulesPath, ".tmp-" + packageName);
const packagePath = Path.join(nodeModulesPath, packageName);

try {
    ChildProcess.execSync("hln -u " + packagePath);
} catch (e) {}

try {
    FileSystem.unlinkSync(packageTmpPath);
} catch (e) {}

ChildProcess.execSync("ln -s " + packageSrc + " " + packageTmpPath);

ChildProcess.execSync("hln " + packageTmpPath + " " + packagePath);
