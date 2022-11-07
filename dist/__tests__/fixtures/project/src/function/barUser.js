"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bar_1 = require("./sub/bar");
// cannot import package-private things from sub directory
console.log(bar_1.barAccessPackage, bar_1.barPackage, bar_1.barPackage);
