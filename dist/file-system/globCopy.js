"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globCopy = void 0;
var fs = require("fs");
var Glob = require("glob");
var path = require("path");
var copyFileSync_1 = require("./copyFileSync");
var createDirs_1 = require("./createDirs");
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
                    createDirs_1.createDirs(path.dirname(targetPath));
                    copyFileSync_1.copyFileSync(sourcePath, targetPath);
                }
            });
        }
    });
}
exports.globCopy = globCopy;
