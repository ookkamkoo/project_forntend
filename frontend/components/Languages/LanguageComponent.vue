<template>
  <div class="menu-wrapper">
    <a-dropdown>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1">
            <div class="lang_select">
              <img src="https://p0ws.74ewe.com/static/img/th.png" class="lang_flag">
              <span v-if="language" class="lang_text black">TH</span>
            </div>
          </a-menu-item>
        </a-menu>
      </template>
      <a-button class="tran">
        <div class="lang_select">
          <img src="https://p0ws.74ewe.com/static/img/th.png" class="lang_flag">
          <span v-if="language" class="lang_text">TH</span>
        </div>
      </a-button>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
const handleMenuClick = (e: any) => {
  console.log('click', e);
  // console.log();
};

const props = defineProps({
  language: Boolean // Define a prop named 'language' of type String
});
</script>

<style scoped>
.menu-wrapper {
  flex-grow: 1;
  text-align: right;
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
</style>