import { Tag } from "./getJSDocTags";
export declare type JSDocAccess = "public" | "package" | "private";
/**
 * Get access for given JSDoc.
 */
export declare function getAccessOfJsDocs(tags: readonly Tag[]): JSDocAccess;
