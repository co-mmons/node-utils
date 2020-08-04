"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDir = void 0;
var fs = require("fs");
var path = require("path");
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
