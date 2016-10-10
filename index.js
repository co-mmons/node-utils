var FileSystem = require("fs");
var Path = require("path");
var Glob = require("glob");
var ChildProcess = require("child_process");

module.exports = function (paths, options) {

    let rootDir = options && options.root ? Path.resolve(options.root) : process.env.PWD;

    paths.forEach(function(query) {

        if (typeof query === "string") {

            Glob.sync(query, {root: rootDir}).forEach(function(path) {

                path = Path.resolve(rootDir, path);

                var stat = FileSystem.statSync(path);

                if (stat.isDirectory()) {
                    ChildProcess.execSync("rm -rf " + path);
                } else {
                    FileSystem.unlinkSync(path);
                }

            });
        }

    });

};
