import { app, BrowserWindow, ipcMain, session } from 'electron';
import { join } from 'path';
import { IpcMain } from 'electron';
import { useExpress } from './hook/useExpress';
import { getDirList, getStaticPath } from './fileUtils/fileRead';
import { getPathByDialog } from './dialog';
import { useEvent } from './hook/useEvent';
import { detectDevices } from './devices/detectDevices';

function createWindow() {
  useExpress()

  useEvent()

  detectDevices().then((res) => console.log(res))

  const mainWindow = new BrowserWindow({
    width: 780,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // 开启控制台调试工具

  setTimeout(() => {
    if (process.env.NODE_ENV === "development") {
     mainWindow.webContents.openDevTools({ mode: 'undocked' })
    }
  }, 600);


  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }

}

app.whenReady().then(() => {
  createWindow();
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\'']
      }
    })
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('message', (event, message) => {
  console.log(message);
})