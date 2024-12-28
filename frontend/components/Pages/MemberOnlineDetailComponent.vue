<template>
    <a-row class="p-2">
        <a-col :span="24" :md="11">
        <a-row >
            <a-col class="p-rl-1" :span="15" >
            <label>เริ่มต้นวันที่</label>
            <a-date-picker v-model:value="formData.dateStart" />
            </a-col>
            <a-col class="p-rl-1" :span="8">
            <label><br></label>
            <a-time-picker v-model:value="formData.timeStart" format="HH:mm" />
            </a-col>
        </a-row>
        </a-col>
        <a-col :span="24" :md="11">
        <a-row>
            <a-col class="p-rl-1" :span="15">
            <label>ถึงวันที่</label>
            <a-date-picker v-model:value="formData.dateEnd" />
            </a-col>
            <a-col class="p-rl-1" :span="8">
            <label><br></label>
            <a-time-picker v-model:value="formData.timeEnd" format="HH:mm" />
            </a-col>
        </a-row>
        </a-col>
        <a-col class="p-rl-1" :span="24" :md="2">
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
        <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'operation'">
                <a-flex gap="small" :justify="'center'" horizontal>
                    <a-button v-if="column.key" class="sky" type="primary" @click="onEdit(record)" ><ContainerOutlined /></a-button>
                </a-flex>
            </template>
            <template v-else-if="column.key === 'date'">
                <div>{{ dayjs(record.created_at).format('YYYY-MM-DD') }}</div>
            </template>
        </template>
    </a-table>
  </template>
  <script lang="ts" setup>
  import { ref,createVNode } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { getMemberOnlineServices } from '~/services/memberServices';
  import type { Bank,Market } from '~/services/memberServices';
  
  const open = ref<boolean>(false);
  const active = ref<boolean>(true);
  const allRecord = ref<number>(0);
  const loading = ref(true);



  const getMemberOnline= async() =>{
        loading.value = true;
        const data = await getMemberOnlineServices(formData);
        if (data.status === "success") {
            dataShow.value = data.data.data;
            allRecord.value = data.data.recordsTotal;
        } else {
            console.log("error : "+ data.message);
        }
        loading.value = false;
    }

  const dynamicColumns = computed(() => {
  return [
  { title: `ทั้งหมด ${allRecord.value} รายการ`, children: [
        { title: 'วันที่', width: 80, dataIndex: 'date', key: 'date' },
        { title: 'จำนวนลูกค้าที่เข้าใช้งาน', width: 80, dataIndex: 'count', key: 'count',  },
        {
                title: 'รายละเอียด',
                key: 'operation',
                width: 100,
        }
    ]},
  ];
});


const dataShow = ref<any[]>([]);

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

let formData = reactive({
    timeStart:ref(dayjs('00:00:00', 'HH:mm:ss')),
    timeEnd:ref(dayjs('23:59:59', 'HH:mm:ss')),
    dateStart:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
    dateEnd:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
    sl_type:ref<string>('0'),
    sl_search:ref<string>('1'),
    find_bank_no:ref<string>(''),
    bank_list:ref<Bank[]>([]),
    bank:ref<number>(0),
    market_list:ref<Market[]>([]),
    market:ref<number>(0),
    data_search:ref<string>(''),
    dateSelect:ref<string>('all'),
    page:ref<number>(1),
    pageSize:ref<number>(10),
    memberEdit:ref<any>(),
  });



const showModal = () => {
  open.value = true;
};


const onEdit = (data:any) => {
    
    active.value = false;
    formData.memberEdit = data
        
    // // memberEdit.id
    showModal();
}


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
    getMemberOnline();
};

const paginationConfig = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `ทั้งหมด ${total} รายการ`,
});

const handleTableChange = (pagination: any) => {
  formData.page = pagination.current
  getMemberOnline();
  paginationConfig.value.current = pagination.current
  paginationConfig.value.pageSize = pagination.pageSize
};

onMounted(() => {
    handleDateSelectChange();
    getMemberOnline();
    // getConfigServices();
});

const search = () =>{
    getMemberOnline();
}

</script>