import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const DEV_LAYER = IS_PRODUCTION
  ? __dirname
  : path.resolve(__dirname, '..', '..');
const SAVE_PATH = path.resolve(DEV_LAYER, 'local');
const FILE_NAME = 'repository.json';
const SAVE_FILE_NAME = path.resolve(SAVE_PATH, FILE_NAME);
/**
 * 保存仓库地址到本地
 * @param templateName 仓库名
 * @param repository 仓库地址
 * @param username 用户名
 * @param passwkrd 密码
 * @returns
 */
export async function saveLocalRepository(
  templateName: string,
  repository: string,
  isPrivacy: boolean = false,
  username?: string,
  password?: string
): Promise<boolean> {
  initFile();
  const data = getRepositoryData();
  if (data[templateName]) return false;
  const preUrl = isPrivacy ? `${username}:${password}@` : '';
  data[templateName] = `https://${preUrl}${repository.replace(
    /http(s)?:\/?\/?/,
    ''
  )}`;

  if (!(await checkRepositoryIsExists(data[templateName]))) return false;

  fs.writeFileSync(SAVE_FILE_NAME, JSON.stringify(data), { encoding: 'utf-8' });
  return true;
}

/**
 * 获取仓库文件数据
 */
export function getRepositoryData(): Record<string, any> {
  if (!fs.existsSync(SAVE_FILE_NAME)) return {};
  const data = require(SAVE_FILE_NAME);
  return data;
}

/**
 * 初始化文件
 * @returns boolean
 */
function initFile(): boolean {
  if (!fs.existsSync(SAVE_PATH)) fs.mkdirSync(SAVE_PATH);
  if (!fs.existsSync(SAVE_FILE_NAME))
    fs.writeFileSync(SAVE_FILE_NAME, `{}`, { encoding: 'utf-8' });

  return true;
}

async function checkRepositoryIsExists(url: string): Promise<boolean> {
  try {
    await superagent.get(url);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
