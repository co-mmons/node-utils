import * as fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";
import * as ChildProcess from "child_process";
import * as Glob from "glob";

export function copyFileSync (source, target) {
	fs.writeFileSync(target, fs.readFileSync(source));
}

export function copyFolderRecursiveSync (source: string, target: string, options?: {exclude?: Array<string | RegExp>}) {

	if (!fs.existsSync(target)) {
		fs.mkdirSync(target);
	}

	// copy
	if (fs.lstatSync(source).isDirectory()) {

		fs.readdirSync(source).forEach(function (fileName) {

			let file = path.join(source, fileName);

			if (options && options.exclude) {
				for (let e of options.exclude) {
					if (file.match(e)) {
						return;
					}
				}
			}

			if (fs.lstatSync(file).isDirectory()) {
				copyFolderRecursiveSync(file, path.join(target, fileName));
			} else {
				copyFileSync(file, path.join(target, fileName));
			}

		});
	}
}

export function clearDir (dir) {

	var files;

	try {
		files = fs.readdirSync(dir);
	} catch (e) {
		return;
	}

	if (files && files.length > 0) {
		for (var i = 0; i < files.length; i++) {
			var file = path.resolve(dir, files[i]);
			if (fs.statSync(file).isFile()) {
				fs.unlinkSync(file);
			} else {
				clearDir(file);
				fs.rmdirSync(file);
			}
		}
	}
}

export function createDirIfNotExists (path) {

	var stat;
	try {
		stat = fs.statSync(path);
	} catch (e) {
	}

	if (stat && !stat.isDirectory()) {
		throw "Cannot create directory - there is a file named like request directory: " + path

	} else if (stat && stat.isDirectory()) {

	} else {
		fs.mkdirSync(path);
	}
}

export function dirExists (path) {

    var stat;
	try {
		stat = fs.statSync(path);
	} catch (e) {
	}

	if (stat && stat.isDirectory()) {
        return true;
	}

    return false;
}

export function createDirs(folderPath: string, mode?: string) {
    let folders = [];
    let tmpPath = path.normalize(folderPath);
    let exists = fs.existsSync(tmpPath);
    while (!exists) {
        folders.push(tmpPath);
        tmpPath = path.join(tmpPath, '..');
        exists = fs.existsSync(tmpPath);
    }

    for (var i = folders.length - 1; i >= 0; i--) {
        fs.mkdirSync(folders[i], mode);
    }
}


export function globDelete (paths, options) {

    let rootDir = options && options.root ? path.resolve(options.root) : process.cwd();

    paths.forEach(function(query) {

        if (typeof query === "string") {

            Glob.sync(query, {root: rootDir}).forEach(function(file) {

				file = path.resolve(rootDir, file);

				var stat = fs.statSync(file);

                if (stat.isDirectory()) {
					fse.removeSync(file);
                } else {
					fs.unlinkSync(file);
                }

            });
        }

    });

};

export function globCopy (source: string, segments: string[], target: string) {

    let sourceDir = path.resolve(source);
	let targetDir = path.resolve(target);

    segments.forEach(function(query) {

        if (typeof query === "string") {

            Glob.sync((query.charAt(0) === "/" ? "" : "/") + query, {root: sourceDir}).forEach((segment) => {

                let sourcePath = path.resolve(sourceDir, segment);
				let targetPath = path.resolve(targetDir, segment.replace(sourceDir + "/", ""));

                let stat = fs.statSync(sourcePath);

                if (stat.isFile()) {
					createDirs(path.dirname(targetPath));
					copyFileSync(sourcePath, targetPath);
                }
            });
        }

    });

};

export function globRename(source: string, matches: string[], find: string, replace: string) {

	let sourceDir = source ? path.resolve(source) : process.cwd();

	matches.forEach(function (match) {

		if (typeof match === "string") {

			Glob.sync((match.charAt(0) === "/" ? "" : "/") + match, {root: sourceDir}).forEach((file) => {

				let sourcePath = path.resolve(sourceDir, file);
				let targetPath = path.resolve(sourceDir, file.replace(sourceDir + "/", "").replace(find, replace));

				if (sourcePath != targetPath) {
					fs.renameSync(sourcePath, targetPath);
				}
			});
		}

	});

};
