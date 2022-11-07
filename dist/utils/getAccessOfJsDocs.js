"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessOfJsDocs = void 0;
/**
 * Get access for given JSDoc.
 */
function getAccessOfJsDocs(tags) {
    for (const tag of tags) {
        const tagName = tag.name;
        if (tagName === "package") {
            // @package
            return "package";
        }
        if (tagName === "private") {
            // @private
            return "private";
        }
        if (tagName === "access") {
            // @access
            const text = tag.text;
            if (text === "package") {
                // @access package
                return "package";
            }
            if (text === "private") {
                // @access private
                return "private";
            }
        }
    }
    return "public";
}
exports.getAccessOfJsDocs = getAccessOfJsDocs;
