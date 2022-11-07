"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNever = void 0;
function assertNever(value) {
    throw new Error(`Assertion Failure: '${value}' is not never`);
}
exports.assertNever = assertNever;
