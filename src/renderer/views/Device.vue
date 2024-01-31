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
    <div v-for="item in list" :key="item.name" @click="itemClick(item)">
      <span>设备名称</span>
      <span>{{ item.name }}</span>
      <br>
      <span>设备ip</span>
      <span>{{ item.ip }}</span>
    </div>

  </div>
</template>
<style scoped></style>