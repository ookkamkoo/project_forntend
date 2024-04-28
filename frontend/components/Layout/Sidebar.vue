<template>
  <div class="layout-logo">
      <img src="https://betflix24hours.imember.cc/img/websetting/1680175806.png" alt="AdminLTE Logo" width="50%">
  </div>
  <div class="sidebar-layout">
    <div class="sidebar-list">
        <div class="sidebar-lists">
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
            <template v-for="(item, index) in sidebarData" :key="index">
              <template v-if="!item.children">
                  <a-menu-item :key="'menu-item-' + index" @click="handleMenuItemClick(item)">
                  <component :is="item.icon" :style="{ margin: '0 10px' }" />
                  <router-link :to="item.path">
                      <span>{{ item.name }}</span>
                  </router-link>
                  <span class="new" v-if="item.notify !== 0">
                    <span class="badge padding-1 ">
                      {{item.notify}}
                    </span>
                  </span>
                  </a-menu-item>
              </template>
              <template v-else>
                  <a-sub-menu :key="'sub-menu-' + index">
                  <template #title>
                      <component :is="item.icon" :style="{ margin: '0 10px' }" />
                      <span class="sub-link">{{ item.name }}</span>
                  </template>
                  <template v-for="(child, childIndex) in item.children" :key="child.path">
                      <a-menu-item @click="handleMenuItemClick(child)">
                      <component :is="child.icon" :style="{ margin: '0 10px' }" />
                      <router-link :to="child.path">
                          <span>{{ child.name }}</span>
                      </router-link>
                      <span class="new" v-if="child.notify !== 0">
                        <span class="badge padding-1 ">
                          {{child.notify}}
                        </span>
                      </span>
                      </a-menu-item>
                  </template>
                  </a-sub-menu>
              </template>
            </template>
            <a-menu-item key="25" @click="logout">
              <LogoutOutlined :style="{ margin: '0 10px' }" />
              <router-link to="/">
                  <span>ออกจากระบบ</span>
              </router-link>
            </a-menu-item>
        </a-menu>
        </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import sidebarData from '@/data/sidebarData.js';


  interface SidebarItem {
  path: string;
  name: string;
}


const selectedKeys = ref<string[]>(['1']);


const logout = () => {
  // const router = useRouter();
  localStorage.removeItem('token');
  // window.location.reload();
};

const emits = defineEmits<{
  (event: 'name-updated', item: SidebarItem): void;
}>();

const handleMenuItemClick = (item: SidebarItem) => {
  // console.log(item);
  
  emits('name-updated', item);
};
</script>

<style>
.site-layout .site-layout-background {
  background: #fff;
  transition: margin-left 0.3s;
}
.layout-logo{
  text-align: center;
}
.ant-layout-sider{
    max-width: 250px !important;
    min-width: 250px !important;
    width: 250px !important;
}
.ant-layout-sider-collapsed{
  flex: 0 0 0px !important;
  max-width: 0px !important;
  min-width: 0px !important;
  width: 0px !important;
  margin-left: 0 !important;
}
.sidebar-layout{
  height: 90vh;
  overflow-x: hidden;
  overflow-y: initial;
  padding: 0 0 0 0.5rem;
  scrollbar-color: #a9a9a9 transparent;
}
.sidebar-list{
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none;
}
.sidebar-list:hover{
  scrollbar-width: thin;
}
.ant-menu-item,.ant-menu-submenu-title{
  padding-left:5px !important;
}
.ant-menu-sub .ant-menu-item{
  padding-left:20px !important;
}
.sidebar-lists{
  width: 230px;
}
.trigger{
  font-size: 20px;
  margin-left: 15px;
  color: whitesmoke;
}
.sub-link{
  margin: 0 !important;
}
.status-web div{
  line-height: 20px;
  text-align: center;
}
.status-web-check{
  padding: 5px;
  margin: 4px 0;
  box-sizing: border-box;
}
.border-right{
  border-right: 1px solid white;
}
.new {
  float: right;
}
.ant-layout-sider-trigger{
  background: linear-gradient(88deg,#13b4ca,#18cabe) !important;
}
</style>