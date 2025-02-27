<template>
  <a-row class="p-2">
      <a-col class="p-1" :span="4">
        <label>ประเภท</label>
        <a-select
            ref="select"
            v-model:value="formData.sl_type"
            style="width: 100%"
            >
            <a-select-option value="all">ทั้งหมด</a-select-option>
            <a-select-option value="1">รอทำรายการ</a-select-option>
            <a-select-option value="2">สำเร็จ</a-select-option>
            <a-select-option value="3">ยกเลิก</a-select-option>
            <a-select-option value="4">หมดเวลา</a-select-option>
        </a-select>
      </a-col>
      <a-col class="p-1" :span="4">
        <label>รายการฝาก</label>
        <a-select
            ref="select"
            v-model:value="formData.de_type"
            style="width: 100%"
            >
            <a-select-option value="all">ทั้งหมด</a-select-option>
            <a-select-option value="1">ฝากเเรก</a-select-option>
            <a-select-option value="2">ฝากปกติ</a-select-option>
        </a-select>
      </a-col>
      <a-col class="p-1" :span="5">
        <label>ยูสเซอร์เนม</label>
        <a-input v-model:value="formData.username" placeholder="username" />
      </a-col>
      <a-col class="p-1" :span="5">
        <label>ทำรายการโดย</label>
        <a-input v-model:value="formData.adminName" placeholder="name" />
      </a-col>
      <a-col class="p-1" :span="6">
        <label>ยอดเงิน</label>
        <a-input v-model:value="formData.amount" placeholder="amount" />
      </a-col>
    </a-row>
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
    <a-row class="p-2">
      <div>
        <a-radio-group v-model:value="formData.dateSelect" @change="handleDateSelectChange">
          <a-radio-button value="Today">วันนี้</a-radio-button>
          <a-radio-button value="Yesterday">เมื่อวาน</a-radio-button>
          <a-radio-button value="ThisMonth">เดือนนี้</a-radio-button>
          <a-radio-button value="all">ทั้งหมด</a-radio-button>
        </a-radio-group>
      </div>
    </a-row>
  <a-table 
    :columns="dynamicColumns"
    :data-source="dataShow"
    bordered
    :scroll="{ x: 1500, y: 700 }"
    :pagination="paginationConfig"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'id'">
        <div>{{ record.id }}</div>
      </template>
      <template v-if="column.key === 'username'">
        <div>{{ record.username }}</div>
      </template>
      <template v-if="column.key === 'amount_before'">
        <div>{{ record.amount_before }}</div>
      </template>
      <template v-if="column.key === 'amount'">
        <div>{{ record.amount }}</div>
      </template>
      <template v-if="column.key === 'amount_after'">
        <div>{{ record.amount_after }}</div>
      </template>
      <template v-if="column.key === 'bank'">
        <a-image
          width="35px"
          :src="record.bank.image"
          :preview="false"
           v-if="record.bank.image != ''"
        />
        <div v-else> - </div>
      </template>
      <template v-if="column.key === 'bank_no'">
        <div v-if="record.bank_no != ''">{{ record.bank_no }}</div>
        <div v-else> - </div>
      </template>
      <template v-if="column.key === 'bankSystem'">
        <a-image
          width="35px"
          :src="record.bank_system.image"
          :preview="false"
           v-if="record.bank_system.image != ''"
        />
        <div v-else> - </div>
      </template>
      <template v-if="column.key === 'bank_noSystem'">
        <div v-if="record.bank_system_no != ''">{{ record.bank_system_no }}</div>
        <div v-else> - </div>
      </template>
      <template v-if="column.key === 'image'">
        <a-button type="primary" ghost :disabled="record.image==''"><ScanOutlined /></a-button>
      </template>
      <template v-if="column.key === 'remark'">
        <div>{{ record.remark }}</div>
      </template>
      <template v-if="column.key === 'is_first_deposit'">
        <a-tag color="green" v-if="record.is_first_deposit">ฝากเเรก</a-tag>
        <a-tag color="blue" v-else>ฝากปกติ</a-tag>
      </template>
      <template v-if="column.key === 'status'">
        <a-tag color="orange" v-if="record.status == 1">รอทำรายการ</a-tag>
        <a-tag color="green" v-else-if="record.status == 2">สำเร็จ</a-tag>
        <a-tag color="red" v-else-if="record.status == 3">ยกเลิก</a-tag>
        <a-tag color="red" v-else-if="record.status == 4">หมดเวลา</a-tag>
        <a-tag color="orange" v-else-if="record.status == 7">กำลังประมวลผล</a-tag>
        <a-tag color="red" v-else-if="record.status == 8">ถูกยกเลิก</a-tag>
      </template>
      <template v-if="column.key === 'updated_by'">
        <div v-if="record.UpdatedBySearch.id != 0">{{ record.UpdatedBySearch.username }}</div>
        <div v-else> - </div>
      </template>
      <template v-else-if="column.key === 'created_at'">
        <div >{{ dayjs(record.created_at).format('YYYY-MM-DD') }} <br> {{ dayjs(record.created_at).format('HH:mm:ss') }}</div>
      </template>
      <template v-if="column.key === 'operation'">
        <a-flex gap="small" horizontal :justify="'center'">
          <a-button type="primary" class="sky"><CheckOutlined /></a-button>
          <a-button type="primary" class="danger" danger ghost ><CloseOutlined /></a-button>
        </a-flex>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { getDepositServices } from '~/services/memberServices';

