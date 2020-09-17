#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var watch = require("chokidar");
var fse = require("fs-extra");
var fs = require("fs-extra");
var path = require("path");
var sourceDependencies_1 = require("./sourceDependencies");
var rootDir = path.resolve("./");
var pckg = fs.readJsonSync("package.json");
var dependencies = sourceDependencies_1.sourceDependencies();
if (pckg.sourceDependenciesOutDir) {
    console.log("Started watching source dependencies:");
    var _loop_1 = function (depName) {
        if (dependencies[depName].repoPath) {
            var source_1 = path.resolve(dependencies[depName].repoPath);
            var out_1 = path.resolve(rootDir, pckg.sourceDependenciesOutDir, depName);
            var watcher = watch.watch(source_1, { ignored: ".DS_Store" });
            console.log("* " + out_1);
            watcher.on("change", function (filename, stats) {
                console.log("changed file " + filename);
                fse.copySync(filename, path.join(out_1, filename.substr(source_1.length)), { preserveTimestamps: true });
            });
            watcher.on("add", function (filename, stats) {
                console.log("added file " + filename);
                fse.copySync(filename, path.join(out_1, filename.substr(source_1.length)), { preserveTimestamps: true });
            });
            watcher.on("unlink", function (filename, stats) {
                console.log("deleted file " + filename);
                fse.removeSync(path.join(out_1, filename.substr(source_1.length)));
            });
            watcher.on("unlinkDir", function (filename, stats) {
                console.log("deleted dir " + filename);
                fse.removeSync(path.join(out_1, filename.substr(source_1.length)));
            });
        }
    };
    for (var _i = 0, _a = Object.keys(dependencies); _i < _a.length; _i++) {
        var depName = _a[_i];
        _loop_1(depName);
    }
}
