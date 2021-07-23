/**
 * Title: 处理prompt选择后的方法
 * Author: Jeremy Yu
 * Date: 2021-07-13
 * Update:
 */

import { downloadTemplate, privateClone } from './downloadTemplate';
import { IPromptOption } from './assets/inquirer';
import path from 'path';
import ora from 'ora';

/**
 * 选择后处理请求
 */
export async function handlePromptMethod<T extends IPromptOption>(
  params: T
): Promise<void> {
  const newOra = ora('start download template').start();
  try {
    const {
      repositoryType,
      projectName,
      repositoryUser = '',
      repositoryPass = '',
      repositoryUrl = '',
    } = params;
    let downloadResult = true;
    // download for private repository
    if (repositoryType === 'private') {
      const outputPath = path.resolve(process.cwd(), projectName);
      downloadResult = await privateClone(
        outputPath,
        repositoryUser,
        repositoryPass,
        repositoryUrl
      );
      // download for public repository
    } else {
      downloadResult = await downloadTemplate(params);
    }
    downloadResult
      ? newOra.succeed('download template success')
      : newOra.fail('download fail');
  } catch (err) {
    console.log(err);
    newOra.fail('download fail');
  }
}
