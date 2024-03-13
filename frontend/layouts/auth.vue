<template>
  <!-- <LoadingComponents /> -->
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
      <LanguagesLanguageComponent :language="true"/>
    </a-layout-header>
    <a-layout-content>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '100%' }">
        <slot />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      {{ $config.public.webName }} ©2024 Created by fastPlay
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.layout{
  position: fixed;
  width: 100%;
  height: 100vh;
}
.menu-wrapper {
  flex-grow: 1;
  text-align: right;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.lang_flag{
    border-radius: 5px;
    height: auto;
    width: 30px;
}
.lang_text {
    font-size: 16px;
    height: 100%;
    padding-left: 15px;
    color: gray;
}
.lang_select{
    display: flex;
}
.tran{
  background-color: transparent !important;
  border: none !important;
}
.black{
  color: black;
}
.layout .ant-layout-header{
  background: white !important;
  padding: 1rem;
}
</style>
