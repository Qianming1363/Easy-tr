<script setup lang="ts">
import { onMounted, ref } from "vue"
import { ElMessage } from "element-plus"

const staticPath = ref('')
const deviceName = ref('')
const list = ref<any[]>([])

const change = () => {
  console.log("设置设备名称", deviceName.value)
  localStorage.setItem("deviceName", deviceName.value)
  window.electronAPI.setDeviceName(deviceName.value)
}

onMounted(async () => {

  deviceName.value = localStorage.getItem("deviceName") || await window.electronAPI.getDeviceName()
  staticPath.value = localStorage.getItem("staticPath") || await window.electronAPI.getStaticPath()

  window.electronAPI.setDeviceName(deviceName.value)
  window.electronAPI.setStaticPath(staticPath.value)

  list.value.length = 0
  list.value = await window.electronAPI.getDeviceList()
})

const emits = defineEmits(["select"])

const itemClick = (item: any) => {
  emits("select", item)
}

const dialogVisible = ref(false)
const openDialog = () => {
  dialogVisible.value = true
}

const setStaticDir = async () => {
  const res = await window.electronAPI.getPathByDialog()
  console.log(res)
  if (res.canceled) {
    console.log("用户取消操作，未选择静态目录")
    ElMessage.info("操作已取消")
  } else {
    console.log(res.filePaths[0])
    staticPath.value = res.filePaths[0]
    ElMessage.success("设置成功")
    localStorage.setItem("staticPath", staticPath.value)
  }
}



</script>

<template>
  <div>
    <div class="top">
      <div class="title">在线设备</div>
      <div class="setting">
        <el-icon style="cursor: pointer;" :size="'36px'" :color="'#409EFF'" @click="openDialog">
          <Tools />
        </el-icon>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for=" item  in  list " :key="item.name" @click="itemClick(item)">
        <div class="item-left">
          <el-icon :size="'36px'" :color="'#409EFF'">
            <Monitor />
          </el-icon>
        </div>
        <div class="item-right">
          <span class="name">{{ item.name }}</span>
          <span class="ip">{{ item.ip }}</span>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" title="设置">
      <div class="setting-item">
        <span class="label">设备名</span>
        <el-input class="setting-input" v-model="deviceName" @change="change" />
      </div>
      <div class="setting-item">
        <span class="label">共享路径</span>
        <el-input class="setting-input" v-model="staticPath" disabled />
        <el-button class="edit" type="primary" :icon="'Edit'" @click="setStaticDir" />
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
.setting-item {
  width: 400px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.setting-input {
  width: 160px;
  height: 30px;
}

.edit {
  margin-left: 12px;
  height: 30px;
  width: 30px;
}

.label {
  width: 80px;
  text-align: left;
  line-height: 30px;
}

.top {
  display: flex;
  justify-content: space-between;
}

.title {
  text-align: left;
  font-size: 22px;
  font-weight: 600;
  color: #555;
}

.list {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}

.item {
  width: 180px;
  height: 64px;
  display: flex;
  justify-content: flex-start;
  border: 1px solid #CCC;
  border-radius: 14px;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.24s ease-in-out;
  margin-right: 22px;
  margin-top: 22px;
}

.item:hover {
  border: 1px solid rgba(60, 200, 255, 0.3);
  box-shadow: 0px 0px 20px 8px rgba(60, 200, 255, 0.3);
  transform: scale(1.13);
  border-radius: 32px;
}

.item-left {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
}

.item-right {
  height: 64px;
  text-align: left;
  padding-left: 8px;
}

.name {
  display: inline-block;
  text-overflow: ellipsis;
  font-size: 18px;
  position: relative;
  bottom: -4px;
  font-weight: 600;
  letter-spacing: 1px;
}

.ip {
  font-size: 12px;
  transform: scale(0.8);
  color: #666;
  position: relative;
  top: -6px;
}
</style>