<template>
  <!-- <div class="loader-overlay" v-if="loading">
    <a-spin size="large">
      <template #indicator>
        <div type="loading" style="font-size: 24px;"></div>
        <span>Loading...</span>
      </template>
    </a-spin>
  </div> -->

  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'; // Import ref from Vue
const loading = ref(true);

const handleBeforeUnload = () => {
  loading.value = true;
};

// setTimeout(() => {
//       loading.value = false;
//     }, 200);
onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});
</script>

<style>
html,body { margin: 0 !important; }
</style>