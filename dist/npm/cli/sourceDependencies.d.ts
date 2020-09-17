interface SourceDependencies {
    [depsName: string]: {
        path?: string;
        repoPath?: string;
    };
}
export declare function sourceDependencies(): SourceDependencies;
export {};
