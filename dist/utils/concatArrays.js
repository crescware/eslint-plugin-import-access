"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatArrays = void 0;
function concatArrays(...arrs) {
    let result;
    for (const arr of arrs) {
        if (arr === null || arr === void 0 ? void 0 : arr.length) {
            result || (result = []);
            result = result.concat(arr);
        }
    }
    return result;
}
exports.concatArrays = concatArrays;
