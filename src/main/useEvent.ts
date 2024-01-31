import { ipcMain } from "electron"
import { getDirList, getStaticPath, setStaticPath } from "./fileUtils/fileRead"
import { getPathByDialog } from "./dialog"
import { Device, detectDevices } from "./devices/detectDevices"
import axios from "axios"
/**
 * 用于主线程和渲染线程通信
 */
export function useEvent() {

  // 获取当前目录的文件列表
  ipcMain.handle("getList", async (device: Device) => {

    // axios 请求选中的目录，读取
    const address = "0:0:0:0"
    const res = await axios.post(`http://${address}:3000/getStaticDirList`)
    return res
  })
  // 设置静态目录
  ipcMain.handle("getPathByDialog", async () => {
    const res = await getPathByDialog()
    if (!res.canceled) {
      const staticPath = res.filePaths[0]
      setStaticPath(staticPath)
      // 重新展示信息
    }
    return res
  })
  // 
  ipcMain.handle("getDeviceList", async () => {
    return await detectDevices()
  })


}