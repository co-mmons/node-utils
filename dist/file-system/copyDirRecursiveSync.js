"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyDirRecursiveSync = void 0;
var fs = require("fs");
var path = require("path");
var copyFileSync_1 = require("./copyFileSync");
function copyDirRecursiveSync(source, target, options) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }
    // copy
    if (fs.lstatSync(source).isDirectory()) {
        fs.readdirSync(source).forEach(function (fileName) {
            var file = path.join(source, fileName);
            if (options && options.exclude) {
                for (var _i = 0, _a = options.exclude; _i < _a.length; _i++) {
                    var e = _a[_i];
                    if (file.match(e)) {
                        return;
                    }
                }
            }
            if (fs.lstatSync(file).isDirectory()) {
                copyDirRecursiveSync(file, path.join(target, fileName));
            }
            else {
                copyFileSync_1.copyFileSync(file, path.join(target, fileName));
            }
        });
    }
}
exports.copyDirRecursiveSync = copyDirRecursiveSync;
