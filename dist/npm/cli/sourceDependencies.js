"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceDependencies = void 0;
var fs = require("fs-extra");
var path = require("path");
var rootDir = path.resolve("./");
var rootPckg = fs.readJsonSync("package.json");
function sourceDependencies() {
    var deps = {};
    if (rootPckg.sourceDependencies) {
        readPackageDependencies(rootDir, deps);
    }
    return deps;
}
exports.sourceDependencies = sourceDependencies;
function readPackageDependencies(dir, deps) {
    var jsonPath = path.resolve(dir, "package.json");
    if (!fs.existsSync(jsonPath)) {
        console.warn("Missing package.json in ".concat(dir, " it should be there if you want to use source dependencies."));
        return deps;
    }
    var pckg = fs.readJsonSync(jsonPath);
    if (deps[pckg.name]) {
        return deps;
    }
    if (pckg.sourceDependencyDir && pckg.name !== rootPckg.name) {
        deps[pckg.name] = { modulePath: path.resolve(dir), srcPath: path.resolve(dir, pckg.sourceDependencyDir), srcDir: pckg.sourceDependencyDir };
    }
    var sourceDeps = Array.isArray(pckg.sourceDependencies) ? Object.assign.apply(Object, __spreadArray([{}], (pckg.sourceDependencies.map(function (dep) {
        var _a;
        return (_a = {}, _a[dep] = {}, _a);
    })), false)) : pckg.sourceDependencies;
    for (var moduleName in sourceDeps) {
        readPackageDependencies(path.resolve(rootDir, "node_modules", moduleName), deps);
        if (rootDir === dir && sourceDeps[moduleName].repoPath && deps[moduleName]) {
            deps[moduleName].repoPath = path.resolve(sourceDeps[moduleName].repoPath);
        }
    }
    return deps;
}
