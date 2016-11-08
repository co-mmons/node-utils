"use strict";
var FileSystem = require("fs");
var FileSystemExtra = require("fs-extra");
var Path = require("path");
var Glob = require("glob");
function copyFileSync(source, target) {
    FileSystem.writeFileSync(target, FileSystem.readFileSync(source));
}
exports.copyFileSync = copyFileSync;
function copyFolderRecursiveSync(source, target) {
    if (!FileSystem.existsSync(target)) {
        FileSystem.mkdirSync(target);
    }
    // copy
    if (FileSystem.lstatSync(source).isDirectory()) {
        FileSystem.readdirSync(source).forEach(function (fileName) {
            var file = Path.join(source, fileName);
            if (FileSystem.lstatSync(file).isDirectory()) {
                copyFolderRecursiveSync(file, Path.join(target, fileName));
            }
            else {
                copyFileSync(file, Path.join(target, fileName));
            }
        });
    }
}
exports.copyFolderRecursiveSync = copyFolderRecursiveSync;
function clearDir(dir) {
    var files;
    try {
        files = FileSystem.readdirSync(dir);
    }
    catch (e) {
        return;
    }
    if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var file = Path.resolve(dir, files[i]);
            if (FileSystem.statSync(file).isFile()) {
                FileSystem.unlinkSync(file);
            }
            else {
                clearDir(file);
                FileSystem.rmdirSync(file);
            }
        }
    }
}
exports.clearDir = clearDir;
function createDirIfNotExists(path) {
    var stat;
    try {
        stat = FileSystem.statSync(path);
    }
    catch (e) {
    }
    if (stat && !stat.isDirectory()) {
        throw "Cannot create directory - there is a file named like request directory: " + path;
    }
    else if (stat && stat.isDirectory()) {
    }
    else {
        FileSystem.mkdirSync(path);
    }
}
exports.createDirIfNotExists = createDirIfNotExists;
function dirExists(path) {
    var stat;
    try {
        stat = FileSystem.statSync(path);
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
    var tmpPath = Path.normalize(folderPath);
    var exists = FileSystem.existsSync(tmpPath);
    while (!exists) {
        folders.push(tmpPath);
        tmpPath = Path.join(tmpPath, '..');
        exists = FileSystem.existsSync(tmpPath);
    }
    for (var i = folders.length - 1; i >= 0; i--) {
        FileSystem.mkdirSync(folders[i], mode);
    }
}
exports.createDirs = createDirs;
function globDelete(paths, options) {
    var rootDir = options && options.root ? Path.resolve(options.root) : process.cwd();
    paths.forEach(function (query) {
        if (typeof query === "string") {
            Glob.sync(query, { root: rootDir }).forEach(function (path) {
                path = Path.resolve(rootDir, path);
                var stat = FileSystem.statSync(path);
                if (stat.isDirectory()) {
                    FileSystemExtra.removeSync(path);
                }
                else {
                    FileSystem.unlinkSync(path);
                }
            });
        }
    });
}
exports.globDelete = globDelete;
;
function globCopy(source, segments, target) {
    var sourceDir = Path.resolve(source);
    var targetDir = Path.resolve(target);
    segments.forEach(function (query) {
        if (typeof query === "string") {
            Glob.sync((query.charAt(0) === "/" ? "" : "/") + query, { root: sourceDir }).forEach(function (segment) {
                var sourcePath = Path.resolve(sourceDir, segment);
                var targetPath = Path.resolve(targetDir, segment.replace(sourceDir + "/", ""));
                var stat = FileSystem.statSync(sourcePath);
                if (stat.isFile()) {
                    createDirs(Path.dirname(targetPath));
                    copyFileSync(sourcePath, targetPath);
                }
            });
        }
    });
}
exports.globCopy = globCopy;
;
