// 使用环境变量来持久化

import { isMac } from "../os/check"
import crypto from "crypto"

export function getLocalDeviceName() {
  console.log("读取环境变量", process.env.EASYTR_DEVICE_NAME)
  return process.env.EASYTR_DEVICE_NAME || crypto.randomUUID().substring(0, 8)
}

export function setLocalDeciveName(name: string) {
  process.env.EASYTR_DEVICE_NAME = name
  console.log("设置环境变量", name, process.env.EASYTR_DEVICE_NAME)

}


export function getLocalStaticPath() {
  return process.env.EASYTR_STATIC_PATH || (isMac() ? "/Users" : "C://EasyShare")
}

export function setLocalStaticPath(path: string) {
  process.env.EASYTR_STATIC_PATH = path
}