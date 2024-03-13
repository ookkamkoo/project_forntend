<template>
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="ทั่วไป">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="2" tab="ระบบออโต้">Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane key="2" tab="การเเจ้งเตือน">Content of Tab Pane 2</a-tab-pane>
    </a-tabs>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  const activeKey = ref('1');
  </script>