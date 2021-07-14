/**
 * Title: 处理prompt选择后的方法
 * Author: Jeremy Yu
 * Date: 2021-07-13
 * Update:
 */

import { downloadTemplate } from './downloadTemplate';
import { IPromptOption } from './assets/inquirer';
import ora from 'ora';

/**
 * 选择后处理请求
 */
export async function handlePromptMethod<T extends IPromptOption>(
  params: T
): Promise<void> {
  try {
    const newOra = ora('start download template').start();
    const downloadResult = await downloadTemplate(params);
    downloadResult
      ? newOra.succeed('download template success')
      : newOra.fail('download fail');
  } catch (err) {
    console.log(err);
  }
}
