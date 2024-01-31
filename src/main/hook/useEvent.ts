import { ipcMain } from "electron"
import { getDirList, getStaticPath, setStaticPath } from "../fileUtils/fileRead"
import { getPathByDialog } from "../dialog"
import { Device, detectDevices } from "../devices/detectDevices"
import axios from "axios"
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


}