"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJSDocTags = void 0;
const tsutils_1 = require("tsutils");
function getJSDocTags(node) {
    if (!(0, tsutils_1.canHaveJsDoc)(node)) {
        return undefined;
    }
    return (0, tsutils_1.getJsDoc)(node).flatMap((jsdoc) => {
        var _a, _b;
        return ((_b = (_a = jsdoc.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => {
            var _a;
            return {
                name: tag.tagName.text,
                text: typeof tag.comment === "string"
                    ? tag.comment
                    : ((_a = tag.comment) === null || _a === void 0 ? void 0 : _a[0].text) || "",
            };
        })) !== null && _b !== void 0 ? _b : []);
    });
}
exports.getJSDocTags = getJSDocTags;
