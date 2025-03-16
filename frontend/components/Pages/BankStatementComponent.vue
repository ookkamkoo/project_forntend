<template>
  <a-modal v-model:open="open" title="รายละเอียด">
    <div style="white-space: pre-wrap; word-wrap: break-word; font-family: monospace;">
      {{ details }}
    </div>
  </a-modal>
  <a-row class="py-1" justify="start">
    <a-col class="p-1" :span="5">
      <!-- Bank Select -->
      <a-select
        ref="select"
        v-model:value="selectedBank"
        style="width: 100%"
        placeholder="กรุณาเลือกธนาคาร"
        @change="handleSelectChange"
      >
        <a-select-option value="">กรุณาเลือกธนาคาร</a-select-option>
        <a-select-option
          v-for="bank in dataShow"
          :key="bank.id"
          :value="bank.id"
        >
          <a-image
            :width="20"
            :preview="false"
            :src="bank.bank.image"
          />
          {{ bank.book_number }}
          {{ bank.name }}
        </a-select-option>
      </a-select>
    </a-col>
    <a-col class="p-1" :span="2">
      <a-button class="submit sky" type="primary" @click="searchBank">
        <SearchOutlined /> ค้นหา
      </a-button>
    </a-col>
    <a-col class="p-1 my-2" :span="24">
      <a-row >
        <div>
          <a-radio-group v-model:value="formData.dateSelect" @change="handleDateSelectChange">
            <a-radio-button value="Today">วันนี้</a-radio-button>
            <a-radio-button value="Yesterday">เมื่อวาน</a-radio-button>
            <a-radio-button value="ThisMonth">เดือนนี้</a-radio-button>
            <a-radio-button value="all">ทั้งหมด</a-radio-button>
          </a-radio-group>
        </div>
      </a-row>
    </a-col>
    <a-table 
      :columns="dynamicColumns" 
      :data-source="dataRecord" 
      :scroll="{ x: 1500, y: 700 }"
      bordered
      class="my-1"
      :pagination="paginationConfig"
      :loading="loading"
      @change="handleTableChange"
    >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key == 'type'">
          <a-tag color="cyan" v-if="record.type == 1 || record.type == 3">ฝาก</a-tag>
          <a-tag color="pink" v-else-if="record.type == 2">ถอน</a-tag>
      </template>
      <template v-if="column.key == 'channel'">
          <a-tag color="cyan" v-if="record.channel == 1"> Api</a-tag>
          <a-tag color="pink" v-else-if="record.channel == 2">Sms</a-tag>
          <a-tag color="orange" v-else-if="record.channel == 3">เพิ่มมือ</a-tag>
      </template>
      <template v-if="column.key == 'bank_system'">
          <a-image
            :width="32"
            :preview="false"
            :src="record.bank_system.image"
          />
      </template>
      <template v-if="column.key == 'bank_system_no'">
          {{record.bank_system_no}}
      </template>
      <template v-if="column.key == 'date_bank'">
        <div >{{ dayjs(record.date_bank).format('YYYY-MM-DD') }} <br> {{ dayjs(record.date_bank).format('HH:mm:ss') }}</div>
      </template>
      <template v-if="column.key == 'detail'">
        <a-button type="primary" class="sky" @click="showModal(record.detail)" ghost><MenuOutlined /></a-button>
      </template>
      <template v-if="column.key == 'created_at'">
        <div >{{ dayjs(record.created_at).format('YYYY-MM-DD') }} <br> {{ dayjs(record.created_at).format('HH:mm:ss') }}</div>
      </template>
    </template>
    </a-table>
  </a-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getSystemBankServices,getSystemBankByIdServices } from '~/services/bankServices';
import type { SelectValue } from 'ant-design-vue/es/select'; // Import correct type
import dayjs, { Dayjs } from 'dayjs';

const dataShow = ref<any[]>([]); // Bank list
const selectedBank = ref<SelectValue>(''); // Holds the selected bank's ID, with correct type
const bankSelect = ref<string>("");
const dataRecord = ref<any[]>([]);
const open = ref<boolean>(false);
const details = ref<string>("");
const loading = ref(false);


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
  

// Fetch bank data from API
const getSystemBank = async () => {
  const data = await getSystemBankServices();
  if (data.status === 'success') {
    dataShow.value = data.data.data; // Assuming API response has banks in 'data.data'
  }
};

const showModal = (detail: object) => {
  open.value = true;
  details.value = JSON.stringify(detail, null, 2);
};

const dynamicColumns = computed(() => {
    return [
    { title: 'ทั้งหมด 6 รายการ', children: [
      { title: 'รายการ', width:80, dataIndex: 'type', key: 'type' },
      { title: 'ช่องทาง', width:80, dataIndex: 'channel', key: 'channel' },
      { title: 'ยูสเชอร์', width: 150, dataIndex: 'username', key: 'name'},
      { title: 'ธนาคาร', width: 150, dataIndex: 'bank_system', key: 'bank_system'},
      { title: 'เลขบัญชี', width: 150, dataIndex: 'bank_system_no', key: 'bank_system_no'},
      { title: 'ยอดเงิน', dataIndex: 'amount', key: 'amount', width: 150 },
      { title: 'เวลาธนาคาร', dataIndex: 'date_bank', key: 'date_bank', width: 100 },
      { title: 'รายละเอียด', dataIndex: 'detail', key: 'detail', width: 150 },
      { title: 'เวลาสร้าง', dataIndex: 'created_at', key: 'created_at', width: 100 },
    ] },
    ];
  });
  

// Function called when a bank is selected
const handleSelectChange = (value: SelectValue, option: any) => {
  bankSelect.value = value as string;
};

// Example: Function to handle search button click
const searchBank = async () => {
  loading.value = true
  const data = await getSystemBankByIdServices(formData,bankSelect.value);
  if (data.status === 'success') {
    dataRecord.value = data.data.data;
    paginationConfig.value.total = data.data.recordsTotal;
  }
  loading.value = false
};

// Fetch banks on component mount
onMounted(() => {
  getSystemBank();
});

const paginationConfig = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `ทั้งหมด ${total} รายการ`,
});

const handleDateSelectChange = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    if(formData.dateSelect === "Today"){
      formData.dateStart = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
      formData.dateEnd = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    } else if(formData.dateSelect === "Yesterday"){
      const yesterday = new Date(currentDate);
      yesterday.setDate(currentDate.getDate() - 1);
      const day = String(yesterday.getDate()).padStart(2, '0');
      formData.dateStart = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
      formData.dateEnd = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    } else if(formData.dateSelect === "ThisMonth"){
      const firstDay = dayjs(`${year}-${month}-01`, 'YYYY-MM-DD');
      const lastDay = dayjs(firstDay).endOf('month');
      formData.dateStart = firstDay;
      formData.dateEnd = lastDay;
    }else if(formData.dateSelect === "all"){
      const firstDay = dayjs(`1999-01-01`, 'YYYY-MM-DD');
      const lastDay = dayjs(`9999-12-31`, 'YYYY-MM-DD');
      formData.dateStart = firstDay;
      formData.dateEnd = lastDay;
    }

    formData.timeStart = dayjs('00:00', 'HH:mm');
    formData.timeEnd = dayjs('23:59', 'HH:mm');
    searchBank();
};

const handleTableChange = (pagination: any) => {
  formData.page = pagination.current
  searchBank();
  console.log(pagination.pageSize);
  paginationConfig.value.current = pagination.current
  paginationConfig.value.pageSize = pagination.pageSize
};
</script>

