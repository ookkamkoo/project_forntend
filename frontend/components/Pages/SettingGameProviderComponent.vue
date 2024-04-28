<template>
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="ฝาก - ถอน">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="2" tab="การเล่น">Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  const activeKey = ref('1');
  </script>