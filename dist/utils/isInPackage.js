"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInPackage = void 0;
const path_1 = __importDefault(require("path"));
// ../ or ../../ or ...
const ancestorDirRegExp = new RegExp(`^(?:\\.\\.\\${path_1.default.sep})*(?:\\.\\.)?$`);
const indexFileRegExp = new RegExp(`\\${path_1.default.sep}index\\.tsx?$`);
/**
 * Checks whether importer is in the same 'package' as exporter.
 */
function isInPackage(importer_, exporter_, packageOptions) {
    const importer = process.platform === "darwin" ? importer_.toLowerCase() : importer_;
    let exporter = process.platform === "darwin" ? exporter_.toLowerCase() : exporter_;
    if (packageOptions.indexLoophole) {
        const match = exporter.match(indexFileRegExp);
        if (match) {
            // import from `sub/index.ts` can be treated as `sub.ts` so that `index.ts` can be used as export point of a sub package.
            exporter = exporter.slice(0, -match[0].length);
        }
    }
    const rel = path_1.default.relative(path_1.default.dirname(importer), path_1.default.dirname(exporter));
    if (packageOptions.filenameLoophole &&
        rel === path_1.default.basename(importer, path_1.default.extname(importer))) {
        // Example: importing foo/bar.ts from foo.ts
        return true;
    }
    return ancestorDirRegExp.test(rel);
}
exports.isInPackage = isInPackage;
