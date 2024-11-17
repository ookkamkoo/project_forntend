<template>
  <a-row class="p-2">
    <a-col :span="11">
      <a-row >
          <a-col class="p-1" :span="15">
          <label>เริ่มต้นวันที่</label>
          <a-date-picker v-model:value="formData.dateStart" />
          </a-col>
          <a-col class="p-1" :span="8">
              <label><br></label>
              <a-time-picker v-model:value="formData.timeStart" format="HH:mm" />
          </a-col>
      </a-row>
    </a-col>
    <a-col :span="11">
      <a-row>
          <a-col class="p-1" :span="15">
          <label>ถึงวันที่</label>
          <a-date-picker v-model:value="formData.dateEnd" />
          </a-col>
          <a-col class="p-1" :span="8">
          <label><br></label>
          <a-time-picker v-model:value="formData.timeEnd" format="HH:mm"/>
          </a-col>
      </a-row>
    </a-col>
    <a-col class="p-1" :span="2">
      <label><br></label>
      <a-button class="submit sky" type="primary"  @click="search"><SearchOutlined /> ค้นหา</a-button>
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
  <a-table 
    :columns="dynamicColumns"
    :data-source="dataShow"
    bordered
    size="small"
    :scroll="{ x: 1500, y: 700 }"
    :pagination="paginationConfig"
    :loading="loading"
    @change="handleTableChange"
  >
  <template #bodyCell="{ column, record }">
    <template v-if="column.key === 'bank_image'">
      <!-- <a-tag color="green" >สำเร็จ</a-tag> -->
      <a-image
              width="35px"
              :src="record.bank_image"
              :preview="false"
            />
    </template>
    <template v-if="column.key === 'deposit_count'">
      <div>{{ record.deposit_count }}</div>
    </template>
    <template v-if="column.key === 'deposit_failed_count'">
      <div>{{ record.deposit_failed_count }}</div>
    </template>
    <template v-if="column.key === 'deposit_count_all'">
      <div>{{ record.deposit_count + record.deposit_failed_count }}</div>
    </template>
    <template v-if="column.key === 'withdraw_count'">
      <div>{{ record.withdraw_count }}</div>
    </template>
    <template v-if="column.key === 'deposit_total'">
      <div>{{ Number(record.deposit_total).toFixed(2) }}</div>
    </template>
    <template v-if="column.key === 'deposit_failed_total'">
      <div>{{ Number(record.deposit_failed_total).toFixed(2) }}</div>
    </template>
    <template v-if="column.key === 'deposit_total_all'">
      <div>{{ Number(record.deposit_total + record.deposit_failed_total).toFixed(2) }}</div>
    </template>
    <template v-if="column.key === 'withdraw_total'">
      <div>{{ Number(record.withdraw_total).toFixed(2) }}</div>
    </template>
  </template>
</a-table>
  
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { getBankSummaryServices } from '~/services/bankServices';

const loading = ref(true);
const dataShow = ref<any[]>([]);
// const sumSummary = ref<any>({});
const allRecord = ref<number>(0);

const dynamicColumns = computed(() => [
  {  title: `ทั้งหมด ${allRecord.value} รายการ`, children: [
    { title: 'ธนาคาร', width:80, dataIndex: 'bank_image', key: 'bank_image' },
    { title: 'ชื่อ - นามสกุล', width:80, dataIndex: 'bank_system_name', key: 'bank_system_name' },
    { title: 'เลขบัญชี', width:80, dataIndex: 'bank_system_book_number', key: 'bank_system_book_number' },
    { title: 'จำนวนรายการ', width: 100,children: [
      { title: 'ฝากปกติ', width:80, dataIndex: 'deposit_count', key: 'deposit_count' },
      { title: 'ฝากไม่เข้า', width:80, dataIndex: 'deposit_failed_count', key: 'deposit_failed_count' },
      { title: 'ฝากรวม', width:80, dataIndex: 'deposit_count_all', key: 'deposit_count_all' },
      { title: 'ถอน', width:80, dataIndex: 'withdraw_count', key: 'withdraw_count' },
    ]},
    { title: 'จำนวนเงิน', width: 100,children: [
      { title: 'ฝากปกติ', width:80, dataIndex: 'deposit_total', key: 'deposit_total' },
      { title: 'ฝากไม่เข้า', width:80, dataIndex: 'deposit_failed_total', key: 'deposit_failed_total' },
      { title: 'ฝากรวม', width:80, dataIndex: 'deposit_total_all', key: 'deposit_total_all' },
      { title: 'ถอน', width:80, dataIndex: 'withdraw_total', key: 'withdraw_total' },
    ]},
  ] },
]);

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

  getBankSummary();
};

const getBankSummary = async() => {
  loading.value = true;
  const data = await getBankSummaryServices(formData);
  if (data.status === "success") {
    if(data.data != null){
      console.log("aaaaaaaaaaaa");
      
      dataShow.value = data.data.data;
      // sumSummary.value = data.data.sumReportSummary;
      allRecord.value = data.data.recordsTotal;
      paginationConfig.value.total = data.data.recordsTotal;
    }else{
      dataShow.value = [];
    }
  } else {
      console.log("error : "+ data.message);
  }
  loading.value = false;
}

const search = () =>{
  getBankSummary();
}

const paginationConfig = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `ทั้งหมด ${total} รายการ`,
});

const handleTableChange = (pagination: any) => {
  formData.page = pagination.current
  getBankSummary();
  console.log(pagination.pageSize);
  paginationConfig.value.current = pagination.current
  paginationConfig.value.pageSize = pagination.pageSize
};

onMounted(() => {
  getBankSummary();
});
</script>