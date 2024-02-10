<script setup lang="ts">
import Device from "./views/Device.vue"
import File from "./views/File.vue"
import { initCustomFormatter, reactive, ref } from "vue"
import { ElMessage } from 'element-plus'


let selectdDevice = ref(false)
const device = reactive({
  name: '',
  ip: '',
  path: ''
})

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

const back = () => {
  selectdDevice.value = false
}

</script>

<template>
  <div class="container" :class="{'trans-left': selectdDevice}">
    <transition name="fade1">
      <Device  @select="select"></Device>
    </transition>
    <transition name="fade2">
      <File  :device="device" :list="dataList" @download="downLoad" @back="back"></File>
    </transition>
    
  </div>
</template>

<style scoped>

.container {
  width: 200vw;
  height: 100vh;
  display: flex;
  transition: all 0.3s ease-in-out;
}
.trans-left {
  transform: translateX(-100vw);
}


</style>
