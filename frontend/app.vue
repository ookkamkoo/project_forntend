<template>
  <div class="loader-overlay" v-if="loading">
    <a-spin size="large">
      <template #indicator>
        <div type="loading" style="font-size: 24px;"></div>
        <span>Loading...</span>
      </template>
    </a-spin>
  </div>

  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'; // Import ref from Vue
const loading = ref(false);
let timeoutId: number;

const handleBeforeUnload = () => {
  // Delay showing the loader by 200ms
  timeoutId = window.setTimeout(() => {
    loading.value = true;
  }, 400);
};

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
  clearTimeout(timeoutId);
});
</script>

<style>
html,body { margin: 0 !important; }
</style>