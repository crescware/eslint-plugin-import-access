import { tsServerPluginInit } from "./ts-server-plugin";
declare const _default: typeof tsServerPluginInit & {
    rules: {
        jsdoc: Omit<import("@typescript-eslint/experimental-utils/dist/ts-eslint/Rule").RuleModule<"package" | "private", [(Partial<import("./rules/jsdoc").JSDocRuleOptions> | undefined)?], import("@typescript-eslint/experimental-utils/dist/ts-eslint/Rule").RuleListener>, "docs">;
    };
    configs: {
        all: {
            plugins: string[];
            rules: {
                "import-access/jsdoc": string;
            };
        };
    };
};
export = _default;
