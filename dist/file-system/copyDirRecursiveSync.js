"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyDirRecursiveSync = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var copyFileSync_1 = require("./copyFileSync");
function copyDirRecursiveSync(source, target, options) {
    if (!fs_1.default.existsSync(target)) {
        fs_1.default.mkdirSync(target);
    }
    // copy
    if (fs_1.default.lstatSync(source).isDirectory()) {
        fs_1.default.readdirSync(source).forEach(function (fileName) {
            var file = path_1.default.join(source, fileName);
            if (options && options.exclude) {
                for (var _i = 0, _a = options.exclude; _i < _a.length; _i++) {
                    var e = _a[_i];
                    if (file.match(e)) {
                        return;
                    }
                }
            }
            if (fs_1.default.lstatSync(file).isDirectory()) {
                copyDirRecursiveSync(file, path_1.default.join(target, fileName));
            }
            else {
                copyFileSync_1.copyFileSync(file, path_1.default.join(target, fileName));
            }
        });
    }
}
exports.copyDirRecursiveSync = copyDirRecursiveSync;
