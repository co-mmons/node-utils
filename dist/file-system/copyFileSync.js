"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFileSync = void 0;
var fs_1 = require("fs");
function copyFileSync(source, target) {
    fs_1.default.writeFileSync(target, fs_1.default.readFileSync(source));
}
exports.copyFileSync = copyFileSync;
