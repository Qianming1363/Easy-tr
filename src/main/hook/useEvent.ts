import { ipcMain } from "electron"
import { getDeviceName, getDirList, getStaticPath, openFolder, setDeviceName, setStaticPath } from "../fileUtils/fileRead"
import { getPathByDialog } from "../dialog"
import { Device, detectDevices } from "../devices/detectDevices"
import axios from "axios"
import { downLoadFile } from "../fileUtils/fileDownload"
import { getLocalDeviceName, setLocalDeciveName } from "../local/local"
import { getProgress } from "../fileUtils/downloadProgress"
import path from "path"
/**
 * 用于主线程和渲染线程通信
 */
export function useEvent() {

  // 获取当前目录的文件列表
  ipcMain.handle("getList", async (event: Electron.IpcMainInvokeEvent, device: Device) => {
    const address = device.ip
    // todo 带上path参数
    const res = await axios.post(`http://${address}:3000/getStaticDirList`)
    return res.data.list
  })
  // 设置静态目录
  ipcMain.handle("getPathByDialog", async () => {
    const res = await getPathByDialog()
    if (!res.canceled) {
      const staticPath = res.filePaths[0]
      setStaticPath(staticPath)
    }
    return res
  })
  //  检测当前设备
  ipcMain.handle("getDeviceList", async () => {
    return await detectDevices()
  })
  ipcMain.handle("downLoad", async (event: Electron.IpcMainInvokeEvent, address: string, url: string) => {
    return await downLoadFile(address, url)
  })

  ipcMain.handle("getDeviceName", () => {
    return getDeviceName()
  })

  ipcMain.handle("setDeviceName", (event: Electron.IpcMainInvokeEvent, name: string) => {
    setDeviceName(name)
  })

  ipcMain.handle("getStaticPath", () => {
    return getStaticPath()
  })

  ipcMain.handle("setStaticPath", (event: Electron.IpcMainInvokeEvent, path: string) => {
    setStaticPath(path)
  })

  ipcMain.handle("getDownloadProgress", (event: Electron.IpcMainInvokeEvent, name: string) => {
    return getProgress(name)
  })

  ipcMain.handle("openFolder", (event: Electron.IpcMainInvokeEvent, name: string) => {
    // const filePath = path.join(getStaticPath(), name);
    openFolder(getStaticPath())
  })

  



}