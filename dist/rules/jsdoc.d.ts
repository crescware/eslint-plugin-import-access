import { TSESLint } from "@typescript-eslint/experimental-utils";
declare type MessageId = "package" | "private";
export declare type JSDocRuleOptions = {
    /**
     * Whether importing a package-private exports from `index.ts` in a subdirectory.
     */
    indexLoophole: boolean;
    /**
     * Whether importing a package-private exports in a directory from a file of same name.
     */
    filenameLoophole: boolean;
};
declare const jsdocRule: Omit<TSESLint.RuleModule<MessageId, [Partial<JSDocRuleOptions>?]>, "docs">;
export default jsdocRule;
export declare function jsDocRuleDefaultOptions(options: Partial<JSDocRuleOptions> | undefined): JSDocRuleOptions;
