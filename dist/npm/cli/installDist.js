#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var process_1 = require("process");
var file_system_1 = require("../../file-system");
if (process_1.default.cwd().indexOf("node_modules") > -1) {
    var source = path_1.default.join(process_1.default.cwd(), "dist");
    var target = process_1.default.cwd();
    if (file_system_1.dirExists(source)) {
        file_system_1.copyDirRecursiveSync(source, target, { exclude: ["dist/package.json$", "dist/package-lock.json$", "dist/node_modules"] });
        fs_extra_1.default.removeSync(source);
    }
}
