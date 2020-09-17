#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var process = require("process");
var file_system_1 = require("../../file-system");
var sourceDependencies_1 = require("./sourceDependencies");
if (process.cwd().indexOf("node_modules") < 0) {
    var rootDir = path.resolve("./");
    var pckg = fs.readJsonSync("package.json");
    var dependencies = sourceDependencies_1.sourceDependencies();
    if (Object.keys(dependencies).length) {
        if (pckg.sourceDependenciesOutDir) {
            for (var _i = 0, _a = Object.keys(dependencies); _i < _a.length; _i++) {
                var depName = _a[_i];
                var out = path.resolve(rootDir, pckg.sourceDependenciesOutDir, depName);
                fs.ensureDirSync(out);
                file_system_1.copyDirRecursiveSync(dependencies[depName].path, out);
            }
        }
        else {
            throw new Error("package.json must have sourceDependenciesOutDir");
        }
    }
}
