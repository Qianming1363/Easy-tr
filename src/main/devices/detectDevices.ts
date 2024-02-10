const os = require('os')
const axios = require('axios')
// 获取局域网内所有的设备

export interface Device {
  name: string;
  ip: string;
  path: string;
}

export async function detectDevices() {
  const ip: string = getIpAddress()
  const ipLast = parseInt(ip.split('.')[3])
  const addressList: string[] = []
  for (let i = 1; i < 255; i++) {
    if (i !== ipLast) {
      // todo 存在特殊数字检测不到的情况
      const address = ip.replace('.'+ipLast + '', '.' + i + '')
      addressList.push(address)
    }
  }
  const res = await Promise.all(addressList.map((address) => {
    return syncGetDevice(address)
  }))

  return res.filter(e => e)
}

function syncGetDevice(address: string) {
  return new Promise((resolve, reject) => {
    axios.post(`http://${address}:3000/getDevices`).then((res) => {
      resolve({
        name: res.data.name,
        ip: address,
        path: '/',
      })
    }).catch((e) => { })
    // 600ms后取消
    setTimeout(() => {
      resolve(undefined)
    }, 300)
  })
}


export function getIpAddress() {
  const interfaces = os.networkInterfaces()
  for (var dev in interfaces) {
    let iface = interfaces[dev]
    if (iface) {
      for (let i = 0; i < iface.length; i++) {
        let { family, address, internal } = iface[i]
        if (process.platform === 'win32' && dev.includes("WLAN") && family === 'IPv4' && address !== '127.0.0.1' && !internal) {
          return address
        }
        if (process.platform === 'darwin' && family === 'IPv4' && address !== '127.0.0.1' && !internal) {
          return address
        }
      }
    }
  }
  return "0:0:0:0"
}
