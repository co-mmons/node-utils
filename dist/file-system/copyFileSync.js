"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFileSync = void 0;
var fs = require("fs");
function copyFileSync(source, target) {
    fs.writeFileSync(target, fs.readFileSync(source));
}
exports.copyFileSync = copyFileSync;
