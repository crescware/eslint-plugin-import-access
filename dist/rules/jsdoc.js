"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsDocRuleDefaultOptions = void 0;
const checkSymbolmportability_1 = require("../core/checkSymbolmportability");
const getImmediateAliasedSymbol_1 = require("../utils/getImmediateAliasedSymbol");
const jsdocRule = {
    meta: {
        type: "problem",
        docs: {
            description: "Prohibit importing private exports.",
            recommended: "error",
            url: "TODO",
        },
        messages: {
            package: "Cannot import a package-private export '{{ identifier }}'",
            private: "Cannot import a private export '{{ identifier }}'",
        },
        schema: [
            {
                type: "object",
                properties: {
                    indexLoophole: {
                        type: "boolean",
                    },
                    filenameLoophole: {
                        type: "boolean",
                    },
                },
                additionalProperties: false,
            },
        ],
    },
    create(context) {
        const { parserServices, options } = context;
        if (!parserServices) {
            return {};
        }
        const { indexLoophole, filenameLoophole } = jsDocRuleDefaultOptions(options[0]);
        const packageOptions = { indexLoophole, filenameLoophole };
        return {
            ImportSpecifier(node) {
                const checker = parserServices.program.getTypeChecker();
                const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
                const symbol = checker.getSymbolAtLocation(tsNode.name);
                if (symbol) {
                    checkSymbol(context, packageOptions, checker, node, tsNode, symbol);
                }
            },
            ImportDefaultSpecifier(node) {
                const checker = parserServices.program.getTypeChecker();
                const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
                if (!tsNode.name) {
                    return;
                }
                const symbol = checker.getSymbolAtLocation(tsNode.name);
                if (symbol) {
                    checkSymbol(context, packageOptions, checker, node, tsNode, symbol);
                }
            },
        };
    },
};
exports.default = jsdocRule;
function jsDocRuleDefaultOptions(options) {
    const { indexLoophole = true, filenameLoophole = false } = options || {};
    return { indexLoophole, filenameLoophole };
}
exports.jsDocRuleDefaultOptions = jsDocRuleDefaultOptions;
function checkSymbol(context, packageOptions, checker, originalNode, tsNode, symbol) {
    const exsy = (0, getImmediateAliasedSymbol_1.getImmediateAliasedSymbol)(checker, symbol);
    if (!exsy) {
        return;
    }
    const checkResult = (0, checkSymbolmportability_1.checkSymbolImportability)(packageOptions, checker, tsNode.getSourceFile().fileName, exsy);
    switch (checkResult) {
        case "package": {
            context.report({
                node: originalNode,
                messageId: "package",
                data: {
                    identifier: exsy.name,
                },
            });
            break;
        }
        case "private": {
            context.report({
                node: originalNode,
                messageId: "private",
                data: {
                    identifier: exsy.name,
                },
            });
            break;
        }
    }
}
