<template>
    <a-row class="p-2">
        <a-col :span="11">
        <a-row >
            <a-col class="p-1" :span="15">
            <label>เริ่มต้นวันที่</label>
            <a-date-picker v-model:value="dateStart" />
            </a-col>
            <a-col class="p-1" :span="8">
            <label><br></label>
            <a-time-picker v-model:value="timeStart" format="HH:mm" />
            </a-col>
        </a-row>
        </a-col>
        <a-col :span="11">
        <a-row>
            <a-col class="p-1" :span="15">
            <label>ถึงวันที่</label>
            <a-date-picker v-model:value="dateEnd" />
            </a-col>
            <a-col class="p-1" :span="8">
            <label><br></label>
            <a-time-picker v-model:value="timeEnd" format="HH:mm" />
            </a-col>
        </a-row>
        </a-col>
        <a-col class="p-1" :span="2">
            <label><br></label>
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
    <a-row class="p-2" justify="end">
        <div class="action m-2">
            <a-button class="submit sky" type="primary"><PlusOutlined /> เพิ่ม</a-button>
        </div>
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
    </a-row>
  </template>
  <script lang="ts" setup>
  import type { TableColumnsType } from 'ant-design-vue';
  import { ref } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  const columns: TableColumnsType = [
    { title: 'ทั้งหมด 3 รายการ', children: [
        { title: 'ID', width: 100, dataIndex: 'id', key: '0',  },
        { title: 'ช้อมูลการโยกเงิน', children:[
            { title: 'บัญชีต้นทาง',children:[
                { title: 'ธนาคาร', width: 100, dataIndex: 'name', key: 'name',  },
                { title: 'ชื่อบัญชี', width: 100, dataIndex: 'name', key: 'name',  },
                { title: 'เลขบัญชี', width: 100, dataIndex: 'name', key: 'name',  },
            ]  },
            { title: 'บัญชีปลายทาง',children:[
                { title: 'ธนาคาร', width: 100, dataIndex: 'name', key: 'name',  },
                { title: 'ชื่อบัญชี', width: 100, dataIndex: 'name', key: 'name',  },
                { title: 'เลขบัญชี', width: 100, dataIndex: 'name', key: 'name',  },
            ]  },
        ]  },
        { title: 'เมื่อเงินมีมากกว่า', width: 100, dataIndex: 'name', key: 'name',  },
        { title: 'โยกเป็นจำนวนเงิน', width: 100, dataIndex: 'age', key: 'age' },
        { title: 'สถานะ', dataIndex: 'address', key: '1', width: 150 },
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
const dateSelect = ref<string>('Today');

</script>