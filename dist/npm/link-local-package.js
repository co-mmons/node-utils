#!/usr/bin/env node
"use strict";
var FileSystem = require("fs");
var Path = require("path");
var ChildProcess = require("child_process");
var args = process.argv.slice(2);
var nodeModulesPath = Path.join(process.argv[1], "../../");
var packageName = args.length > 0 ? args[0] : undefined;
var packageSrc = args.length > 1 ? Path.resolve(args[1]) : undefined;
var packageTmpPath = Path.join(nodeModulesPath, ".tmp-" + packageName);
var packagePath = Path.join(nodeModulesPath, packageName);
try {
    FileSystem.unlinkSync(packageTmpPath);
}
catch (e) { }
ChildProcess.execSync("ln -s " + packageSrc + " " + packageTmpPath);
try {
    ChildProcess.execSync("hln -u " + packagePath);
}
catch (e) { }
ChildProcess.execSync("hln " + packageTmpPath + " " + packagePath);
