"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsdoc_1 = __importDefault(require("./rules/jsdoc"));
const ts_server_plugin_1 = require("./ts-server-plugin");
module.exports = Object.assign(ts_server_plugin_1.tsServerPluginInit, {
    rules: {
        jsdoc: jsdoc_1.default,
    },
    configs: {
        all: {
            plugins: ["import-access"],
            rules: {
                "import-access/jsdoc": "error",
            },
        },
    },
});
