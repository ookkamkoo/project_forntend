<template>
  <div class="loader-overlay" v-if="loading">
    <a-spin size="large">
      <template #indicator>
        <div class="custom-spinner" style="font-size: 24px;"></div>
        <span>Loading...</span>
      </template>
    </a-spin>
  </div>

  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const loading = ref(false);
let timeoutId: number;

const router = useRouter();

const handleBeforeUnload = () => {
  timeoutId = window.setTimeout(() => {
    loading.value = true;
  }, 1000); // Set delay to 200ms
};

router.beforeEach((to, from, next) => {
  timeoutId = window.setTimeout(() => {
    loading.value = true;
  }, 200); // Set delay to 200ms
  next();
});

router.afterEach(() => {
  clearTimeout(timeoutId);
  loading.value = false;
});

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
  clearTimeout(timeoutId);
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
