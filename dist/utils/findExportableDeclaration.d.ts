import { Node } from "typescript";
/**
 * Go up AST nodes until it reaches an exported statement-like node.
 */
export declare function findExportedDeclaration(node: Node): import("typescript").FunctionDeclaration | import("typescript").ClassDeclaration | import("typescript").VariableStatement | import("typescript").ExportDeclaration | import("typescript").TypeAliasDeclaration | import("typescript").InterfaceDeclaration | undefined;
