#!/usr/bin/env node
"use strict";
var path = require("path");
var process = require("process");
var file_system_1 = require("../file-system");
var args = process.argv.slice(2);
var source = path.join(process.env.PWD, "dist");
var target = process.env.PWD;
console.log(source);
if (file_system_1.dirExists(source)) {
}
