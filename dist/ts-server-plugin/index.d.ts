export declare function tsServerPluginInit(modules: {
    typescript: typeof import("typescript/lib/tsserverlibrary");
}): {
    create: (info: ts.server.PluginCreateInfo) => import("typescript/lib/tsserverlibrary").LanguageService;
};
