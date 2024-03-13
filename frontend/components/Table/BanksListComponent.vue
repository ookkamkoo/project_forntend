<template>
  <a-row class="p-2" justify="end">
    <a-col class="p-1">
      <label><br></label>
      <a-button class="submit sky" type="primary"><PlusOutlined /> เพิ่ม</a-button>
    </a-col>
  </a-row>
  <a-table 
    :columns="columns" 
    :data-source="data" 
    :scroll="{ x: 1500, y: 700 }"
    bordered
    :pagination="{ pageSize: 10 }"
  >
  <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
              <a-flex gap="small" :justify="'center'" horizontal>
                  <a-button class="warning" type="primary"><FormOutlined /></a-button>
                  <a-button class="danger" type="primary"><DeleteOutlined /></a-button>
              </a-flex>
          </template>
      </template>
  </a-table>
</template>

<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue';
import { ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

const columns: TableColumnsType = [
  { title: 'ทั้งหมด 6 รายการ', children: [
    { title: 'ประเภท', width:80, dataIndex: 'name', key: 'name' },
    { title: 'สถานะ', width: 150, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: 'ธนาคาร', dataIndex: 'address', key: '1', width: 100 },
    { title: 'ชื่อนามสกุล', dataIndex: 'address', key: '1', width: 150 },
    { title: 'เลขบัญชี', dataIndex: 'address', key: '1', width: 150 },
    { title: 'sms', dataIndex: 'address', key: '1', width: 150 },
    { title: 'ยอดคงเหลือ', dataIndex: 'address', key: '1', width: 150 },
    {
            title: 'แก้ไข/ลบ',
            key: 'operation',
            fixed: 'right',
            width: 100,
        }
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

</script>