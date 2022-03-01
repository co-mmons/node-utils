#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var watch = require("chokidar");
var fs_extra_1 = require("fs-extra");
var path = require("path");
var sourceDependencies_1 = require("./sourceDependencies");
var rootDir = path.resolve("./");
var pckg = (0, fs_extra_1.readJsonSync)("package.json");
var dependencies = (0, sourceDependencies_1.sourceDependencies)();
if (pckg.sourceDependenciesOutDir) {
    console.log("Started watching source dependencies:");
    var _loop_1 = function (depName) {
        if (dependencies[depName].repoPath) {
            var source_1 = path.resolve(dependencies[depName].repoPath, dependencies[depName].srcDir);
            var moduleOut_1 = path.resolve(rootDir, "node_modules", depName, dependencies[depName].srcDir);
            var out_1 = path.resolve(rootDir, pckg.sourceDependenciesOutDir, depName);
            var watcher = watch.watch(source_1, { ignored: ".DS_Store" });
            console.log("* ".concat(out_1));
            watcher.on("change", function (filename, stats) {
                console.log("changed file ".concat(filename));
                for (var _i = 0, _a = [moduleOut_1, out_1]; _i < _a.length; _i++) {
                    var o = _a[_i];
                    (0, fs_extra_1.copySync)(filename, path.join(o, filename.substr(source_1.length)), { preserveTimestamps: true });
                }
            });
            watcher.on("add", function (filename, stats) {
                console.log("added file ".concat(filename));
                for (var _i = 0, _a = [moduleOut_1, out_1]; _i < _a.length; _i++) {
                    var o = _a[_i];
                    (0, fs_extra_1.copySync)(filename, path.join(o, filename.substr(source_1.length)), { preserveTimestamps: true });
                }
            });
            watcher.on("unlink", function (filename, stats) {
                console.log("deleted file ".concat(filename));
                for (var _i = 0, _a = [moduleOut_1, out_1]; _i < _a.length; _i++) {
                    var o = _a[_i];
                    (0, fs_extra_1.removeSync)(path.join(o, filename.substr(source_1.length)));
                }
            });
            watcher.on("unlinkDir", function (filename, stats) {
                console.log("deleted dir ".concat(filename));
                for (var _i = 0, _a = [moduleOut_1, out_1]; _i < _a.length; _i++) {
                    var o = _a[_i];
                    (0, fs_extra_1.removeSync)(path.join(o, filename.substr(source_1.length)));
                }
            });
        }
    };
    for (var _i = 0, _a = Object.keys(dependencies); _i < _a.length; _i++) {
        var depName = _a[_i];
        _loop_1(depName);
    }
}
