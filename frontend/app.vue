<template>
  <div>
    <!-- Overlay that covers the screen -->
    <div class="loader-overlay" v-if="loading">
      <a-spin size="large">
        <template #indicator>
          <div class="custom-spinner" style="font-size: 24px;"></div>
          <span>Loading...</span>
        </template>
      </a-spin>
    </div>

    <!-- Main content of the page -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const loading = ref(true);

onMounted(() => {
  const hideLoader = () => {
    setTimeout(() => {
      loading.value = false;
    }, 200); // Delay of 200ms after load
  };

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }
});
</script>

<style scoped>
html, body {
  margin: 0 !important;
}

.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

.custom-spinner {
  font-size: 24px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
