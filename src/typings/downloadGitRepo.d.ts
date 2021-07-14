declare module 'download-git-repo' {
  interface IDownloadOptions {
    /**
     * 是否使用git clone.default false
     */
    clone?: boolean;
    headers?: Record<string, any>;
  }
  interface IErrorRecord {
    host: string;
    hostname: string;
    method: string;
    path: string;
    protocol: string;
    url: string;
    statusCode: number;
    statusMessage: string;
    headers: Record<string, any>;
  }
  type downloadCallback = (err: IErrorRecord) => void;
  export default function (
    repository: string,
    destination: string,
    options: IDownloadOptions = {},
    callback: downloadCallback
  ) {}
}
