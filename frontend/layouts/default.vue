<template>
  <a-layout :style="{ height: '100vh'}">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <LayoutSidebar/>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fb7d7d; padding: 0">
        <a-flex :justify="'space-between'">
          <div>
            <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="() => (collapsed = !collapsed)"
            />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          </div>
          <LayoutHeader/>
        </a-flex>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fdf', minHeight: '280px' }"
      >
        sdsdsdsd
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const collapsed = ref<boolean>(false);

</script>

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>