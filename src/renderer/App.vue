<script setup lang="ts">
import Device from "./views/Device.vue"
import File from "./views/File.vue"
import { ref } from "vue"
let selectdDevice = ref(false)

const select = async (item: any) => {
  await getList(item as Device)
  selectdDevice.value = true
}

const dataList = ref<FileItem[]>([])
const getList = async (device: Device) => {
  console.log("获取其他设备列表", device.ip)
  // 不能引用内存 ？？  直接写device报错
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

</script>

<template>
  <div>
    <Device v-if="!selectdDevice" @select="select"></Device>
    <File v-if="selectdDevice" :list="dataList"></File>
  </div>
</template>

<style scoped></style>
