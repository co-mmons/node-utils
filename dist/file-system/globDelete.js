"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globDelete = void 0;
var fs = require("fs");
var fse = require("fs-extra");
var Glob = require("glob");
var path = require("path");
function globDelete(paths, options) {
    var rootDir = options && options.root ? path.resolve(options.root) : process.cwd();
    paths.forEach(function (query) {
        if (typeof query === "string") {
            Glob.sync(query, { root: rootDir }).forEach(function (file) {
                file = path.resolve(rootDir, file);
                if (fs.existsSync(file)) {
                    var stat = fs.statSync(file);
                    if (stat.isDirectory()) {
                        fse.removeSync(file);
                    }
                    else {
                        fs.unlinkSync(file);
                    }
                }
            });
        }
    });
}
exports.globDelete = globDelete;
