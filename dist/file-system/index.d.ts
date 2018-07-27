export declare function copyFileSync(source: any, target: any): void;
export declare function copyFolderRecursiveSync(source: string, target: string, options?: {
    exclude?: Array<string | RegExp>;
}): void;
export declare function clearDir(dir: any): void;
export declare function createDirIfNotExists(path: any): void;
export declare function dirExists(path: any): boolean;
export declare function createDirs(folderPath: string, mode?: string): void;
export declare function globDelete(paths: any, options: any): void;
export declare function globCopy(source: string, segments: string[], target: string): void;
export declare function globRename(source: string, matches: string[], find: string, replace: string): void;
