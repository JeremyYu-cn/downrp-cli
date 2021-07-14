import download from 'download-git-repo';
import path from 'path';
import { IPromptOption } from '@/assets/inquirer';
import RepositoryList from '@/assets/repository';

export function downloadTemplate(options: IPromptOption): Promise<boolean> {
  return new Promise((resolve) => {
    const CURRENT_PATH = process.cwd();
    const { projectName, templateName, repositoryUrl } = options;
    const targetPath = path.resolve(CURRENT_PATH, projectName);
    const rpUrl = repositoryUrl
      ? `direct:${repositoryUrl}`
      : (<Record<string, any>>RepositoryList)[templateName];
    download(rpUrl, targetPath, {}, (err) => {
      if (err) {
        console.log(err);
        resolve(false);
      }
      resolve(true);
    });
  });
}
