<script setup lang="ts">
import { onMounted, ref } from "vue"
import { ipcRenderer } from "electron"



const props = defineProps(["list", "device"])

const emits = defineEmits(["download", "back", "refresh", "upload"])



const itemClick = (item: FileItem) => {
  // server + path 得到请求的路径
  emits("download", item)
}

const back = () => {
  emits("back")
}

const refresh = () => {
  emits("refresh")
}

const upload = () => {
  emits("upload")
}

const getIcon = (item: FileItem) => {
  if(item.name.includes("zip") || item.name.includes("rar") || item.name.includes("tar") || item.name.includes("7z")) {
    return "Collection"
  }

  if(item.name.includes("png") || item.name.includes("jpg") || item.name.includes("jpeg")) {
    return "Picture"
  }

  if(item.name.includes("mp4") || item.name.includes("mov") || item.name.includes("avi")) {
    return "VideoCamera"
  }

  if(item.name.includes("mp3")) {
    return "Headset"
  }

  return "Document"
}


</script>

<template>
  <div class="con">
    <div class="top">
      <div class="deviceName">{{ device.name }}</div>
    </div>
    <div class="btn-list">
      <el-button class="btn" type="primary" :icon="'ArrowLeft'" @click="back" />
      <el-button class="btn" type="primary" :icon="'Refresh'" @click="refresh"  />
      <el-button class="btn" type="primary" :icon="'Upload'" @click="upload" />
    </div>
    <ul class="list">
      <li class="item" v-for="item in props.list" :key="item.name" @click="itemClick(item)">
        <span class="left">
          <el-icon :size="'24px'" :color="'#409EFF'"><component :is="getIcon(item)" /></el-icon>
          <span style="margin-left: 6px;">{{ item.name }}</span>
        </span>
        <span class="right">
          <el-button class="btn" type="primary" :icon="'Download'" @click="upload" />
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.con {
  width: 100vw;
  height: 100vh;
  padding: 20px 40px;
}
.item {
  display: flex;
  justify-content: flex-start;
  border-radius: 4px;
}
.btn-list {
  display: flex;
  justify-content: flex-start;
  margin-left: 22px;
}
.btn  {
  width: 32px;
  height: 32px;
  font-size: 18px;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.top {
  text-align: left;
  margin-left: 24px;
  margin-bottom: 10px;
}

.deviceName {
  font-size: 20px;
  font-weight: 600;
}

.directory {
  font-size: 12px;
  font-weight: 300;
  color: #333;
}


.page {
  width: 100vw;
  /* border: 1px solid red; */
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.list {
  margin-top: 16px;
}

.list li {
  display: flex;
  justify-content: space-between;
  height: 34px;
}

.list .left {
  margin-left: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.list .right {
  margin-right: 120px;
}

.list .right button {
  cursor: pointer;
  height: 30px;
  font-size: 14px;
  line-height: 22px;
  padding: 4px 8px;
}
</style>
