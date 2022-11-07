"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImmediateAliasedSymbol = void 0;
/**
 * Use non-public getImmediateAliasedSymbol API
 */
function getImmediateAliasedSymbol(checker, symbol) {
    return checker.getImmediateAliasedSymbol(symbol);
}
exports.getImmediateAliasedSymbol = getImmediateAliasedSymbol;
