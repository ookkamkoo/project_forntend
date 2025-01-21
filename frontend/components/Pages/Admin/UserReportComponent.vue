<template>
    <a-row class="p-2">
        <a-col :span="24" :md="10" :lg="11">
        <a-row >
            <a-col class="p-1" :span="15">
            <label>เริ่มต้นวันที่</label>
            <a-date-picker v-model:value="formData.dateStart" />
            </a-col>
            <a-col class="p-1" :span="9">
            <label><br></label>
            <a-time-picker v-model:value="formData.timeStart" format="HH:mm" />
            </a-col>
        </a-row>
        </a-col>
        <a-col :span="24" :md="10" :lg="11">
        <a-row>
            <a-col class="p-1" :span="15">
            <label>ถึงวันที่</label>
            <a-date-picker v-model:value="formData.dateEnd" />
            </a-col>
            <a-col class="p-1" :span="9">
            <label><br></label>
            <a-time-picker v-model:value="formData.timeEnd" format="HH:mm" />
            </a-col>
        </a-row>
        </a-col>
        <a-col class="p-1" :span="24" :md="4" :lg="2">
        <label><br></label>
        <a-button class="submit sky" type="primary" @click="search"><SearchOutlined /> ค้นหา</a-button>
        </a-col>
  </a-row>
  <a-row class="p-3">
      <div>
      <a-radio-group v-model:value="formData.dateSelect" @change="handleDateSelectChange">
          <a-radio-button value="Today">วันนี้</a-radio-button>
          <a-radio-button value="Yesterday">เมื่อวาน</a-radio-button>
          <a-radio-button value="ThisMonth">เดือนนี้</a-radio-button>
          <a-radio-button value="LastMonth">เดือนที่เเล้ว</a-radio-button>
      </a-radio-group>
      </div>
  </a-row>
    <div>
        <a-modal v-model:open="openPermission" width="1000px" title="อัปเดตสิทธิ์เข้าถึง" @ok="">
            <OtherPermission :closePermission="closePermission" :permissionId="permissionId"/>
            <template #footer>
              </template>
        </a-modal>
    </div>
    <a-table 
    :columns="dynamicColumns" 
    :data-source="dataForm" 
    :scroll="{ x: 1500, y: 700 }"
    bordered
    :pagination="{ pageSize: 10 }"
    :loading="loading"
    >
      <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'id'">
              <div>{{ index + 1 }}</div>
          </template>
          <template v-else-if="column.key === 'name'">
              <div>{{ record.name }}</div>
          </template>
      </template>
    </a-table>
  </template>
  
<script lang="ts" setup>
import { ref,createVNode  } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { getUserReportServices } from '~/services/userServices';
import { Alert } from '../../Alert/alertComponent';

const open = ref<boolean>(false);
const openPermission = ref<boolean>(false);
const active = ref<boolean>(true);
const dataForm = ref<any[]>([]);
const editData = ref<any>();
const permissionId = ref<number>(0);
const loading = ref(true);
const allRecord = ref<number>(0);

const dynamicColumns = computed(() => {
  return [
    { 
      title: `ทั้งหมด ${allRecord.value} รายการ`, 
      children: [
        // { title: 'ID', width: 80, dataIndex: 'id', key: 'id' },
        { title: 'ชื่อ', width: 80, dataIndex: 'created_by_name', key: 'created_by_name' },
        { title: 'ฝากเงิน(เเก้ไขเครดิต)', width: 100, children:[
            { title: 'จำนวน', width: 80, dataIndex: 'amount_deposit', key: 'amount_deposit' },
            { title: 'รายการ', width: 80, dataIndex: 'count_deposit', key: 'count_deposit' },
        ]},
        { title: 'ถอนเงิน', width: 100, children:[
            { title: 'จำนวน', width: 80, dataIndex: 'amount_withdraw', key: 'amount_withdraw' },
            { title: 'รายการ', width: 80, dataIndex: 'count_withdraw', key: 'count_withdraw' },
        ]},
        { title: 'เพิ่มเครดิต', width: 100, children:[
            { title: 'จำนวน', width: 80, dataIndex: 'amount_add', key: 'amount_add' },
            { title: 'รายการ', width: 80, dataIndex: 'count_add', key: 'count_add' },
        ]},
        { title: 'ถอนเครดิต', width: 100, children:[
            { title: 'จำนวน', width: 80, dataIndex: 'amount_remove', key: 'amount_remove' },
            { title: 'รายการ', width: 80, dataIndex: 'count_remove', key: 'count_remove' },
        ]},
        ] 
    },
  ];
});

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

let formData = reactive({
  timeStart:ref(dayjs('00:00:00', 'HH:mm:ss')),
  timeEnd:ref(dayjs('23:59:59', 'HH:mm:ss')),
  dateStart:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
  dateEnd:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
  dateSelect:ref<string>('Today'),
  page:ref<number>(1),
  pageSize:ref<number>(10),
});

const closePermission = () => {
    openPermission.value = false;
};

const search = () =>{
  getUserReport();
}

const handleDateSelectChange = () => {
  const currentDate = dayjs();  // Use dayjs for consistency
  const day = String(currentDate.date()).padStart(2, '0');
  const year = currentDate.year();
  const month = String(currentDate.month() + 1).padStart(2, '0');

  if (formData.dateSelect === "Today") {
      formData.dateStart = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
      formData.dateEnd = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
  } else if (formData.dateSelect === "Yesterday") {
      const yesterday = currentDate.subtract(1, 'day');
      formData.dateStart = yesterday.startOf('day');
      formData.dateEnd = yesterday.endOf('day');
  } else if (formData.dateSelect === "ThisMonth") {
      const firstDay = dayjs(`${year}-${month}-01`, 'YYYY-MM-DD');
      const lastDay = firstDay.endOf('month');
      formData.dateStart = firstDay.startOf('day');
      formData.dateEnd = lastDay.endOf('day');
  } else if (formData.dateSelect === "LastMonth") {
      const firstDay = currentDate.subtract(1, 'month').startOf('month');
      const lastDay = firstDay.endOf('month');
      formData.dateStart = firstDay.startOf('day');
      formData.dateEnd = lastDay.endOf('day');
  }

  formData.timeStart = dayjs().startOf('day'); // 00:00
  formData.timeEnd = dayjs().endOf('day');     // 23:59

  getUserReport();
};


const paginationConfig = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `ทั้งหมด ${total} รายการ`,
});

const handleTableChange = (pagination: any) => {
  formData.page = pagination.current
  getUserReport();
  console.log(pagination.pageSize);
  paginationConfig.value.current = pagination.current
  paginationConfig.value.pageSize = pagination.pageSize
};

const getUserReport = async () => {
    loading.value = true;
    const data = await getUserReportServices(formData);
    if (data.status === "success") {
        if(data.data.data != null){
            dataForm.value = data.data.data;
            allRecord.value = data.data.data.length;
        }
    } else {
        Alert('error', data.message);
    }
    loading.value = false;
};

onMounted(() => {
    getUserReport();
});
</script>