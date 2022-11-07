"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsServerPluginInit = void 0;
const checkSymbolmportability_1 = require("../core/checkSymbolmportability");
const jsdoc_1 = require("../rules/jsdoc");
function tsServerPluginInit(modules) {
    const { typescript } = modules;
    function create(info) {
        // const log = (message: unknown) => {
        //   info.project.projectService.logger.info(String(message));
        //   fs.appendFileSync(logFile, `[${new Date()}] ${message}\n`);
        // };
        const config = info.config;
        const packageOptions = (0, jsdoc_1.jsDocRuleDefaultOptions)(config.jsdoc);
        // Set up decorator
        const proxy = Object.create(null);
        for (const k of Object.keys(info.languageService)) {
            const x = info.languageService[k];
            proxy[k] = x;
        }
        proxy.getCompletionsAtPosition = (fileName, position, options) => {
            const res = info.languageService.getCompletionsAtPosition(fileName, position, options);
            const prog = info.languageService.getProgram();
            if (prog === undefined) {
                return res;
            }
            const checker = prog.getTypeChecker();
            if (res !== undefined) {
                // const importerNormalizedFilename = prog.getSourceFile(fileName)?.fileName || "/"
                // remove export modifiers that imports package-private or private symbols.
                const filtered = res.entries.filter((entry) => {
                    var _a;
                    if (entry.kindModifiers !== "export" || !entry.data) {
                        return true;
                    }
                    const { exportName, fileName: entryFileName } = entry.data;
                    if (!entryFileName) {
                        return true;
                    }
                    const sourceFile = prog.getSourceFile(entryFileName);
                    if (!sourceFile) {
                        return true;
                    }
                    const symb = checker.getSymbolAtLocation(sourceFile);
                    const exportedSymbol = (_a = symb === null || symb === void 0 ? void 0 : symb.exports) === null || _a === void 0 ? void 0 : _a.get(typescript.escapeLeadingUnderscores(exportName));
                    if (exportedSymbol === undefined) {
                        return true;
                    }
                    const checkResult = (0, checkSymbolmportability_1.checkSymbolImportability)(packageOptions, checker, fileName, exportedSymbol);
                    return checkResult === undefined;
                });
                res.entries = filtered;
            }
            // log(JSON.stringify(res, undefined, 2));
            return res;
        };
        const importMatch = /^Import ['"](\w+)['"] from module ['"]([^'"]+)['"]$/;
        proxy.getCodeFixesAtPosition = (fileName, start, end, errorCodes, formatOptions, preferences) => {
            const res = info.languageService.getCodeFixesAtPosition(fileName, start, end, errorCodes, formatOptions, preferences);
            const prog = info.languageService.getProgram();
            if (prog === undefined) {
                return res;
            }
            const checker = prog.getTypeChecker();
            const filtered = res.filter((fix) => {
                var _a, _b, _c, _d;
                if (fix.fixName !== "import") {
                    return true;
                }
                // FIXME: using string for filter is stupid, but found no other way
                const importDescriptionMatch = fix.description.match(importMatch);
                if (importDescriptionMatch === null) {
                    return true;
                }
                const [, exportName, exportFileName] = importDescriptionMatch;
                const resolvedModule = (_c = (_b = (_a = info.languageServiceHost).resolveModuleNames) === null || _b === void 0 ? void 0 : _b.call(_a, [exportFileName], fileName, undefined, undefined, info.project.getCompilerOptions())) === null || _c === void 0 ? void 0 : _c[0];
                if (resolvedModule === undefined) {
                    return true;
                }
                const exporterSourcefile = prog.getSourceFile(resolvedModule.resolvedFileName);
                if (exporterSourcefile === undefined) {
                    return true;
                }
                const symb = checker.getSymbolAtLocation(exporterSourcefile);
                const exportedSymbol = (_d = symb === null || symb === void 0 ? void 0 : symb.exports) === null || _d === void 0 ? void 0 : _d.get(typescript.escapeLeadingUnderscores(exportName));
                if (exportedSymbol === undefined) {
                    return true;
                }
                const checkResult = (0, checkSymbolmportability_1.checkSymbolImportability)(packageOptions, checker, fileName, exportedSymbol);
                return checkResult === undefined;
            });
            return filtered;
        };
        return proxy;
    }
    return { create };
}
exports.tsServerPluginInit = tsServerPluginInit;
