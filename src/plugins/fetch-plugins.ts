import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  // can use this to set and get an item in the database.
  name: 'fileCache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      // onLoad is called whenever ESBuild is trying to load a particular module.

      // handle  root entry of 'index.js'
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });

      // onload for css
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        // check to see if we have already fetched this file
        // and if it has been cached in fileCache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        //if it is cached, return it
        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);

        // CSS string that can be placed in the js snippet
        const escaped = data
          .replace(/\n/g, '') // remove newlines
          .replace(/"/g, '\\"') // escape double quotes
          .replace(/'/g, "\\'"); // escape single quotes

        //getting CSS through esbuild
        // wont be able to use URL links or @import's
        const contents = `
        const style = document.createElement('style');
        style.innerText = '${escaped}';
        document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        // store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });

      // onload for plain JS files
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // check to see if we have already fetched this file
        // and if it has been cached in fileCache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        //if it is cached, return it
        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        // store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
