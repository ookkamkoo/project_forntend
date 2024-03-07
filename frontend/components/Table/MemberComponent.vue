<template>
    <a-row class="p-2">
        <a-col class="p-1" :span="8">
            <lebel>ประเภท</lebel>
            <a-select
                ref="select"
                v-model:value="sl_type"
                style="width: 100%"
                >
                <a-select-option value="all">ทั้งหมด</a-select-option>
                <a-select-option value="1">มียอดฝาก</a-select-option>
                <a-select-option value="2">ไม่มียอดฝาก</a-select-option>
                <a-select-option value="3">พันธมิตร</a-select-option>
                <a-select-option value="4">กำลังใช้งาน</a-select-option>
            </a-select>
        </a-col>
        <a-col class="p-1" :span="8">
        <lebel>ค้นหาด้วย</lebel>
        <a-select
                ref="select"
                v-model:value="sl_search"
                style="width: 100%"
                >
                <a-select-option value="0">ยูสเซอร์เนม</a-select-option>
                <a-select-option value="1">เบอร์มือถือ</a-select-option>
                <a-select-option value="2">หมายเลขบัญชี</a-select-option>
                <a-select-option value="3">ชื่อ</a-select-option>
                <a-select-option value="4">นามสกุล</a-select-option>
            </a-select>
        </a-col>
        <a-col class="p-1" :span="8">
        <lebel>ข้อมูลที่ต้องการค้นหา</lebel>
        <a-input v-model:value="amount" />
        </a-col>
    </a-row>
    <a-row class="p-2">
        <a-col class="p-1" :span="8">
            <lebel>เลขบัญชีตามรายการที่ค้างหน้าหลัก</lebel>
            <a-input v-model:value="find_bank_no" />
        </a-col>
        <a-col class="p-1" :span="8">
        <lebel>ธนาคาร</lebel>
            <a-select
                ref="select"
                v-model:value="bank"
                style="width: 100%"
                placeholder="กรุณาเลือก"
                >
                <a-select-option value="0">ยูสเซอร์เนม</a-select-option>
                <a-select-option value="1">เบอร์มือถือ</a-select-option>
                <a-select-option value="2">หมายเลขบัญชี</a-select-option>
                <a-select-option value="3">ชื่อ</a-select-option>
                <a-select-option value="4">นามสกุล</a-select-option>
            </a-select>
        </a-col>
        <a-col class="p-1" :span="8">
        <lebel>ช่องทางเข้าการถึง</lebel>
            <a-select
                ref="select"
                v-model:value="bank"
                style="width: 100%"
                placeholder="กรุณาเลือก"
                >
                <a-select-option value="0">ยูสเซอร์เนม</a-select-option>
                <a-select-option value="1">เบอร์มือถือ</a-select-option>
                <a-select-option value="2">หมายเลขบัญชี</a-select-option>
                <a-select-option value="3">ชื่อ</a-select-option>
                <a-select-option value="4">นามสกุล</a-select-option>
            </a-select>
        </a-col>
    </a-row>
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
const sl_type = ref<string>('all');
const sl_search = ref<string>('0');
const find_bank_no = ref<string>('');
const bank = ref<string>('');
const amount = ref<string>('');
const dateSelect = ref<string>('Today');

</script>