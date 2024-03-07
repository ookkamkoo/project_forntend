<template>
    <a-table 
        :columns="columns"
        :data-source="data"
        bordered
        size="small"
        :scroll="{ x: 1500, y: 700 }"
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
      { title: 'สถานะ', width: 100, dataIndex: 'name', key: 'name',  },
      { title: 'ชื่อ', width: 100, dataIndex: 'name', key: 'name',  },
      { title: 'รูป', width: 100, dataIndex: 'name', key: 'name',  },
      { title: 'ประเภท', width: 100, dataIndex: 'name', key: 'name',  },
      { title: 'รายละเอียด', width: 100, dataIndex: 'name', key: 'name',  },
      { title: 'เงื่อนไข', width: 100, dataIndex: 'age', key: 'age' },
      { title: 'วันที่', width: 100, dataIndex: 'age', key: 'age' },
      {
            title: 'แก้ไข/ลบ',
            key: 'operation',
            fixed: 'right',
            width: 100,
        }
    ]},
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
const day = String(currentDate.getDate()).padStart(2, '0');

const timeStart = ref(dayjs('00:00', 'HH:mm'));
const timeEnd= ref(dayjs('23:59', 'HH:mm'));
const dateStart = ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD'));
const dateEnd = ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD'));

</script>