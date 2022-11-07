export declare type PackageOptions = {
    readonly indexLoophole: boolean;
    readonly filenameLoophole: boolean;
};
/**
 * Checks whether importer is in the same 'package' as exporter.
 */
export declare function isInPackage(importer_: string, exporter_: string, packageOptions: PackageOptions): boolean;
