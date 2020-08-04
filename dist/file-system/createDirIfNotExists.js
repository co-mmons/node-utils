"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDirIfNotExists = void 0;
var fs = require("fs");
function createDirIfNotExists(path) {
    var stat;
    try {
        stat = fs.statSync(path);
    }
    catch (e) {
    }
    if (stat && !stat.isDirectory()) {
        throw new Error("Cannot create directory - there is a file named like request directory: " + path);
    }
    else if (stat && stat.isDirectory()) {
    }
    else {
        fs.mkdirSync(path);
    }
}
exports.createDirIfNotExists = createDirIfNotExists;
