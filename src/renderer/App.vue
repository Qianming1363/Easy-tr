<script setup lang="ts">
import Device from "./views/Device.vue"
import File from "./views/File.vue"
import { ref } from "vue"
import { ElMessage } from 'element-plus'


let selectdDevice = ref(false)
const device = {
  name: '',
  ip: '',
  path: ''
}

const select = async (item: any) => {
  await getList(item)
  selectdDevice.value = true
  Object.assign(device, item)
}

const dataList = ref<FileItem[]>([])
const getList = async (device: Device) => {
  console.log("获取其他设备列表", device.ip)
  // 不能引用内存   直接写device报错 
  const list: FileItem[] = await window.electronAPI.getList({ ip: device.ip, name: device.name, path: device.path })
  list.sort((a: FileItem, b: FileItem) => {
    if (a.isDir && b.isDir) {
      return 0
    } else if (a.isDir && !b.isDir) {
      return -1
    } else {
      return 1
    }
  })
  console.log(list)
  dataList.value.length = 0;
  dataList.value = list
}


const downLoad = (item: FileItem) => {
  console.log("开始下载", device.ip, item.path)
  window.electronAPI.downLoad(device.ip, item.path).then(() => {
    ElMessage.success("下载完成")
  })
}

</script>

<template>
  <div>
    <Device v-if="!selectdDevice" @select="select"></Device>
    <File v-if="selectdDevice" :list="dataList" @download="downLoad"></File>
  </div>
</template>

<style scoped></style>
