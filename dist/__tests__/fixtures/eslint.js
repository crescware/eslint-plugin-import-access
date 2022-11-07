"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ESLintTester_projectRoot, _ESLintTester_linter, _ESLintTester_program;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getESLintTester = void 0;
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const parser = __importStar(require("@typescript-eslint/parser"));
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const jsdoc_1 = __importDefault(require("../../rules/jsdoc"));
class ESLintTester {
    constructor(projectRoot) {
        _ESLintTester_projectRoot.set(this, void 0);
        _ESLintTester_linter.set(this, void 0);
        _ESLintTester_program.set(this, void 0);
        __classPrivateFieldSet(this, _ESLintTester_projectRoot, projectRoot, "f");
        __classPrivateFieldSet(this, _ESLintTester_linter, new experimental_utils_1.TSESLint.Linter({
            cwd: __classPrivateFieldGet(this, _ESLintTester_projectRoot, "f"),
        }), "f");
        __classPrivateFieldSet(this, _ESLintTester_program, parser.createProgram("./tsconfig.json", projectRoot), "f");
        __classPrivateFieldGet(this, _ESLintTester_linter, "f").defineParser("@typescript-eslint/parser", parser);
        __classPrivateFieldGet(this, _ESLintTester_linter, "f").defineRule("import-access/jsdoc", jsdoc_1.default);
    }
    /**
     * Lint file in the project (relative to project root).
     */
    async lintFile(filePath, rules) {
        var _a;
        const fileAbsolutePath = path_1.default.join(__classPrivateFieldGet(this, _ESLintTester_projectRoot, "f"), filePath);
        const code = await (0, promises_1.readFile)(fileAbsolutePath, {
            encoding: "utf8",
        });
        return __classPrivateFieldGet(this, _ESLintTester_linter, "f").verify(code, {
            parser: "@typescript-eslint/parser",
            parserOptions: {
                ecmaVersion: 2020,
                tsconfigRootDir: __classPrivateFieldGet(this, _ESLintTester_projectRoot, "f"),
                project: "./tsconfig.json",
                sourceType: "module",
                program: __classPrivateFieldGet(this, _ESLintTester_program, "f"),
            },
            rules: {
                "import-access/jsdoc": ["error", (_a = rules === null || rules === void 0 ? void 0 : rules.jsdoc) !== null && _a !== void 0 ? _a : {}],
            },
        }, {
            filename: fileAbsolutePath,
        });
    }
}
_ESLintTester_projectRoot = new WeakMap(), _ESLintTester_linter = new WeakMap(), _ESLintTester_program = new WeakMap();
let cache;
/**
 * get an ESLint instance for testing.
 */
function getESLintTester() {
    const projectRoot = path_1.default.resolve(__dirname, "project");
    return (cache || (cache = new ESLintTester(projectRoot)));
}
exports.getESLintTester = getESLintTester;
