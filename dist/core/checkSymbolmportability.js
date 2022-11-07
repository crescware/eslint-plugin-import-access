"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSymbolImportability = void 0;
const assertNever_1 = require("../utils/assertNever");
const concatArrays_1 = require("../utils/concatArrays");
const findExportableDeclaration_1 = require("../utils/findExportableDeclaration");
const getAccessOfJsDocs_1 = require("../utils/getAccessOfJsDocs");
const getJSDocTags_1 = require("../utils/getJSDocTags");
const isInPackage_1 = require("../utils/isInPackage");
function checkSymbolImportability(packageOptions, checker, importerFilename, exportedSymbol) {
    var _a;
    const rawDecl = (_a = exportedSymbol.declarations) === null || _a === void 0 ? void 0 : _a[0];
    if (!rawDecl) {
        return;
    }
    const decl = (0, findExportableDeclaration_1.findExportedDeclaration)(rawDecl);
    if (!decl) {
        return;
    }
    // found an export declaration
    const jsDocs = (0, concatArrays_1.concatArrays)(exportedSymbol.getJsDocTags(checker).map((tag) => {
        var _a;
        return ({
            name: tag.name,
            text: ((_a = tag.text) === null || _a === void 0 ? void 0 : _a[0].text) || "",
        });
    }), (0, getJSDocTags_1.getJSDocTags)(decl));
    if (!jsDocs) {
        return;
    }
    const access = (0, getAccessOfJsDocs_1.getAccessOfJsDocs)(jsDocs);
    if (access === "public") {
        // no restriction
        return;
    }
    if (access === "private") {
        // no import of private stuff! (why is this exported?)
        return "private";
    }
    if (access !== "package") {
        (0, assertNever_1.assertNever)(access);
    }
    // for package-exports, check relation of this and that files
    const inPackage = (0, isInPackage_1.isInPackage)(importerFilename, decl.getSourceFile().fileName, packageOptions);
    return inPackage ? undefined : "package";
}
exports.checkSymbolImportability = checkSymbolImportability;
