/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  getList: (device: Device) => FileItem[],
  getPathByDialog: () => DialogRes,
  getDeviceList: () => any,
  downLoad: (address: string, url: string) => any,
  getDeviceName: () => string,
  setDeviceName: (name: string) => void,
  getStaticPath: () => string,
  setStaticPath: (path: string) => void,
  getDownloadProgress: (name:string) => Promise<number>,
  openFolder:(name:string) => void
}

declare global {
  interface Window {
    electronAPI: ElectronApi,
  }
  interface FileItem {
    isDir: boolean;
    path: string;
    absolutePath: string;
    name: string;
    children?: FileItem[]
  }
  interface DialogRes {
    canceled: boolean
    filePaths: string[]
  }
  interface Device {
    name: string;
    ip: string;
    path: string;
  }
  interface FileItem {
    isDir: boolean;
    path: string;
    absolutePath: string;
    name: string;
    children?: FileItem[]
  }

}