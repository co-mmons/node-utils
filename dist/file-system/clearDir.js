"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDir = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
function clearDir(dir) {
    var files;
    try {
        files = fs_1.default.readdirSync(dir);
    }
    catch (e) {
        return;
    }
    if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var file = path_1.default.resolve(dir, files[i]);
            if (fs_1.default.statSync(file).isFile()) {
                fs_1.default.unlinkSync(file);
            }
            else {
                clearDir(file);
                fs_1.default.rmdirSync(file);
            }
        }
    }
}
exports.clearDir = clearDir;
