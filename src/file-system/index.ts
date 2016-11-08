import * as FileSystem from "fs";
import * as FileSystemExtra from "fs-extra";
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

export function createDirs(folderPath: string, mode?: string) {
    let folders = [];
    let tmpPath = Path.normalize(folderPath);
    let exists = FileSystem.existsSync(tmpPath);
    while (!exists) {
        folders.push(tmpPath);
        tmpPath = Path.join(tmpPath, '..');
        exists = FileSystem.existsSync(tmpPath);
    }

    for (var i = folders.length - 1; i >= 0; i--) {
        FileSystem.mkdirSync(folders[i], mode);
    }
}


export function globDelete (paths, options) {

    let rootDir = options && options.root ? Path.resolve(options.root) : process.cwd();

    paths.forEach(function(query) {

        if (typeof query === "string") {

            Glob.sync(query, {root: rootDir}).forEach(function(path) {

                path = Path.resolve(rootDir, path);

                var stat = FileSystem.statSync(path);

                if (stat.isDirectory()) {
					FileSystemExtra.removeSync(path);
                } else {
                    FileSystem.unlinkSync(path);
                }

            });
        }

    });

};

export function globCopy (source: string, segments: string[], target: string) {

    let sourceDir = Path.resolve(source);
	let targetDir = Path.resolve(target);

    segments.forEach(function(query) {

        if (typeof query === "string") {

            Glob.sync((query.charAt(0) === "/" ? "" : "/") + query, {root: sourceDir}).forEach((segment) => {

                let sourcePath = Path.resolve(sourceDir, segment);
				let targetPath = Path.resolve(targetDir, segment.replace(sourceDir + "/", ""));

                let stat = FileSystem.statSync(sourcePath);

                if (stat.isFile()) {
					createDirs(Path.dirname(targetPath));
					copyFileSync(sourcePath, targetPath);
                }
            });
        }

    });

};
