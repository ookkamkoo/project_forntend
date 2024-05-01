<template>
    <a-flex class="status-web">
        <a-flex class="status-web-check border-right" vertical>
            <a-button type="primary" size="small" class="m-auto danger">ปิดเซิร์ฟ</a-button>
        </a-flex>
        <a-flex class="status-web-check border-right" vertical>
            <div class="m-auto">
                <LanguagesLanguageComponent :language=false />
            </div>
        </a-flex>
        <a-flex class="status-web-check border-right p-rl-2" vertical>
            <div class="white-text text-name">{{ name }}</div>
            <div class="p-rl-1 white-text">{{ permission }}</div>
        </a-flex>
        <!-- <a-flex class="status-web-check border-right p-rl-2 mobile-none" vertical>
            <div class="">ออนไลน์</div>
            <a-tag color="green" class="m-auto">อัตโนมัติ</a-tag>
        </a-flex>
        <a-flex class="status-web-check border-right p-rl-2 mobile-none" vertical>
            <div class="">ฝาก</div>
            <a-tag color="green" class="m-auto">อัตโนมัติ</a-tag>
        </a-flex>
        <a-flex class="status-web-check border-right p-rl-2 mobile-none" vertical>
            <div class="">ถอน</div>
            <a-tag color="green" class="m-auto">อัตโนมัติ</a-tag>
        </a-flex>
        <a-flex class="status-web-check border-right p-rl-2 mobile-none" vertical>
            <div class="">เว็บ</div>
            <a-tag color="green" class="m-auto">เปิด</a-tag>
        </a-flex>
        <a-flex class="status-web-check border-right p-rl-2 mobile-none" vertical>
            <div class="">ฝาก</div>
            <a-tag color="green" class="m-auto">เปิด</a-tag>
        </a-flex> -->
        <div class="m-auto p-rl-2 mobile">
            <a-avatar size="large"  @click="showDrawer">
                <template #icon><UserOutlined /></template>
            </a-avatar>
        </div>
        <div class="m-auto mobile-none">
            <LogoutOutlined  class="large-font p-rl-2 white-smoke-text"/>
        </div>
        <!-- <Space align="center" class="mobile-none">
            <LogoutOutlined  class="large-font p-rl-2 white-smoke-text"/>
        </Space> -->

        <a-drawer
            title="Basic Drawer"
            placement="top"
            :closable="false"
            :visible="visible"
            @close="onClose"
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </a-drawer>
    </a-flex>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getName,getUsername,getPermission } from '~/auth/authToken';

export default defineComponent({
  setup() {
    const visible = ref<boolean>(false);
    const showDrawer = () => {
      visible.value = true;
    };
    const onClose = () => {
      visible.value = false;
    };
    const name = getName();
    const permission = getPermission();
    
    return {
        visible,
        showDrawer,
        onClose,
        name,
        permission
    };
  },
});
</script>

<style lang="scss">
.m-auto {
    margin: auto;
}
.danger {
    background-color: $danger;
    color: white;
}
.danger:hover {
    background-color: darken($danger, 10%) !important;
}
</style>