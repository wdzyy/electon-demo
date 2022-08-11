<template>
  <div class="w-full h-screen bg-gray-400">
    deviceId---{{ deviceId }}
    <el-button @click="handleSample">采样</el-button>
    <el-button @click="handleInspect">验布</el-button>
    <el-button @click="handlePublish">推送花型信息</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import { useRouter } from 'vue-router';
import { ipcRenderer } from 'electron';
import remoteUtils from '../../electron/bridge/utils/remote.utils';

// const router = useRouter();

let deviceId = ref<string>('0');

onMounted(async () => {
  const res = await remoteUtils.readConfig();
  deviceId.value = JSON.parse(res).machineNo;
  console.log('====================================');
  console.log(res, 'res');
  console.log('====================================');
  ipcRenderer.on('imageMessage', async (e, arg) => {
    console.log('====================================');
    console.log(e, arg, '222');
    console.log('====================================');
  });
});

const handleSample = (): void => {
  ipcRenderer.send('getImages', `image_upload/${deviceId.value}`);
};
const handleInspect = (): void => {
  ipcRenderer.send('getImageInferenceResult', `image_inference_result/${deviceId.value}`);
};
const handlePublish = (): void => {
  const data = {
    payload: JSON.stringify({
      jobId: '1',
      taskType: 2,
      deviceId: 1,
      patternId: 1,
      patternNo: 1,
      patternName: 1,
    }),
    qos: 1,
    topic: 'flower_pattern',
  };
  ipcRenderer.send('flowerPattern', data);
};
// const goto = (): void => {
//   router.push({ path: '/ai-sampling' });
// };
</script>

<style lang="scss">
.container {
}
</style>
