import { program } from 'commander';
import { serveCommand } from './commands/serve';

program.addCommand(serveCommand); // where you can chain together commands

program.parse(process.argv);
