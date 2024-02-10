import { contextBridge, ipcRenderer } from 'electron';
import { getDirList, getStaticPath } from './fileUtils/fileRead';
import { Device } from './devices/detectDevices';

contextBridge.exposeInMainWorld('electronAPI', {
  getList: (device: Device) => ipcRenderer.invoke("getList", device),
  getPathByDialog: () => ipcRenderer.invoke("getPathByDialog"),
  getDeviceList: () => ipcRenderer.invoke("getDeviceList"),
  downLoad: (address: string, url: string) => ipcRenderer.invoke("downLoad", address, url),
  getDeviceName: () => ipcRenderer.invoke("getDeviceName"),
  setDeviceName: (name: string) => ipcRenderer.invoke("setDeviceName", name),
  getStaticPath: () => ipcRenderer.invoke("getStaticPath"),
  setStaticPath: (path: string) => ipcRenderer.invoke("setStaticPath", path),
  getDownloadProgress:(name:string) => ipcRenderer.invoke("getDownloadProgress", name),
  openFolder:(name:string) => ipcRenderer.invoke("openFolder", name)
})
