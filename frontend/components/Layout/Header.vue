<template>
    <a-flex class="status-web">
        <!-- Button to close server -->
        <a-flex class="status-web-check" vertical>
            <a-button type="primary" size="small" class="m-auto danger">ปิดเซิร์ฟ</a-button>
        </a-flex>

        <!-- Language selection component -->
        <a-flex class="status-web-check" vertical>
            <div class="m-auto">
                <LanguagesLanguageComponent :language="false" />
            </div>
        </a-flex>

        <!-- System statuses -->
        <a-flex class="status-web-check border-right p-rl-2 mobile-none" vertical>
            <div>ออนไลน์</div>
            <a-tag color="green" class="m-auto">อัตโนมัติ</a-tag>
        </a-flex>
        <a-flex class="status-web-check border-right p-rl-2 mobile-none" vertical>
            <div>ฝาก</div>
            <a-tag color="green" class="m-auto">อัตโนมัติ</a-tag>
        </a-flex>
        <a-flex class="status-web-check border-right p-rl-2 mobile-none" vertical>
            <div>ถอน</div>
            <a-tag color="green" class="m-auto">อัตโนมัติ</a-tag>
        </a-flex>
        <a-flex class="status-web-check border-right p-rl-2 mobile-none" vertical>
            <div>เว็บ</div>
            <a-tag color="green" class="m-auto">เปิด</a-tag>
        </a-flex>
        <a-flex class="status-web-check border-right p-rl-2 mobile-none" vertical>
            <div>ฝาก</div>
            <a-tag color="green" class="m-auto">เปิด</a-tag>
        </a-flex>

        <!-- Avatar and dropdown -->
        <!-- <div class="m-auto p-rl-2 mobile">
            <a-avatar size="large" @click="showDrawer">
                <template #icon><UserOutlined /></template>
            </a-avatar>
        </div> -->
        <div class="m-auto p-3">
            <a-dropdown v-model:open="visible" :trigger="['click']" class="profile">
                <a-badge :count="10">
                    <a-avatar style="color: #f56a00; background-color: #fde3cf" >{{ name?.charAt(0).toUpperCase() || 'U' }}</a-avatar>
                </a-badge>
                <template #overlay>
                    <a-menu @click="handleMenuClick">
                        <div class="dropdown-header">
                            <a-avatar size="large" style="color: #f56a00; background-color: #fde3cf">{{ name?.charAt(0).toUpperCase() || 'U' }}</a-avatar>
                            <div class="profile-info">
                                <div class="profile-name">{{ name }}</div>
                                <div class="profile-role">{{ permission }}</div>
                            </div>
                        </div>
                        <a-menu-item><router-link to="/dashboard">หน้าเเรก</router-link></a-menu-item>
                        <a-menu-item><router-link to="/profile">ข้อมูลส่วนตัว</router-link></a-menu-item>
                        <a-menu-item><router-link to="/deposit-withdraw/deposit">รายการฝากเงิน</router-link></a-menu-item>
                        <a-menu-item><router-link to="/deposit-withdraw/withdraw">รายการถอนเงิน</router-link></a-menu-item>
                        <a-menu-item @click="logout">
                            <router-link to="/">
                                <span>ออกจากระบบ</span>
                            </router-link
                        ></a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </a-flex>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { getName, getPermission, logout } from '~/auth/authToken';

const visible = ref(false);
const name = getName();
const permission = getPermission();

const handleMenuClick = () => {
      visible.value = false;
      console.log("sssssssss");
      
    };

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

.profile {
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.dropdown-header {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.profile-info {
    margin-left: 10px;
}

.profile-name {
    font-weight: bold;
}

.profile-role {
    font-size: 12px;
    color: gray;
}

</style>
