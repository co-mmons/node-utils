#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var watch = require("chokidar");
var fse = require("fs-extra");
var path = require("path");
var process = require("process");
var args = process.argv.slice(2);
var source = args.length > 0 ? path.resolve(args[0]) : undefined;
var target = args.length > 1 ? path.resolve(args[1]) : undefined;
if (!source) {
    console.error("Source dir must be given as a first cli argument");
    process.exit(0);
}
if (!target) {
    console.error("Target dir must be given as a first cli argument");
    process.exit(0);
}
var watcher = watch.watch(source, { ignored: ".DS_Store" });
console.log("Started watch-duplicate of ".concat(source, ", duplicated to ").concat(target));
watcher.on("change", function (filename, stats) {
    console.log("Changed file ".concat(filename));
    fse.copySync(filename, path.join(target, filename.substr(source.length)), { preserveTimestamps: true });
});
watcher.on("add", function (filename, stats) {
    console.log("Added file ".concat(filename));
    fse.copySync(filename, path.join(target, filename.substr(source.length)), { preserveTimestamps: true });
});
watcher.on("unlink", function (filename, stats) {
    console.log("Deleted file ".concat(filename));
    fse.removeSync(path.join(target, filename.substr(source.length)));
});
watcher.on("unlinkDir", function (filename, stats) {
    console.log("Deleted dir ".concat(filename));
    fse.removeSync(path.join(target, filename.substr(source.length)));
});
