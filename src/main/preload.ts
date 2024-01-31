import { contextBridge, ipcRenderer } from 'electron';
import { getDirList, getStaticPath } from './fileUtils/fileRead';
import { Device } from './devices/detectDevices';

contextBridge.exposeInMainWorld('electronAPI', {
  getList: (device: Device) => ipcRenderer.invoke("getList", device),
  getPathByDialog: () => ipcRenderer.invoke("getPathByDialog"),
  getDeviceList: () => ipcRenderer.invoke("getDeviceList")
})
