#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var process = require("process");
var clearDir_1 = require("../clearDir");
var dirExists_1 = require("../dirExists");
var args = process.argv.slice(2);
var source = path.resolve(args[0]);
if (dirExists_1.dirExists(source)) {
    clearDir_1.clearDir(source);
}
