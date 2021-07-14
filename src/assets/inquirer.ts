import type { QuestionCollection } from 'inquirer';
import repository from './repository';

export interface IPromptOption {
  /**
   * 项目名
   */
  projectName: string;
  /**
   * 下载的模板名
   */
  templateName: string;
  /**
   * 自定义模板地址
   */
  repositoryUrl?: string;
}

export const PROMPT_LIST: QuestionCollection = [
  {
    type: 'input',
    message: 'enter your projectName',
    name: 'projectName',
    default: 'test',
  },
  {
    type: 'list',
    message: 'choose download template',
    name: 'templateName',
    choices: Object.keys(Object.assign(repository, { custom: '' })),
  },
];

export const CUSTOM_TEMPLATE: QuestionCollection = [
  {
    type: 'input',
    message: 'custom repository url',
    name: 'repositoryUrl',
  },
];
