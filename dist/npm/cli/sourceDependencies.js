"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceDependencies = void 0;
var fs = require("fs-extra");
var path = require("path");
var rootDir = path.resolve("./");
function sourceDependencies() {
    var pckg = fs.readJsonSync("package.json");
    var deps = {};
    if (pckg.sourceDependencies) {
        readPackageDependencies(rootDir, deps);
    }
    return deps;
}
exports.sourceDependencies = sourceDependencies;
function readPackageDependencies(dir, deps) {
    var jsonPath = path.resolve(dir, "package.json");
    if (!fs.existsSync(jsonPath)) {
        console.warn("Missing package.json in " + dir + " it should be there if you want to use source dependencies.");
        return deps;
    }
    var pckg = fs.readJsonSync(jsonPath);
    if (deps[pckg.name]) {
        return deps;
    }
    if (pckg.sourceDependencyDir) {
        deps[pckg.name] = { modulePath: path.resolve(dir), srcPath: path.resolve(dir, pckg.sourceDependencyDir), srcDir: pckg.sourceDependencyDir };
    }
    var sourceDeps = Array.isArray(pckg.sourceDependencies) ? Object.assign.apply(Object, __spreadArrays([{}], (pckg.sourceDependencies.map(function (dep) {
        var _a;
        return (_a = {}, _a[dep] = {}, _a);
    })))) : pckg.sourceDependencies;
    for (var moduleName in sourceDeps) {
        readPackageDependencies(path.resolve(rootDir, "node_modules", moduleName), deps);
        if (rootDir === dir && sourceDeps[moduleName].repoPath && deps[moduleName]) {
            deps[moduleName].repoPath = path.resolve(sourceDeps[moduleName].repoPath);
        }
    }
    return deps;
}
