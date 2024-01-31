<script setup lang="ts">
import Device from "./views/Device.vue"
import File from "./views/File.vue"
import { ref } from "vue"
let selectdDevice = ref(false)

const select = (item: any) => {
  selectdDevice.value = true
}

</script>

<template>
  <div>
    <Device v-if="!selectdDevice" @select="select"></Device>
    <File v-if="selectdDevice"></File>
  </div>
</template>

<style scoped></style>
