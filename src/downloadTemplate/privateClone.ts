/**
 * Title: clone私有仓库代码
 * Author: Jeremy Yu
 * Date: 2021-07-13
 * Update:2021-07-23
 */

// import childProcess from 'child_process';
import superagent from 'superagent';
import path from 'path';
import zip from 'adm-zip';
import { mkdirSync, writeFileSync, existsSync } from 'fs';

export async function privateClone(
  outputPath: string,
  user: string,
  pass: string,
  url: string,
  isHttps: boolean = true
) {
  const uri = `${isHttps ? 'https://' : 'http://'}${user}:${pass}@${url.replace(
    /^https?:\/\//,
    ''
  )}`;
  try {
    const data = await superagent.get(uri);
    if (!data.body || !Buffer.isBuffer(data.body))
      throw new Error('request data is not a buffer');
    if (!existsSync(outputPath)) mkdirSync(outputPath);
    unzipFile(outputPath, data.body);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * unzip and write file to target path
 * @param outputPath
 * @param data
 */
function unzipFile(outputPath: string, data: Buffer) {
  const unZip = new zip(data);
  const fileList = unZip.getEntries();
  let rootDir = '';
  fileList.forEach((val, index) => {
    if (val.isDirectory) {
      if (index === 0) {
        rootDir = val.entryName;
      } else {
        const createPath = path.resolve(
          outputPath,
          val.entryName.replace(rootDir, '')
        );
        !existsSync(createPath) && mkdirSync(createPath);
      }
    } else {
      const writePath = path.resolve(
        outputPath,
        val.entryName.replace(rootDir, '')
      );
      !existsSync(writePath) &&
        writeFileSync(writePath, val.getData(), { encoding: 'utf-8' });
    }
  });
}
