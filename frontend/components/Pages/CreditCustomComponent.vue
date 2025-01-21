<template class="search">
  <a-row class="p-2">
    <a-col class="p-1" :span="24" :md="8">
      <label>ยูสเซอร์เนม</label>
      <a-input v-model:value="formData.username" placeholder="username" />
    </a-col>
    <a-col class="p-1" :span="24" :md="8">
      <label>ทำรายการโดย</label>
      <a-input v-model:value="formData.adminName" placeholder="name" />
    </a-col>
    <a-col class="p-1" :span="24" :md="8">
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
  <div>
    <a-modal v-model:open="open" :title="'เเก้ไขเครดิตลูกค้า'" :closable="true" width="780px">
      <FormCreditCustomForm :closeModal="closeModal" :getCreditCustom="getCreditCustom"/>
      <template #footer>
      </template>
    </a-modal>
  </div>
  <a-row class="p-2" justify="end">
    <a-col class="p-rl-1">
      <a-button class="submit sky" type="primary"  @click="onCreate"><PlusOutlined /> เเก้ไขเครดิต</a-button>
    </a-col>
  </a-row>
  <div>
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
      <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'action'">
            <a-tag color="green" v-if="record.action == 1">เพิ่มเครดิต</a-tag>
            <a-tag color="red" v-else-if="record.action == 2">ลดเครดิต</a-tag>
            <a-tag color="cyan" v-else-if="record.action == 3">ฝากเงินไม่เข้า</a-tag>
          </template>
          <template v-if="column.key === 'username'">
            <div>{{ record.username }}</div>
          </template>
          <!-- <template v-if="column.key === 'amount_before'">
            <div>{{ record.amount_before }}</div>
          </template> -->
          <template v-if="column.key === 'amount'">
            <div>{{ record.amount }}</div>
          </template>
          <!-- <template v-if="column.key === 'amount_after'">
            <div>{{ record.amount_after }}</div>
          </template> -->
          <template v-if="column.key === 'bank'">
            <a-image
              width="35px"
              :src="record.bank.image"
              :preview="false"
              v-if="record.bank.image != ''"
            />
            <div v-else> - </div>
          </template>
          <template v-if="column.key === 'booknumber'">
            <div v-if="record.bank_no != ''">{{ record.bank_no }}</div>
            <div v-else> - </div>
          </template>
          <template v-if="column.key === 'bank_slip'">
            <div v-if="dayjs(record.bank_slip).format('YYYY-MM-DD HH:mm:ss') == '0001-01-01 06:42:04'"> - </div>
            <div v-else>{{ dayjs(record.bank_slip).format('YYYY-MM-DD') }} <br> {{ dayjs(record.bank_slip).format('HH:mm:ss') }}</div>
          </template>
          <template v-if="column.key === 'remark'">
            <div>{{ record.remark }}</div>
          </template>
          <template v-if="column.key === 'created_by'">
            <div>{{ record.create_by_name }}</div>
          </template>
          <template v-if="column.key === 'status'">
            <div v-if="record.status"><a-tag color="green">สำเร็จ</a-tag></div>
              <div v-else="record.status"><a-tag color="red">ไม่สำเร็จ</a-tag></div>
          </template>
          <template v-else-if="column.key === 'created_at'">
            <div>{{ dayjs(record.created_at).format('YYYY-MM-DD') }} <br> {{ dayjs(record.created_at).format('HH:mm:ss') }}</div>
          </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { getCreditCustomServices } from '~/services/creditService';

const dataShow = ref<any[]>([]);
const open = ref<boolean>(false);
const allRecord = ref<number>(0);
const loading = ref(true);

const showModal = () => {
    open.value = true;
};

const closeModal = () => {
  open.value = false;
};

const onCreate = () => {
  showModal()
};

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

let formData = reactive({
    timeStart:ref(dayjs('00:00:00', 'HH:mm:ss')),
    timeEnd:ref(dayjs('23:59:59', 'HH:mm:ss')),
    dateStart:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
    dateEnd:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
    username:ref<string>(''),
    adminName:ref<string>(''),
    amount:ref<string>(''),
    dateSelect:ref<string>('Today'),
    page:ref<number>(1),
    pageSize:ref<number>(10),
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
    getCreditCustom();
};

const getCreditCustom = async() => {
  loading.value = true;
  const data = await getCreditCustomServices(formData);
    if (data.status === "success") {
      allRecord.value = data.data.recordsTotal;
      dataShow.value = data.data.data;
      paginationConfig.value.total = data.data.recordsTotal;
    }
    loading.value = false;
}

const dynamicColumns = computed(() => {
  return [
    { 
      title: `ทั้งหมด ${allRecord.value} รายการ`, 
      children: [
        { title: 'ยูสเซอร์เนม', width: 150, dataIndex: 'username', key: 'username'},
        { title: 'ประเภท', width: 100, dataIndex: 'action', key: 'action' },
        { title: 'ธนาคารรับเงิน', width: 100,children: [
          { title: 'ธนาคาร', dataIndex: 'bank', key: 'bank', width: 100 },
          { title: 'เลชบัญชี', dataIndex: 'booknumber', key: 'booknumber', width: 150 },
        ]},
        { title: 'ยอดเงิน', dataIndex: 'amount', key: 'amount', width: 100 },
        { title: 'เวลาสลิป', dataIndex: 'bank_slip', key: 'bank_slip', width: 130 },
        { title: 'เพิ่มเติม', dataIndex: 'remark', key: 'remark', width: 250 },
        { title: 'สถานะ', dataIndex: 'status', key: 'status', width: 120 },
        { title: 'โดย', dataIndex: 'created_by', key: 'created_by', width: 120 },
        { title: 'วันที่', dataIndex: 'created_at', key: 'created_at', width: 130 },
      ]
    },
  ];
});

const search = () =>{
  getCreditCustom();
}

const paginationConfig = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `ทั้งหมด ${total} รายการ`,
});

const handleTableChange = (pagination: any) => {
  formData.page = pagination.current
  getCreditCustom();
  console.log(pagination.pageSize);
  paginationConfig.value.current = pagination.current
  paginationConfig.value.pageSize = pagination.pageSize
};

onMounted(() => {
  getCreditCustom();
});

</script>