const dataShow = ref<any[]>([]);
const allRecord = ref<number>(0);
const loading = ref(true);


const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

let formData = reactive({
    timeStart:ref(dayjs('00:00', 'HH:mm')),
    timeEnd:ref(dayjs('23:59', 'HH:mm')),
    dateStart:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
    dateEnd:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
    username:ref<string>(''),
    adminName:ref<string>(''),
    amount:ref<string>(''),
    dateSelect:ref<string>('Today'),
    sl_type:"all",
    de_type:"all",
    page:ref<number>(1),
    pageSize:ref<number>(10),
  });

const getList = async() => {
  loading.value = true;
  const data = await getDepositServices(formData);
    if (data.status === "success") {
      allRecord.value = data.data.recordsTotal;
      dataShow.value = data.data.data;
      paginationConfig.value.total = data.data.recordsTotal;
  }
  loading.value = false;
}

onMounted(() => {
  getList();
});

const dynamicColumns = computed(() => {
  return [
    { 
      title: `ทั้งหมด ${allRecord.value} รายการ`, 

      children: [
        { title: '#', width: 60, dataIndex: 'id', key: 'id' },
        { title: 'ยูสเซอร์เนม', width: 100, dataIndex: 'username', key: 'username' },
        { title: 'บัญชีลูกค้า', width: 100, children: [
          { title: 'ธนาคาร', dataIndex: 'bank', key: 'bank', width: 60 },
          { title: 'เลขบัญชี', dataIndex: 'bank_no', key: 'bank_no', width: 80 },
        ] },
        { title: 'บัญชีระบบ', width: 100, children: [
          { title: 'ธนาคาร', dataIndex: 'bankSystem', key: 'bankSystem', width: 60 },
          { title: 'เลขบัญชี', dataIndex: 'bank_noSystem', key: 'bank_noSystem', width: 80 },
        ] },
        { title: 'เครดิต', width: 100, children: [
          { title: 'ยอดเงิน', dataIndex: 'amount', key: 'amount', width: 70 },
          { title: 'โบนัส', dataIndex: 'bonus', key: 'bonus', width: 70 },
          { title: 'vat', dataIndex: 'vat', key: 'vat', width: 70 },
          { title: 'รวม', dataIndex: 'amount_total', key: 'amount_total', width: 70 },
          { title: 'เครดิตก่อนหน้า', dataIndex: 'amount_before', key: 'amount_before', width: 70 },
          { title: 'เครดิตหลัง', dataIndex: 'amount_after', key: 'amount_after', width: 70 },
        ] },
        { title: 'รูปสลิป', dataIndex: 'image', key: 'image', width: 80 },
        // { title: 'โปรโมชั่น', dataIndex: 'promotion', key: 'promotion', width: 200 },
        { title: 'โดย', dataIndex: 'updated_by_name', key: 'updated_by_name', width: 80 },
        { title: 'รายการ', dataIndex: 'is_first_deposit', key: 'is_first_deposit', width: 80 },
        { title: 'สถานะ', dataIndex: 'status', key: 'status', width: 80 },
        { title: 'วันที่', dataIndex: 'created_at', key: 'created_at', width: 100 },
        // { title: 'เพิ่มเติม',key: 'operation',width: 110,},
      ] 
    },
  ];
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
    }else if(formData.dateSelect === "all"){
      const firstDay = dayjs(`1999-01-01`, 'YYYY-MM-DD');
      const lastDay = dayjs(`9999-12-31`, 'YYYY-MM-DD');
      formData.dateStart = firstDay;
      formData.dateEnd = lastDay;
    }

    formData.timeStart = dayjs('00:00', 'HH:mm');
    formData.timeEnd = dayjs('23:59', 'HH:mm');
    getList();
};

const search = () =>{
  getList();
}

const paginationConfig = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `ทั้งหมด ${total} รายการ`,
});

const handleTableChange = (pagination: any) => {
  formData.page = pagination.current
  getList();
  console.log(pagination.pageSize);
  paginationConfig.value.current = pagination.current
  paginationConfig.value.pageSize = pagination.pageSize
};

</script>