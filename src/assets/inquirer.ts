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
  /**
   * 仓库类型
   */
  repositoryType?: 'public' | 'private';
  /**
   * 仓库用户名字
   */
  repositoryUser?: string;
  /**
   * 仓库密码
   */
  repositoryPass?: string;
}

/**
 * 拉取项目选项
 */
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

/**
 * 自定义模板选项
 */
export const CUSTOM_TEMPLATE: QuestionCollection = [
  {
    type: 'list',
    message: 'choose your repository type',
    name: 'repositoryType',
    choices: ['public', 'private'],
  },
  {
    type: 'input',
    when({ repositoryType }) {
      return repositoryType === 'private';
    },
    name: 'repositoryUser',
    message: 'input your git username',
  },
  {
    type: 'password',
    when({ repositoryType }) {
      return repositoryType === 'private';
    },
    name: 'repositoryPass',
    message: 'input your git password',
  },
  {
    type: 'input',
    message: 'custom repository url',
    name: 'repositoryUrl',
  },
];

/**
 * 页面列表
 */
export const PAGE_LIST: QuestionCollection = [
  {
    type: 'input',
    message: 'pageName',
    name: 'pageName',
    default: 'test',
  },
  {
    type: 'input',
    message: 'template',
    name: 'template',
    default: 'template',
  },
];
