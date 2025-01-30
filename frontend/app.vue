<template>
  <div v-if="store.setting.serverStatus=='true'">
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
import { notifyStore } from '~/store/index';
const store = notifyStore();

const loading = ref(true);
{{store.setting.serverStatus}}
if (store.setting.serverStatus == "false") {
  throw createError({
    statusCode: 404,
    statusMessage: 'Server error - service unavailable',
  });
}

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

useHead({
  title: store.setting.title,
  meta: [
    { name: 'description', content: store.setting.description },
    { name: 'keywords', content: store.setting.keyword },
    
    // Open Graph tags for social media sharing
    { property: 'og:title', content: store.setting.title },
    { property: 'og:description', content: store.setting.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: store.setting.websiteUrl },
    { property: 'og:image', content: store.setting.imageLogoWebsite },
    
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: store.setting.title },
    { name: 'twitter:description', content: store.setting.description },
    { name: 'twitter:image', content: store.setting.imageLogoWebsite }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: store.setting.imageLogoWebsite }
  ]
});
</script>

<style>
html, body {
  margin: 0 !important;
}
</style>
