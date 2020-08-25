#!/usr/bin/env node

import * as fs from "fs-extra";
import * as path from "path";
import * as process from "process";
import {copyDirRecursiveSync} from "../../file-system";

const rootDir = path.resolve("./");

if (process.cwd().indexOf("node_modules") < 0) {

    const pckg = fs.readJsonSync("package.json");

    if (pckg.sourceDependencies) {
        const deps = readPackageJson(rootDir, {});

        if (Object.keys(deps).length) {

            if (pckg.sourceDependenciesOutDir) {

                for (const depName in deps) {
                    const out = path.resolve(rootDir, pckg.sourceDependenciesOutDir, depName);
                    fs.ensureDirSync(out);
                    copyDirRecursiveSync(deps[depName], out);
                }

            } else {
                throw new Error("package.json must have sourceDependenciesOutDir");
            }
        }
    }
}

function readPackageJson(dir: string, deps: {[depsName: string]: string}) {

    const jsonPath = path.resolve(dir, "package.json");
    if (!fs.existsSync(jsonPath)) {
        console.warn("Missing package.json in " + dir + " - it should be there if you want to use source dependencies.");
        return deps;
    }

    const pckg = fs.readJsonSync(jsonPath);

    if (deps[pckg.name]) {
        return deps;
    }

    if (pckg.sourceDependencyDir) {
        deps[pckg.name] = path.resolve(dir, pckg.sourceDependencyDir);
    }

    for (const dep of pckg.sourceDependencies || []) {
        readPackageJson(path.resolve(rootDir, "node_modules", dep), deps);
    }

    return deps;
}
