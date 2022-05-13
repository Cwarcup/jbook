import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  if (useProxy) {
    // serve up development build
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    // serve up production build
    // require.resolve is used to resolve the path to the file. Built in nodejs function.
    // Will find the local-client file in the node_modules folder, NOT the file in the root of the project.
    const packagePath = require.resolve('local-client/build/index.html');

    // serve up everything up to build folder
    app.use(express.static(path.dirname(packagePath)));
  }

  app.use(createCellsRouter(filename, dir));

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
