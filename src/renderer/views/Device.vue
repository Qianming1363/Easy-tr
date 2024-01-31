<script setup lang="ts">
import { onMounted, ref } from "vue"

const list = ref<any[]>([])

onMounted(async () => {
  console.log("检测局域网内的设备")
  list.value.length = 0
  list.value = await window.electronAPI.getDeviceList()
})

const emits = defineEmits(["select"])

const itemClick = (item: any) => {
  emits("select", item)
}

</script>

<template>
  <div>
    <div>在线设备</div>
    <div class="item" v-for="item in list" :key="item.name" @click="itemClick(item)">
      <span>设备名称</span>
      <span class="name">{{ item.name }}</span>
      <br>
      <span>设备ip</span>
      <span>{{ item.ip }}</span>
    </div>

  </div>
</template>
<style scoped>
.item {
  width: 240px;
  height: 80px;
}

.name {
  display: inline-block;
  width: 240px;
  height: 80px;
  text-overflow: ellipsis;
}
</style>