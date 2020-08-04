"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dirExists = void 0;
var fs_1 = require("fs");
function dirExists(path) {
    var stat;
    try {
        stat = fs_1.default.statSync(path);
    }
    catch (e) {
    }
    if (stat && stat.isDirectory()) {
        return true;
    }
    return false;
}
exports.dirExists = dirExists;
