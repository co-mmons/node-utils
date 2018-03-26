#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var process = require("process");
var file_system_1 = require("../file-system");
if (process.cwd().indexOf("node_modules") > -1) {
    var source = path.join(process.cwd(), "dist");
    var target = process.cwd();
    if (file_system_1.dirExists(source)) {
        file_system_1.copyFolderRecursiveSync(source, target, { exclude: ["dist/package.json$", "dist/package-lock.json$", "dist/node_modules"] });
    }
}
