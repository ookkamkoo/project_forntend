<template>
    <a-flex class="status-web">
        <!-- Button to close server -->
        <a-flex class="status-web-check" vertical>
            <a-button type="primary" size="small" class="m-auto danger" @click="showConfirm">ปิดเซิร์ฟ</a-button>
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
            <a-tag color="green" class="m-auto">{{store.memberOnline}} คน</a-tag>
        </a-flex>
        <a-flex class="status-web-check border-right p-rl-2 mobile-none" vertical>
            <div>เซิฟเวอร์</div>
            <a-tag v-if="store.setting.serverStatus" color="green" class="m-auto">เปิด</a-tag>
            <a-tag v-else color="red" class="m-auto">ปิด</a-tag>
        </a-flex>
        <a-flex class="status-web-check border-right p-rl-2 mobile-none" vertical>
            <div>ฝาก</div>
            <a-tag v-if="store.setting.depositStatus" color="green" class="m-auto">เปิด</a-tag>
            <a-tag v-else color="red" class="m-auto">ปิด</a-tag>
        </a-flex>
        <a-flex class="status-web-check border-right p-rl-2 mobile-none" vertical>
            <div>ถอน</div>
            <a-tag v-if="store.setting.depositStatus" color="green" class="m-auto">เปิด</a-tag>
            <a-tag v-else color="red" class="m-auto">ปิด</a-tag>
        </a-flex>
        <!-- <a-flex class="status-web-check border-right p-rl-2 menu-click mobile-none" vertical @click="depositClick('เว็บ')">
            <div>เว็บ</div>
            <a-tag color="green" class="m-auto">เปิด</a-tag>
        </a-flex> -->

        <div class="m-auto p-3">
            <a-dropdown v-model:open="visible" :trigger="['click']" class="profile">
                <a-badge>
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
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { getName, getPermission, logout } from '~/auth/authToken';
import { updateServerStatusServices } from '~/services/settingService';
import { Alert } from '../Alert/alertComponent';
import { notifyStore } from '~/store/index';
const store = notifyStore();

const visible = ref(false);
const name = getName();
const permission = getPermission();

const handleMenuClick = () => {
      visible.value = false;
      console.log("sssssssss");
      
    };

    const showConfirm = async() => {
  Modal.confirm({
    title: 'คุณต้องการจะปิดเซิฟเวอร์ใช่ไหม?',
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode('div', { style: 'color:red;' }, 'หากคุณทำการปิดระบบคุณจะไม่สามารถเปิดระบบเองได้ ต้องติดต่อทีมซัพพอร์ต'),
    
    // ห่อ onOk ด้วย async function
    onOk: async () => {
      try {
        const data = await updateServerStatusServices();
        if(data.status == "success"){
            Alert('success','แก้ไขการตั้งค่าเรียบร้อย');
        } else {
            Alert('error', data.message);
        }
      } catch (error) {
        console.error("Error updating server status:", error);
        Alert('error', 'เกิดข้อผิดพลาดในการอัปเดตสถานะเซิร์ฟเวอร์');
      }
    },
    
    onCancel() {
      console.log('Cancel');
    },
    class: 'test',
  });
};


</script>

<style lang="scss">
@use "sass:color";

.m-auto {
    margin: auto;
}
.danger {
    background-color: $danger;
    color: white;
}

.danger:hover {
    background-color: color.scale($danger, $lightness: -10%) !important;
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
.menu-click{
    cursor: pointer;
}

.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  h1 {
    font-size: 6rem;
    margin: 0;
    color: #000000; /* สีส้มแดง */
  }
  
  p {
    // font-size: 1.5rem;
    margin: 1rem 0;
  }
  
  .home-link {
    margin-top: 1.5rem;
    font-size: 1.2rem;
    color: #007bff; /* สีน้ำเงิน */
    text-decoration: none;
  }
  
  .home-link:hover {
    text-decoration: underline;
  }
</style>
