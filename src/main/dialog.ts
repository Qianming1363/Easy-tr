import { dialog } from "electron";

export async function getPathByDialog() {
  const res = await dialog.showOpenDialog({ properties: ['openDirectory'] })
  console.log(res)
  return res
}