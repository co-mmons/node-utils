#!/usr/bin/env node

import * as fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";
import * as process from "process";
import * as watch from "chokidar";

let args = process.argv.slice(2);

let source = args.length > 0 ? path.resolve(args[0]) : undefined;
let target = args.length > 1 ? path.resolve(args[1]) : undefined;

if (!source) {
    console.error("Source dir must be given as a first cli argument");
    process.exit(0);
}

if (!target) {
    console.error("Target dir must be given as a first cli argument");
    process.exit(0);
}

var watcher = watch.watch(source, {ignored: ".DS_Store"});

console.log(`Started watch-duplicate of ${source}, duplicated to ${target}`)

watcher.on("change", (filename, stats) => {
    console.log(`Changed file ${filename}`);
    fse.copy(filename, path.join(target, filename.substr(source.length)), {preserveTimestamps: true});
});

watcher.on("add", (filename, stats) => {
    console.log(`Added file ${filename}`);
    fse.copy(filename, path.join(target, filename.substr(source.length)), {preserveTimestamps: true});
});

watcher.on("unlink", (filename, stats) => {
    console.log(`Deleted file ${filename}`);
    fse.remove(path.join(target, filename.substr(source.length)));
});

watcher.on("unlinkDir", (filename, stats) => {
    console.log(`Deleted dir ${filename}`);
    fse.remove(path.join(target, filename.substr(source.length)));
});