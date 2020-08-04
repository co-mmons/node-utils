#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var process = require("process");
var copyDirRecursiveSync_1 = require("../copyDirRecursiveSync");
var dirExists_1 = require("../dirExists");
var args = process.argv.slice(2);
var source = path.resolve(args[0]);
var target = path.resolve(args[1]);
if (dirExists_1.dirExists(source)) {
    copyDirRecursiveSync_1.copyDirRecursiveSync(source, target);
}
