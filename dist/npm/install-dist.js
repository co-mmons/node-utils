#!/usr/bin/env node
"use strict";
var path = require("path");
var process = require("process");
var file_system_1 = require("../file-system");
console.log(process.env.PWD);
if (path.resolve(process.env.PWD, "../../node_modules") == process.env.PWD) {
    var source = path.join(process.env.PWD, "dist");
    var target = process.env.PWD;
    if (file_system_1.dirExists(source)) {
        file_system_1.copyFolderRecursiveSync(source, target);
    }
}
