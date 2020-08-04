"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globCopy = void 0;
var fs_1 = require("fs");
var Glob = require("glob");
var path_1 = require("path");
var copyFileSync_1 = require("./copyFileSync");
var createDirs_1 = require("./createDirs");
function globCopy(source, segments, target) {
    var sourceDir = path_1.default.resolve(source);
    var targetDir = path_1.default.resolve(target);
    segments.forEach(function (query) {
        if (typeof query === "string") {
            Glob.sync((query.charAt(0) === "/" ? "" : "/") + query, { root: sourceDir }).forEach(function (segment) {
                var sourcePath = path_1.default.resolve(sourceDir, segment);
                var targetPath = path_1.default.resolve(targetDir, segment.replace(sourceDir + "/", ""));
                var stat = fs_1.default.statSync(sourcePath);
                if (stat.isFile()) {
                    createDirs_1.createDirs(path_1.default.dirname(targetPath));
                    copyFileSync_1.copyFileSync(sourcePath, targetPath);
                }
            });
        }
    });
}
exports.globCopy = globCopy;
