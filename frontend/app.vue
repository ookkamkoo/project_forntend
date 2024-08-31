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
    // If the document is already fully loaded
    hideLoader();
  } else {
    // If the document is not yet fully loaded, listen for the load event
    window.addEventListener('load', hideLoader);
  }
});
</script>

<style scoped>
html, body {
  margin: 0 !important;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
