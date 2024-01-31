<script setup lang="ts">
import Device from "./views/Device.vue"
import File from "./views/File.vue"
import { ref } from "vue"
let selectdDevice = ref(false)

const select = (item: any) => {
  selectdDevice.value = true
  getList(item)
}

const dataList = ref<FileItem[]>([])
const getList = async (device: Device) => {
  const list: FileItem[] = await window.electronAPI.getList(device)
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
