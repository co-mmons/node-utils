"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDirs = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
function createDirs(folderPath, mode) {
    var folders = [];
    var tmpPath = path_1.default.normalize(folderPath);
    var exists = fs_1.default.existsSync(tmpPath);
    while (!exists) {
        folders.push(tmpPath);
        tmpPath = path_1.default.join(tmpPath, "..");
        exists = fs_1.default.existsSync(tmpPath);
    }
    for (var i = folders.length - 1; i >= 0; i--) {
        fs_1.default.mkdirSync(folders[i], mode);
    }
}
exports.createDirs = createDirs;
