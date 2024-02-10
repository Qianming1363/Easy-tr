<template>
    <el-button v-if="status === 0" class="btn" type="primary" :icon="'Download'" @click="download" />
    <div  v-if="status === 1" class="progress">
        <el-progress :percentage="progress" />
    </div>
    <el-button v-if="status === 2" class="btn" type="warning" :icon="'Folder'" @click="openFile" />
</template>

<script setup lang="ts">
import {ref} from "vue"
const progress = ref(0)
const status = ref(0)

const props = defineProps(["name"])
const emits = defineEmits(["download", "openFile"])

const download = () => {
    emits("download")
    status.value = 1
    progress.value = 0
    checkProgress(props.name)
}

const openFile = () => {
    console.log("打开文件夹")
    emits("openFile")
}

function checkProgress(name: string) {
    setTimeout(() => {
        window.electronAPI.getDownloadProgress(name).then((res) => {
            progress.value = res
                if(res !== 100) {
                setTimeout(() => {
                    checkProgress(name)
                }, 100);  
            } else {
                status.value = 2
            }
        })
    }, 200);
}

</script>

<style scoped>
.progress {
    width: 140px;
    height: 34px;
    padding: 10px 0;

}
.btn {
    width: 30px;
    height: 30px;
}
</style>