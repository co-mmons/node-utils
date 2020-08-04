"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globDelete = void 0;
var fs_1 = require("fs");
var fse = require("fs-extra");
var Glob = require("glob");
var path_1 = require("path");
function globDelete(paths, options) {
    var rootDir = options && options.root ? path_1.default.resolve(options.root) : process.cwd();
    paths.forEach(function (query) {
        if (typeof query === "string") {
            Glob.sync(query, { root: rootDir }).forEach(function (file) {
                file = path_1.default.resolve(rootDir, file);
                if (fs_1.default.existsSync(file)) {
                    var stat = fs_1.default.statSync(file);
                    if (stat.isDirectory()) {
                        fse.removeSync(file);
                    }
                    else {
                        fs_1.default.unlinkSync(file);
                    }
                }
            });
        }
    });
}
exports.globDelete = globDelete;
