import { Node } from "typescript";
export declare type Tag = {
    name: string;
    text: string;
};
export declare function getJSDocTags(node: Node): Tag[] | undefined;
