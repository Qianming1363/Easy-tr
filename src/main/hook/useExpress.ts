import { app, BrowserWindow, ipcMain, session } from 'electron';
import { join } from 'path';
import { getDirList, getStaticPath, localInfo, setStaticPath } from '../fileUtils/fileRead';

const express = require("express")

let expressInstance: any = undefined

export function useExpress() {
  const expressApp = express()
  expressInstance = expressApp
  const port = 3000
  const staticPath = join(app.getAppPath(), getStaticPath())
  console.log("当前默认静态目录", staticPath)
  // setStaticPath(staticPath)
  expressApp.get('/', (req, res) => {
    res.send('Hello World!')
  })

  expressApp.post('/getDevices', (req, res) => {
    res.json({ name: localInfo.deviceName });
  })

  expressApp.post('/getStaticDirList', (req, res) => {
    res.json({ list: getDirList(getStaticPath()) })
  })

  expressApp.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })

  expressApp.use(express.static(staticPath))

}

export function setExpressStaticPath(staticPath: string) {
  if (expressInstance && staticPath) {
    expressInstance.use(express.static(staticPath))
  }
}







// 1、扫描局域网内的开放端口，识别设备名 （可设置当前设备名以及共享目录, 具备目录的读写权限）

//  / check 路由返回设备名称 ， 用于检测该ip是否启动服务
//  / getDirectory 返回当前目录下的文件

// 2、单节点扫描静态目录下的文件，输出到页面渲染
// 动态设置共享文件夹，设置为server静态目录
// 获取列表

// 3、点击下载后，处理对应路径，生成下载地址，若是文件夹，则递归处理



/**
 * 1、electron选择本地文件夹，设置静态目录位置 
 * 2、扫描局域网所有设备，读取局域网其他设备
 * 3、从其他设备下载
 * 4、上传到其他设备
 */

