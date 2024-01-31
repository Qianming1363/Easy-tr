/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  getList: () => FileItem[],
  getPathByDialog: () => DialogRes,
  getDeviceList: () => any
}

declare global {
  interface Window {
    electronAPI: ElectronApi,
  }
}

declare interface FileItem {
  isDir: boolean;
  path: string;
  absolutePath: string;
  name: string;
  children?: FileItem[]
}

declare interface DialogRes {
  canceled: boolean
  filePaths: string[]
}