import * as FileSystem from "fs";
import * as Path from "path";
import * as ChildProcess from "child_process";
import * as Glob from "glob";

export function copyFileSync (source, target) {
	FileSystem.writeFileSync(target, FileSystem.readFileSync(source));
}

export function copyFolderRecursiveSync (source, target) {

	if (!FileSystem.existsSync(target)) {
		FileSystem.mkdirSync(target);
	}

	// copy
	if (FileSystem.lstatSync(source).isDirectory()) {

		FileSystem.readdirSync(source).forEach(function (fileName) {

			var file = Path.join(source, fileName);

			if (FileSystem.lstatSync(file).isDirectory()) {
				copyFolderRecursiveSync(file, Path.join(target, fileName));
			} else {
				copyFileSync(file, Path.join(target, fileName));
			}

		});
	}
}

export function clearDir (dir) {

	var files;

	try {
		files = FileSystem.readdirSync(dir);
	} catch (e) {
		return;
	}

	if (files && files.length > 0) {
		for (var i = 0; i < files.length; i++) {
			var file = Path.resolve(dir, files[i]);
			if (FileSystem.statSync(file).isFile()) {
				FileSystem.unlinkSync(file);
			} else {
				clearDir(file);
				FileSystem.rmdirSync(file);
			}
		}
	}
}

export function createDirIfNotExists (path) {

	var stat;
	try {
		stat = FileSystem.statSync(path);
	} catch (e) {
	}

	if (stat && !stat.isDirectory()) {
		throw "Cannot create directory - there is a file named like request directory: " + path

	} else if (stat && stat.isDirectory()) {

	} else {
		FileSystem.mkdirSync(path);
	}
}

export function dirExists (path) {

    var stat;
	try {
		stat = FileSystem.statSync(path);
	} catch (e) {
	}

	if (stat && stat.isDirectory()) {
        return true;
	}

    return false;
}

export function globDelete (paths, options) {

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
