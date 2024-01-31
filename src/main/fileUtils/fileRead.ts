import fs from "fs"
import path from "path"
import { setExpressStaticPath } from "../hook/useExpress";
import crypto from "crypto"
import { isMac } from "../os/check";
export interface FileItem {
  isDir: boolean;
  path: string;
  absolutePath: string;
  name: string;
  children?: FileItem[]
}

export const localInfo = {
  static: isMac() ? "/Users" : "C://",
  deviceName: crypto.randomUUID().substring(0, 8)
}

export function getStaticPath() {
  return localInfo.static
}


export function setStaticPath(staticPath: string) {
  localInfo.static = staticPath
  setExpressStaticPath(staticPath)
}

/**
 * 读取本地共享目录
 * @param url 
 * @returns 
 */
export function getDirList(url: string) {
  console.log("读取的文件地址", url)
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
    } else if (ele.isDirectory()) {
      fileList.push({
        isDir: true,
        path: ele.name,
        name: ele.name,
        absolutePath: currentPath,
      })
    }
  });
  return fileList
}


