#!/usr/bin/env node

import * as watch from "chokidar";
import * as fse from "fs-extra";
import * as path from "path";
import * as process from "process";

const args = process.argv.slice(2);

const source = args.length > 0 ? path.resolve(args[0]) : undefined;
const target = args.length > 1 ? path.resolve(args[1]) : undefined;

if (!source) {
    console.error("Source dir must be given as a first cli argument");
    process.exit(0);
}

if (!target) {
    console.error("Target dir must be given as a first cli argument");
    process.exit(0);
}

const watcher = watch.watch(source, {ignored: ".DS_Store"});

console.log(`Started watch-duplicate of ${source}, duplicated to ${target}`)

function fileEquals(input: string) {

    const inputBuffer = fse.readFileSync(input);
    const destPath = path.join(target, input.substring(source.length));
    const destBuffer = fse.existsSync(destPath) && fse.readFileSync(destPath);

    return destBuffer && inputBuffer.equals(destBuffer);
}

watcher.on("change", (filename, stats) => {
    if (!fileEquals(filename)) {
        console.log(`Changed file ${filename}`);
        fse.copySync(filename, path.join(target, filename.substring(source.length)), {preserveTimestamps: true});
    }
});

watcher.on("add", (filename, stats) => {
    if (!fileEquals(filename)) {
        console.log(`Added file ${filename}`);
        fse.copySync(filename, path.join(target, filename.substr(source.length)), {preserveTimestamps: true});
    }
});

watcher.on("unlink", (filename, stats) => {
    console.log(`Deleted file ${filename}`);
    fse.removeSync(path.join(target, filename.substr(source.length)));
});

watcher.on("unlinkDir", (filename, stats) => {
    console.log(`Deleted dir ${filename}`);
    fse.removeSync(path.join(target, filename.substr(source.length)));
});
