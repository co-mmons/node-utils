"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchDuplicate = void 0;
var watch = require("chokidar");
var fse = require("fs-extra");
var path_1 = require("path");
function watchDuplicate() {
    var entry = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        entry[_i] = arguments[_i];
    }
    var _loop_1 = function (source, target) {
        var watcher = watch.watch(source, { ignored: ".DS_Store" });
        console.log("Started watch-duplicate of ".concat(source, ", duplicated to ").concat(target));
        var fileEquals = function (input, inputBuffer) {
            var destPath = path_1.default.join(target, input.substring(source.length));
            var destBuffer = fse.existsSync(destPath) && fse.readFileSync(destPath);
            return destBuffer && inputBuffer.equals(destBuffer);
        };
        watcher.on("change", function (filename, stats) {
            var inputBuffer = fse.readFileSync(filename);
            if (!fileEquals(filename, inputBuffer)) {
                console.log("Changed file ".concat(filename));
                var destPath = path_1.default.join(target, filename.substring(source.length));
                fse.writeFileSync(destPath, inputBuffer);
                // fse.copySync(filename, path.join(target, filename.substring(source.length)), {preserveTimestamps: true});
            }
        });
        watcher.on("add", function (filename, stats) {
            var inputBuffer = fse.readFileSync(filename);
            if (!fileEquals(filename, inputBuffer)) {
                console.log("Added file ".concat(filename));
                fse.copySync(filename, path_1.default.join(target, filename.substr(source.length)), { preserveTimestamps: true });
            }
        });
        watcher.on("unlink", function (filename, stats) {
            console.log("Deleted file ".concat(filename));
            fse.removeSync(path_1.default.join(target, filename.substr(source.length)));
        });
        watcher.on("unlinkDir", function (filename, stats) {
            console.log("Deleted dir ".concat(filename));
            fse.removeSync(path_1.default.join(target, filename.substr(source.length)));
        });
    };
    for (var _a = 0, entry_1 = entry; _a < entry_1.length; _a++) {
        var _b = entry_1[_a], source = _b[0], target = _b[1];
        _loop_1(source, target);
    }
}
exports.watchDuplicate = watchDuplicate;
