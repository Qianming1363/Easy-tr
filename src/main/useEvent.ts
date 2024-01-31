import { ipcMain } from "electron"
import { getDirList, getStaticPath, setStaticPath } from "./fileUtils/fileRead"
import { getPathByDialog } from "./dialog"
import { detectDevices } from "./devices/detectDevices"
/**
 * 用于主线程和渲染线程通信
 */
export function useEvent() {

  // 获取当前目录的文件列表
  ipcMain.handle("getList", () => {
    return getDirList(getStaticPath())
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