"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globRename = void 0;
var fs = require("fs");
var Glob = require("glob");
var path = require("path");
function globRename(source, matches, find, replace) {
    var sourceDir = source ? path.resolve(source) : process.cwd();
    matches.forEach(function (match) {
        if (typeof match === "string") {
            Glob.sync((match.charAt(0) === "/" ? "" : "/") + match, { root: sourceDir }).forEach(function (file) {
                var sourcePath = path.resolve(sourceDir, file);
                var targetPath = path.resolve(sourceDir, file.replace(sourceDir + "/", "").replace(find, replace));
                if (sourcePath != targetPath) {
                    fs.renameSync(sourcePath, targetPath);
                }
            });
        }
    });
}
exports.globRename = globRename;
