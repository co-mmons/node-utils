#!/usr/bin/env node

import * as watch from "chokidar";
import * as fse from "fs-extra";
import * as fs from "fs-extra";
import * as path from "path";
import {sourceDependencies} from "./sourceDependencies";

const rootDir = path.resolve("./");
const pckg = fs.readJsonSync("package.json");
const dependencies = sourceDependencies();

if (pckg.sourceDependenciesOutDir) {
    console.log(`Started watching source dependencies:`);

    for (const depName of Object.keys(dependencies)) {

        if (dependencies[depName].repoPath) {
            const source = path.resolve(dependencies[depName].repoPath);
            const out = path.resolve(rootDir, pckg.sourceDependenciesOutDir, depName);
            const watcher = watch.watch(source, {ignored: ".DS_Store"});

            console.log(`* ${out}`);

            watcher.on("change", (filename, stats) => {
                console.log(`changed file ${filename}`);
                fse.copySync(filename, path.join(out, filename.substr(source.length)), {preserveTimestamps: true});
            });

            watcher.on("add", (filename, stats) => {
                console.log(`added file ${filename}`);
                fse.copySync(filename, path.join(out, filename.substr(source.length)), {preserveTimestamps: true});
            });

            watcher.on("unlink", (filename, stats) => {
                console.log(`deleted file ${filename}`);
                fse.removeSync(path.join(out, filename.substr(source.length)));
            });

            watcher.on("unlinkDir", (filename, stats) => {
                console.log(`deleted dir ${filename}`);
                fse.removeSync(path.join(out, filename.substr(source.length)));
            });
        }
    }
}


