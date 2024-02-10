import fs from "fs"
import path from "path"
import { setExpressStaticPath } from "../hook/useExpress";
import { getLocalDeviceName, getLocalStaticPath, setLocalDeciveName } from "../local/local";
const { exec } = require('child_process');
export interface FileItem {
  isDir: boolean;
  path: string;
  absolutePath: string;
  name: string;
  children?: FileItem[]
}

export const localInfo = {
  static: getLocalStaticPath(),
  deviceName: getLocalDeviceName()
}

export function getStaticPath() {
  return localInfo.static
}


export function setStaticPath(staticPath: string) {
  localInfo.static = staticPath
  setExpressStaticPath(staticPath)
  process.env.EASYTR_STATIC_PATH = staticPath;
}

export function getDeviceName() {
  return localInfo.deviceName
}

export function setDeviceName(name: string) {
  localInfo.deviceName = name
  setLocalDeciveName(name)
}

/**
 * 读取本地共享目录
 * @param url 
 * @returns 
 */
export function getDirList(url: string) {
  const filePath = path.resolve(url)
  const listDir = fs.readdirSync(filePath, { withFileTypes: true });
  const fileList: FileItem[] = []
  listDir.forEach((ele, index) => {
    let currentPath = path.join(filePath, ele.name);
    if (ele.isFile()) {
      fileList.push({
        isDir: false,
        path: ele.name,
        name: ele.name,
        absolutePath: currentPath,
      })
    }
    // 暂时隐藏目录
    //  if (ele.isDirectory()) {
    //   fileList.push({
    //     isDir: true,
    //     path: ele.name,
    //     name: ele.name,
    //     absolutePath: currentPath,
    //   })
    // }

  });
  return fileList
}


export function openFolder(filePath: string) {
  const command = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'explorer' : 'xdg-open';
  const cmd = `${command} ${filePath}`
  console.log("当前执行的命令", cmd)
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
  });
}