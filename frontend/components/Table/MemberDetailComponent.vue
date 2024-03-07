<template>
  <a-row class="p-1" justify="start">
    <a-col class="p-1" :span="5">
      <label>ยูสเซอร์เนม</label>
      <a-input v-model:value="username" placeholder="username" />
    </a-col>
    <a-col class="p-1" :span="2">
      <label><br /></label>
      <a-button class="submit sky" type="primary"><SearchOutlined /> ค้นหา</a-button>
    </a-col>
  </a-row>
  <a-collapse
    v-model:activeKey="activeKey"
    :bordered="false"
    style="background: rgb(255, 255, 255)"
  >
    <a-collapse-panel key="1" header="เช็คข้อมูลลูกค้า" :style="customStyle">
      <a-table 
        :columns="columns" 
        :data-source="data" 
        :scroll="{ x: 1500, y: 700 }"
        bordered
        :pagination="{ pageSize: 10 }"
      ></a-table>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="รายการฝากเงินทั้งหมด 10 รายการ" :style="customStyle">
      <a-table 
        :columns="columns" 
        :data-source="data" 
        :scroll="{ x: 1500, y: 700 }"
        bordered
        :pagination="{ pageSize: 10 }"
      ></a-table>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="รายการถอนเงินทั้งหมด 10 รายการ" :style="customStyle">
      <a-table 
        :columns="columns" 
        :data-source="data" 
        :scroll="{ x: 1500, y: 700 }"
        bordered
        :pagination="{ pageSize: 10 }"
      ></a-table>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="ประวัติการทำรายการลูกค้า" :style="customStyle">
      <a-table 
        :columns="columns" 
        :data-source="data" 
        :scroll="{ x: 1500, y: 700 }"
        bordered
        :pagination="{ pageSize: 10 }"
      ></a-table>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue';
import { ref } from 'vue';

const columns: TableColumnsType = [
  { title: 'ทั้งหมด 6 รายการ', children: [
    { title: 'No', width:80, dataIndex: 'name', key: 'name' },
    { title: 'ยูสเซอร์เนม', width: 150, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: 'ธนาคาร', dataIndex: 'address', key: '1', width: 100 },
    { title: 'เลขบัญชี', dataIndex: 'address', key: '1', width: 150 },
    { title: 'ชื่อนามสกุล', dataIndex: 'address', key: '1', width: 150 },
    { title: 'เครดิต', width: 100, dataIndex: 'age', key: 'age',children: [
      { title: 'ยอดเงิน', dataIndex: 'address', key: '1', width: 100 },
      { title: 'ก่อนหน้า', dataIndex: 'address', key: '1', width: 100 },
      { title: 'หลัง', dataIndex: 'address', key: '1', width: 100 },
    ] },
    { title: 'โปรโมชั่น', dataIndex: 'address', key: '1', width: 150 },
    { title: 'วันที่', dataIndex: 'address', key: '1', width: 150 },
    { title: 'เพิ่มเติม', dataIndex: 'address', key: '2', width: 150 },
    { title: 'โดย', dataIndex: 'address', key: '3', width: 100 },
  ] },
];

interface DataItem {
  id: number;
  key: number;
  name: string;
  age: number;
  address: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    id: i+1,
    key: i,
    name: `cbf00018${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const username = ref<string>('');
const activeKey = ref(['1']);
const customStyle = 'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';
</script>