<template>
    <a-row class="p-1" justify="start">
      <a-col class="p-1" :span="5">
        <label>บัญชี</label>
        <a-select
          ref="select"
          v-model:value="banks"
          style="width: 100%"
        >
          <a-select-option value="">กรุณาเลือกธนาคาร</a-select-option>
          <a-select-option value="0">Jack</a-select-option>
          <a-select-option value="1">Lucy</a-select-option>
          <a-select-option value="2">yiminghe</a-select-option>
        </a-select>
      </a-col>
      <a-col class="p-1" :span="2">
        <label><br /></label>
        <a-button class="submit sky" type="primary"><SearchOutlined /> ค้นหา</a-button>
      </a-col>
    </a-row>
  
    <a-table 
      :columns="columns" 
      :data-source="data" 
      :scroll="{ x: 1500, y: 700 }"
      bordered
      :pagination="{ pageSize: 10 }"
    ></a-table>
  </template>
  
  <script lang="ts" setup>
  import type { TableColumnsType } from 'ant-design-vue';
  import { ref } from 'vue';
  
  const columns: TableColumnsType = [
    { title: 'ทั้งหมด 6 รายการ', children: [
      { title: 'ช่องทาง', width:80, dataIndex: 'name', key: 'name' },
      { title: 'ประเภท', width: 150, dataIndex: 'name', key: 'name', fixed: 'left' },
      { title: 'เวลาสลิป', dataIndex: 'address', key: '1', width: 100 },
      { title: 'ยอดเงิน', dataIndex: 'address', key: '1', width: 150 },
      { title: 'รายละเอียด', dataIndex: 'address', key: '1', width: 150 },
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
      address: `London Park no. ${i}`
    });
  }
  
  const banks = ref('');
  
  </script>