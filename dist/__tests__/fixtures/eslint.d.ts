import { TSESLint } from "@typescript-eslint/experimental-utils";
import { JSDocRuleOptions } from "../../rules/jsdoc";
declare class ESLintTester {
    #private;
    constructor(projectRoot: string);
    /**
     * Lint file in the project (relative to project root).
     */
    lintFile(filePath: string, rules?: Partial<{
        jsdoc: Partial<JSDocRuleOptions>;
    }>): Promise<TSESLint.Linter.LintMessage[]>;
}
/**
 * get an ESLint instance for testing.
 */
export declare function getESLintTester(): ESLintTester;
export {};
