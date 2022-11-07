import { Symbol, TypeChecker } from "typescript";
import { PackageOptions } from "../utils/isInPackage";
/**
 * Result of checking a symbol.
 * A non-undefined return value means an error
 */
export declare type CheckSymbolResult = "package" | "private" | undefined;
export declare function checkSymbolImportability(packageOptions: PackageOptions, checker: TypeChecker, importerFilename: string, exportedSymbol: Symbol): CheckSymbolResult;
