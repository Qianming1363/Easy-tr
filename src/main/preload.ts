import { contextBridge, ipcRenderer } from 'electron';
import { getDirList, getStaticPath } from './fileUtils/fileRead';

contextBridge.exposeInMainWorld('electronAPI', {
  getList: () => ipcRenderer.invoke("getList"),
  getPathByDialog: () => ipcRenderer.invoke("getPathByDialog"),
  getDeviceList: () => ipcRenderer.invoke("getDeviceList")
})
