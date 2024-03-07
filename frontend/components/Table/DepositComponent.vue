<template>
  <a-table 
      :columns="columns" 
      :data-source="data" 
      :scroll="{ x: 1500, y: 700 }"
      :pagination="{ pageSize: 10 }"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a-flex gap="small" horizontal>
          <a-button type="primary" class="sky"><CheckOutlined /></a-button>
          <a-button type="primary" class="danger"><CloseOutlined /></a-button>
        </a-flex>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue';
const columns: TableColumnsType = [
  { title: 'ทั้งหมด 6 รายการ',children: [
    { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
    { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
    { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
    { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
    { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
    { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
    { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
    { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
    },
  ]},
];

interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
</script>