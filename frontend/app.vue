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

<script>
import { ref } from 'vue'; // Import ref from Vue
export default {
  setup() {
    const loading = ref(true); // Define loading as a ref

    setTimeout(() => {
      loading.value = false;
    }, 200);

    return {
      loading // Return loading from setup function
    };
  }
};
</script>

<style>
html,body { margin: 0 !important; }
</style>