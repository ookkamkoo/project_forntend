<template>
  <a-row class="p-2">
    <a-col :span="11">
      <a-row >
          <a-col class="p-1" :span="15">
          <lebel>เริ่มต้นวันที่</lebel>
          <a-date-picker v-model:value="dateStart" />
          </a-col>
          <a-col class="p-1" :span="8">
          <lebel><br></lebel>
          <a-time-picker v-model:value="timeStart" format="HH:mm" />
          </a-col>
      </a-row>
    </a-col>
    <a-col :span="11">
      <a-row>
          <a-col class="p-1" :span="15">
          <lebel>ถึงวันที่</lebel>
          <a-date-picker v-model:value="dateEnd" />
          </a-col>
          <a-col class="p-1" :span="8">
          <lebel><br></lebel>
          <a-time-picker v-model:value="timeEnd" format="HH:mm" />
          </a-col>
      </a-row>
    </a-col>
    <a-col class="p-1" :span="2">
      <lebel><br></lebel>
      <a-button class="submit sky" type="primary"><SearchOutlined /> ค้นหา</a-button>
    </a-col>
  </a-row>
  <a-row class="p-2">
      <div>
      <a-radio-group v-model:value="dateSelect">
          <a-radio-button value="Today">วันนี้</a-radio-button>
          <a-radio-button value="Yesterday">เมื่อวาน</a-radio-button>
          <a-radio-button value="ThisMonth">เดือนนี้</a-radio-button>
      </a-radio-group>
      </div>
  </a-row>
  <a-table 
      :columns="columns" 
      :data-source="data"
      bordered
      :scroll="{ x: 1500, y: 700 }"
      :pagination="{ pageSize: 10 }"
  >
  </a-table>
</template>
<script lang="ts" setup>
  import type { TableColumnsType } from 'ant-design-vue';
  import { ref } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  const columns: TableColumnsType = [
    { title: 'ทั้งหมด 6 รายการ', children: [
      { title: 'ลำดับ', width: 100, dataIndex: 'id', key: '0', fixed: 'left' },
      { title: 'Username', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
      { title: 'Amount', width: 100, dataIndex: 'age', key: 'age' },
      { title: 'วันที่เริ่มต้น', dataIndex: 'address', key: '1', width: 150 },
      { title: 'ถึงวันที่', dataIndex: 'address', key: '2', width: 150 },
      { title: 'สร้างเมื่อ', dataIndex: 'address', key: '3', width: 150 },
      { title: 'เติมเงินเมื่อ', dataIndex: 'address', key: '4', width: 150 },
      { title: 'เหตุผล', dataIndex: 'address', key: '5', width: 150 },
      { title: 'สถานะ', dataIndex: 'address', key: '6', width: 150 },
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
  const dateSelect = ref<string>('Today');

</script>