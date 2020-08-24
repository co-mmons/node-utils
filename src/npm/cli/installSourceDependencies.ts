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
                const out = path.resolve(rootDir, pckg.sourceDependenciesOutDir);
                fs.ensureDirSync(out);

                for (const depName in deps) {
                    copyDirRecursiveSync(deps[depName], path.resolve(out, depName));
                }

            } else {
                throw new Error("package.json must have sourceDependenciesOutDir");
            }
        }
    }
}

function readPackageJson(dir: string, deps: {[depsName: string]: string}) {
    const pckg = fs.readJsonSync(path.resolve(dir, "package.json"));

    if (deps[pckg.name]) {
        return deps;
    }

    if (pckg.sourceDependencyDir) {
        deps[pckg.name] = path.resolve(dir, pckg.sourceDependencyDir);
    }

    for (const dep of pckg.sourceDependencies || []) {
        readPackageJson(path.resolve(rootDir, dep), deps);
    }

    return deps;
}
