<script setup lang="ts">
import { onMounted, ref } from "vue"
import { ipcRenderer } from "electron"



const props = defineProps(["list"])

const setStaticDir = async () => {
  const res = await window.electronAPI.getPathByDialog()
  console.log(res)
  if (res.canceled) {
    console.log("用户取消操作，未选择静态目录")
  } else {
    console.log("用户已设定分享目录")
    console.log(res.filePaths[0])
  }
}




const itemClick = (item: FileItem) => {
  // server + path 得到请求的路径
  console.log(item)
}
</script>

<template>
  <div>
    <div class="top">
      <div class="deviceName">AMD-YES</div>
      <div class="directory">/user/code/static</div>
      <button @click="setStaticDir">设置静态目录</button>
    </div>
    <ul class="list">
      <li v-for="item in props.list" :key="item.name" @click="itemClick(item)">
        <span class="left">
          <span v-if="item.isDir">📂</span>
          <span v-if="!item.isDir">🚀</span>
          <span>{{ item.name }}</span>
        </span>
        <span class="right">
          <button>下载</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
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

.list li {
  display: flex;
  justify-content: space-between;
  height: 34px;
}

.list .left {
  margin-left: 24px;
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
