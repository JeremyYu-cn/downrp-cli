import inquirer from 'inquirer';
import { SAFE_INQUIRER_LIST, ISafeListOption } from './assets/inquirer';
import { handleSafeRepository } from './handle';
import { createCommand } from './command';

function entry() {
  inquirer.prompt<ISafeListOption>(SAFE_INQUIRER_LIST).then(async (answer) => {
    handleSafeRepository<ISafeListOption>(answer);
  });
}

const cmd = createCommand();
entry();
