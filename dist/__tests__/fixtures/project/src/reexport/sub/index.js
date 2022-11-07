"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subFooPrivate = exports.subFoo = void 0;
const foo_1 = require("./foo");
Object.defineProperty(exports, "subFoo", { enumerable: true, get: function () { return foo_1.subFoo; } });
Object.defineProperty(exports, "subFooPrivate", { enumerable: true, get: function () { return foo_1.subFoo; } });
