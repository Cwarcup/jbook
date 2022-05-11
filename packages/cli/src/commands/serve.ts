import { Command } from 'commander';

export const serveCommand = new Command()
  .command('serve')
  .description('Serve [filename]')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action((filename = 'notebook.js', options) => {
    console.log(filename, options);
  });
