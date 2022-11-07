import { Symbol, TypeChecker } from "typescript";
/**
 * Use non-public getImmediateAliasedSymbol API
 */
export declare function getImmediateAliasedSymbol(checker: TypeChecker, symbol: Symbol): Symbol | undefined;
