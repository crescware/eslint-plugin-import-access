"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pkg_1 = require("../sub2/pkg");
// sibling sub-package should not be able to be imported
console.log(pkg_1.subsubVar);
