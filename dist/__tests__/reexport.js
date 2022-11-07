"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = require("./fixtures/eslint");
const tester = (0, eslint_1.getESLintTester)();
describe("reexports", () => {
    it("Can import a re-exported variable", async () => {
        const result = await tester.lintFile("src/reexport/useFoo.ts");
        expect(result).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 18,
    "endColumn": 31,
    "endLine": 1,
    "line": 1,
    "message": "Cannot import a private export 'subFooPrivate'",
    "messageId": "private",
    "nodeType": "ImportSpecifier",
    "ruleId": "import-access/jsdoc",
    "severity": 2,
  },
]
`);
    });
    it("Can import a re-exported value (export from)", async () => {
        const result = await tester.lintFile("src/reexport/useBar.ts");
        expect(result).toEqual([]);
    });
    it("Can import a re-exported private variable (export from)", async () => {
        const result = await tester.lintFile("src/reexport/useBaz.ts");
        expect(result).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 10,
    "endColumn": 16,
    "endLine": 1,
    "line": 1,
    "message": "Cannot import a private export 'subBaz'",
    "messageId": "private",
    "nodeType": "ImportSpecifier",
    "ruleId": "import-access/jsdoc",
    "severity": 2,
  },
]
`);
    });
    describe("indexLoophole = false", () => {
        it("Cannot import a package-private variable from sub/index.ts", async () => {
            const result = await tester.lintFile("src/reexport/useFoo.ts", {
                jsdoc: {
                    indexLoophole: false,
                },
            });
            expect(result).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 10,
    "endColumn": 16,
    "endLine": 1,
    "line": 1,
    "message": "Cannot import a package-private export 'subFoo'",
    "messageId": "package",
    "nodeType": "ImportSpecifier",
    "ruleId": "import-access/jsdoc",
    "severity": 2,
  },
  Object {
    "column": 18,
    "endColumn": 31,
    "endLine": 1,
    "line": 1,
    "message": "Cannot import a private export 'subFooPrivate'",
    "messageId": "private",
    "nodeType": "ImportSpecifier",
    "ruleId": "import-access/jsdoc",
    "severity": 2,
  },
]
`);
        });
    });
    describe("filenameLoophole = true", () => {
        it("Can import from sub directory of same name", async () => {
            const result = await tester.lintFile("src/reexport2/sub.ts", {
                jsdoc: {
                    indexLoophole: false,
                    filenameLoophole: true,
                },
            });
            expect(result).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 10,
    "endColumn": 16,
    "endLine": 2,
    "line": 2,
    "message": "Cannot import a package-private export 'subBar'",
    "messageId": "package",
    "nodeType": "ImportSpecifier",
    "ruleId": "import-access/jsdoc",
    "severity": 2,
  },
]
`);
        });
    });
});
