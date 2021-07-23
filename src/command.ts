import { Command } from 'commander';

export function createCommand() {
  const cmd = new Command();
  cmd.version('0.1.1');
  cmd.addHelpText('after', 'test');

  cmd.parse(process.argv);

  return cmd;
}
