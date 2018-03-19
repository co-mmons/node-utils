"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var fse = require("fs-extra");
var path = require("path");
var Glob = require("glob");
function copyFileSync(source, target) {
    fs.writeFileSync(target, fs.readFileSync(source));
}
exports.copyFileSync = copyFileSync;
function copyFolderRecursiveSync(source, target, options) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }
    // copy
    if (fs.lstatSync(source).isDirectory()) {
        fs.readdirSync(source).forEach(function (fileName) {
            var file = path.join(source, fileName);
            if (options && options.exclude) {
                for (var _i = 0, _a = options.exclude; _i < _a.length; _i++) {
                    var e = _a[_i];
                    if (file.match(e)) {
                        return;
                    }
                }
            }
            if (fs.lstatSync(file).isDirectory()) {
                copyFolderRecursiveSync(file, path.join(target, fileName));
            }
            else {
                copyFileSync(file, path.join(target, fileName));
            }
        });
    }
}
exports.copyFolderRecursiveSync = copyFolderRecursiveSync;
function clearDir(dir) {
    var files;
    try {
        files = fs.readdirSync(dir);
    }
    catch (e) {
        return;
    }
    if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var file = path.resolve(dir, files[i]);
            if (fs.statSync(file).isFile()) {
                fs.unlinkSync(file);
            }
            else {
                clearDir(file);
                fs.rmdirSync(file);
            }
        }
    }
}
exports.clearDir = clearDir;
function createDirIfNotExists(path) {
    var stat;
    try {
        stat = fs.statSync(path);
    }
    catch (e) {
    }
    if (stat && !stat.isDirectory()) {
        throw "Cannot create directory - there is a file named like request directory: " + path;
    }
    else if (stat && stat.isDirectory()) {
    }
    else {
        fs.mkdirSync(path);
    }
}
exports.createDirIfNotExists = createDirIfNotExists;
function dirExists(path) {
    var stat;
    try {
        stat = fs.statSync(path);
    }
    catch (e) {
    }
    if (stat && stat.isDirectory()) {
        return true;
    }
    return false;
}
exports.dirExists = dirExists;
function createDirs(folderPath, mode) {
    var folders = [];
    var tmpPath = path.normalize(folderPath);
    var exists = fs.existsSync(tmpPath);
    while (!exists) {
        folders.push(tmpPath);
        tmpPath = path.join(tmpPath, '..');
        exists = fs.existsSync(tmpPath);
    }
    for (var i = folders.length - 1; i >= 0; i--) {
        fs.mkdirSync(folders[i], mode);
    }
}
exports.createDirs = createDirs;
function globDelete(paths, options) {
    var rootDir = options && options.root ? path.resolve(options.root) : process.cwd();
    paths.forEach(function (query) {
        if (typeof query === "string") {
            Glob.sync(query, { root: rootDir }).forEach(function (file) {
                file = path.resolve(rootDir, file);
                var stat = fs.statSync(file);
                if (stat.isDirectory()) {
                    fse.removeSync(file);
                }
                else {
                    fs.unlinkSync(file);
                }
            });
        }
    });
}
exports.globDelete = globDelete;
;
function globCopy(source, segments, target) {
    var sourceDir = path.resolve(source);
    var targetDir = path.resolve(target);
    segments.forEach(function (query) {
        if (typeof query === "string") {
            Glob.sync((query.charAt(0) === "/" ? "" : "/") + query, { root: sourceDir }).forEach(function (segment) {
                var sourcePath = path.resolve(sourceDir, segment);
                var targetPath = path.resolve(targetDir, segment.replace(sourceDir + "/", ""));
                var stat = fs.statSync(sourcePath);
                if (stat.isFile()) {
                    createDirs(path.dirname(targetPath));
                    copyFileSync(sourcePath, targetPath);
                }
            });
        }
    });
}
exports.globCopy = globCopy;
;
