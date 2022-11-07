"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findExportedDeclaration = void 0;
const typescript_1 = require("typescript");
/**
 * Go up AST nodes until it reaches an exported statement-like node.
 */
function findExportedDeclaration(node) {
    var _a;
    const decl = findExportableDeclaration(node);
    if (!decl) {
        return;
    }
    if ((0, typescript_1.isExportDeclaration)(decl)) {
        return decl;
    }
    if (!((_a = decl.modifiers) === null || _a === void 0 ? void 0 : _a.find((m) => m.kind === typescript_1.SyntaxKind.ExportKeyword))) {
        return;
    }
    return decl;
}
exports.findExportedDeclaration = findExportedDeclaration;
function findExportableDeclaration(node) {
    while (node && !(0, typescript_1.isSourceFile)(node)) {
        if ((0, typescript_1.isFunctionDeclaration)(node) ||
            (0, typescript_1.isClassDeclaration)(node) ||
            (0, typescript_1.isVariableStatement)(node) ||
            (0, typescript_1.isExportDeclaration)(node) ||
            (0, typescript_1.isTypeAliasDeclaration)(node) ||
            (0, typescript_1.isInterfaceDeclaration)(node)) {
            return node;
        }
        node = node.parent;
    }
    return undefined;
}
