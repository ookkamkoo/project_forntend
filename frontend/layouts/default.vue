<template>
  <a-layout>
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="collapsed_togle"
      :zeroWidthTriggerStyle="{ width: '0px !important' }"
      collapsible
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
      :class="{ 'collapsed_togle': collapsed , 'sidebar': true}"
    >
      <LayoutSidebar @name-updated="handleNameUpdate"/>
    </a-layout-sider>
    <a-layout :class="{ 'collapsed': collapsed , 'set-layout': true}">
      <a-layout-header style="background: linear-gradient(88deg,#13b4ca,#18cabe); padding: 0">
        <a-flex :justify="'space-between'">
          <div>
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="toggleCollapsed" />
            <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />
          </div>
          <LayoutHeader/>
        </a-flex>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', minHeight: '280px' }" @click="handleLayoutClick">
          <h3>{{ selectName.name }}</h3>
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { NotificationPlacement } from 'ant-design-vue';
import { notifyStore } from '~/store/index';
const notify = notifyStore();

const collapsed = ref(false);
const collapsed_togle = ref<boolean | null>(false);
const selectName = ref({
  path:"/dashboard",
  name:"หน้าเเรก"
});

const { $socket } = useNuxtApp();
const socketRef = $socket as Ref<WebSocket | null>;
  
const audio = ref(new Audio(notify.setting.notifySoundWithdraw));
const isSoundEnabled = ref(true);

const playNotificationSound = () => {
  if (notify.setting.notifySoundWithdrawStatus == "false") {
    console.warn("เสียงยังไม่ได้รับการเปิดใช้งาน");
    return;
  }

  audio.value
    .play()
    .then(() => {
      console.log("เล่นเสียงสำเร็จ");
    })
    .catch((error) => {
      console.error("ไม่สามารถเล่นเสียงได้:", error);
    });
};

const openNotification = (placement: NotificationPlacement, message: string) => {
      notification.success({
        message: `เเจ้งเตือนรายการ ถอน`,
        description: message,
        placement,
      });
    };

const messageContent = ref('');


onMounted(() => {
  // if (socketRef.value) {
  //     socketRef.value.onmessage = (event: MessageEvent) => {
  //       try {
  //       // แปลงข้อความ JSON ที่ได้รับเป็น object
  //       const data = JSON.parse(event.data);
        
  //       // เก็บข้อมูลข้อความใน messageContent
  //       messageContent.value = data;
        
  //       console.log("ข้อความจากเซิร์ฟเวอร์:", data);
  //       console.log(data.status); // เข้าถึง status จาก object ที่แปลงแล้ว
        
  //       if (data.status === "success") {
  //         // เรียก openNotification และแปลง data.data เป็นสตริงหากจำเป็น
  //         playNotificationSound();
  //         openNotification('bottomRight', String(data.message));
  //         notify.notify = data.data
          
  //       }
  //     } catch (error) {
  //       console.error("Error parsing WebSocket message:", error);
  //     }
  //   };
  // } else {
  //   console.warn("WebSocket connection is not available.");
  // }

  if (window.innerWidth < 750) {
    collapsed.value = true;
    collapsed_togle.value = null;
  }
});

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
  if(collapsed.value){
      collapsed_togle.value = null;
    }else{
      collapsed_togle.value = false;
  }
};

const handleNameUpdate = (newName: { path: string; name: string }) => {
  console.log(newName);
  selectName.value = newName;
};

const handleLayoutClick = (event: Event) => {
  if(window.innerWidth < 750){
    if (!collapsed.value) {
      toggleCollapsed();
    }
  }
};

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
.sidebar{
  background-color: #ffffff !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1);
}
.collapsed{
  margin-left: 0px !important;
  transition: 'margin-left 0.2s'
}
.set-layout{
  margin-left: 250px;
}
.ant-layout-sider {
  z-index: 999;
}
.ant-layout-sider-trigger{
  width: 250px !important;
}
.collapsed_togle .ant-layout-sider-trigger{
  width: 0px !important;
}
.ant-select-item{
  margin: 0px !important;
}

@media screen and (max-width: 750px) {
  .collapsed{
    margin-left: 0 !important;
    z-index: 0;
  }
  .set-layout{
  margin-left: 0px !important;
}
}
</style>
