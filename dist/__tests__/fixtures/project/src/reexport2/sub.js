"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo_1 = require("./sub/foo");
const bar_1 = require("./sub2/bar");
// Can import subFoo under `filenameLoophole: true`, but not subBar
console.log(foo_1.subFoo, bar_1.subBar);
