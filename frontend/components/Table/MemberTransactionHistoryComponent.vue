<template class="search">
    <a-row class="p-2" justify="end">
      <a-col class="p-1" :span="5">
        <label>ยูสเซอร์เนม</label>
        <a-input v-model:value="username" placeholder="username" />
      </a-col>
      <a-col class="p-1" :span="5">
        <label>ยอดเงิน</label>
        <a-date-picker v-model:value="sl_year" picker="month" />
      </a-col>
      <a-col class="p-1" :span="2">
        <label><br></label>
        <a-button class="submit sky" type="primary"><SearchOutlined /> ค้นหา</a-button>
      </a-col>
    </a-row>
    <div>
      <a-table 
          :columns="columns" 
          :data-source="data" 
          :scroll="{ x: 1500, y: 600 }"
          bordered
          :pagination="{ pageSize: 10 }"
      >
      </a-table>
    </div>
  </template>
  <script lang="ts" setup>
  import type { TableColumnsType } from 'ant-design-vue';
  import { ref } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  
  
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
  
  
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  
  const sl_year= ref<Dayjs>(dayjs(`${year}-${month}`, 'YYYY/MM'));
  const username = ref<string>('');
  
  
  </script>