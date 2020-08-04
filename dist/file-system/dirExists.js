"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dirExists = void 0;
var fs = require("fs");
function dirExists(path) {
    var stat;
    try {
        stat = fs.statSync(path);
    }
    catch (e) {
    }
    if (stat && stat.isDirectory()) {
        return true;
    }
    return false;
}
exports.dirExists = dirExists;
