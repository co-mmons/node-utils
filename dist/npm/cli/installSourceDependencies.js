"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var process = require("process");
var file_system_1 = require("../../file-system");
var rootDir = path.resolve("./");
if (process.cwd().indexOf("node_modules") < 0) {
    var pckg = fs.readJsonSync("package.json");
    if (pckg.sourceDependencies) {
        var deps = readPackageJson(rootDir, {});
        if (Object.keys(deps).length) {
            if (pckg.sourceDependenciesOutDir) {
                var out = path.resolve(rootDir, pckg.sourceDependenciesOutDir);
                fs.ensureDirSync(out);
                for (var depName in deps) {
                    file_system_1.copyDirRecursiveSync(deps[depName], path.resolve(out, depName));
                }
            }
            else {
                throw new Error("package.json must have sourceDependenciesOutDir");
            }
        }
    }
}
function readPackageJson(dir, deps) {
    var pckg = fs.readJsonSync(path.resolve(dir, "package.json"));
    if (deps[pckg.name]) {
        return deps;
    }
    if (pckg.sourceDependencyDir) {
        deps[pckg.name] = path.resolve(dir, pckg.sourceDependencyDir);
    }
    for (var _i = 0, _a = pckg.sourceDependencies || []; _i < _a.length; _i++) {
        var dep = _a[_i];
        readPackageJson(path.resolve(rootDir, dep), deps);
    }
    return deps;
}
