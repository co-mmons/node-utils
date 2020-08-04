"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globRename = void 0;
var fs_1 = require("fs");
var Glob = require("glob");
var path_1 = require("path");
function globRename(source, matches, find, replace) {
    var sourceDir = source ? path_1.default.resolve(source) : process.cwd();
    matches.forEach(function (match) {
        if (typeof match === "string") {
            Glob.sync((match.charAt(0) === "/" ? "" : "/") + match, { root: sourceDir }).forEach(function (file) {
                var sourcePath = path_1.default.resolve(sourceDir, file);
                var targetPath = path_1.default.resolve(sourceDir, file.replace(sourceDir + "/", "").replace(find, replace));
                if (sourcePath != targetPath) {
                    fs_1.default.renameSync(sourcePath, targetPath);
                }
            });
        }
    });
}
exports.globRename = globRename;
