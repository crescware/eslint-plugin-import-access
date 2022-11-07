"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo_1 = require("./foo");
// can import package-private things from same directory
console.log(foo_1.fooAccessPackage, foo_1.fooPackage);
