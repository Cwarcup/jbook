"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const serve = (port, filename, dir) => {
    const app = (0, express_1.default)();
    // serve up production build
    // require.resolve is used to resolve the path to the file. Built in nodejs function.
    // Will find the local-client file in the node_modules folder, NOT the file in the root of the project.
    const packagePath = require.resolve('local-client/build/index.html');
    // serve up everything up to build folder
    app.use(express_1.default.static(path_1.default.dirname(packagePath)));
    // serve up development build
    // app.use(
    //   createProxyMiddleware({
    //     target: 'http://localhost:3000',
    //     ws: true,
    //     logLevel: 'silent',
    //   })
    // );
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
