import { setProgress } from "./downloadProgress";
import { getStaticPath } from "./fileRead";

const axios = require('axios');
const fs = require('fs');
const path = require('path');


export async function downLoadFile(address: string, url: string) {

  const fileUrl = `http://${address}:3000/${url}`;

  const downloadFolder = getStaticPath()

  if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder);
  }

  console.log("开始下载", address, url, fileUrl)

  return new Promise((resolve, reject) => {

    const fileName = path.basename(fileUrl);
    const filePath = path.join(downloadFolder, fileName);
    axios({
      method: 'get',
      url: fileUrl,
      responseType: 'stream',
      onDownloadProgress: (progressEvent) => {
        const progress = Math.floor(progressEvent.loaded / progressEvent.total * 100)
        setProgress(fileName, progress)
        console.log(`${fileName}下载进度`, progress+ '%')
      }
    })
      .then(response => {
        response.data.pipe(fs.createWriteStream(filePath));
        response.data.on('end', () => {
          console.log(`文件下载完成: ${filePath}`);
          // ui提示下载完成
          resolve("finish")
        });
      })
      .catch(error => {
        console.error(`下载文件时发生错误: ${error.message}`);
        fs.unlinkSync(filePath); // 删除部分下载的文件
        reject("error")
      });

  })

}

