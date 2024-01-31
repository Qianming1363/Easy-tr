<template>
  <div class="item">
    <span class="lable-name"></span>
    <span class="text"></span>
    <span class="input"></span>
    <el-icon :color="'#409EFF'">
      <Edit />
    </el-icon>
  </div>
</template>

<script setup lang="ts">

const props = defineProps(['value'])

</script>

<style scoped></style>