import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action((filename = 'notebook.js', options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    // processes.cwd() provides the current working directory
    serve(parseInt(options.port), path.basename(filename), dir);
    // path.dirname(filename) provides the directory of the file. Will pass an empty string if the file is in the current directory.
  });
