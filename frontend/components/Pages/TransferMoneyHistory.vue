<template>
    <a-modal v-model:open="open" title="โยกเงินออโต้" :closable="true">
        <FormTranferForm :closeModal="closeModal" :getTranferMoneyHistory="getTranferMoneyHistory"/>
            <template #footer></template>
    </a-modal>
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
            <a-time-picker v-model:value="formData.timeEnd" format="HH:mm" />
            </a-col>
        </a-row>
        </a-col>
        <a-col class="p-1" :span="2">
        <label><br></label>
        <a-button class="submit sky" type="primary" @click="search"><SearchOutlined /> ค้นหา</a-button>
        </a-col>
    </a-row>
    <a-row class="p-2" justify="space-between">
        <div>
        <a-radio-group v-model:value="formData.dateSelect" @change="handleDateSelectChange">
            <a-radio-button value="Today">วันนี้</a-radio-button>
            <a-radio-button value="Yesterday">เมื่อวาน</a-radio-button>
            <a-radio-button value="ThisMonth">เดือนนี้</a-radio-button>
            <a-radio-button value="all">ทั้งหมด</a-radio-button>
        </a-radio-group>
        </div>
        <!-- <div class="action">
            <a-button class="submit sky" type="primary" @click="showModal()"><PlusOutlined /> เพิ่ม</a-button>
        </div> -->
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
      <template v-if="column.key === 'id'">
        <div>{{ record.id }}</div>
      </template>
      <template v-if="column.key === 'bank_image'">
        <a-image
          width="35px"
          :src="record.bank_image"
          :preview="false"
        />
      </template>
      <template v-if="column.key === 'bank_name_member'">
        <div>{{ record.bank_name_member }}</div>
      </template>
      <template v-if="column.key === 'bank_no'">
        <div>{{ record.bank_no }}</div>
      </template>
      <template v-if="column.key === 'bank_to_image'">
        <a-image
          width="35px"
          :src="record.bank_to_image"
          :preview="false"
        />
      </template>
      <template v-if="column.key === 'bank_to_name_member'">
        <div>{{ record.bank_to_name_member }}</div>
      </template>
      <template v-if="column.key === 'bank_to_no'">
        <div>{{ record.bank_to_no }}</div>
      </template>
      <template v-if="column.key === 'amount'">
        <div>{{ record.amount }}</div>
      </template>
      <template v-if="column.key === 'remark'">
        <div>{{ record.remark }}</div>
      </template>
      <template v-if="column.key === 'created_by'">
        <div>system</div>
      </template>
      <template v-if="column.key === 'status'">
        <a-tag color="green" v-if="record.status">สำเร็จ</a-tag>
        <a-tag color="red" v-else>ไม่สำเร็จ</a-tag>
      </template>
      <template v-else-if="column.key === 'created_at'">
        <div>{{ dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
      </template>
      <template v-if="column.key === 'operation'">
        <a-flex gap="small" horizontal :justify="'center'">
            <a-button type="primary" ghost :disabled="record.detail == ''"><ScanOutlined /></a-button>
        </a-flex>
      </template>
    </template>
  </a-table>
  </template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { getBankTranferHistory } from '~/services/bankTranferAuto';
const open = ref<boolean>(false);

const dataShow = ref<any[]>([]);
const allRecord = ref<number>(0);
const sumAmount = ref<number>(0);
const loading = ref(true);


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

  // const tableHeight = computed(() => {
  //   const minHeight = 700;
  //   const maxHeight = window.innerHeight - 200; // Example: max height based on window size
  //   return Math.max(minHeight, maxHeight) + 'px';
  // });

  const dynamicColumns = computed(() => {
      return [
          { title: `ทั้งหมด ${allRecord.value} รายการ`, children: [
          { title: 'No', width: 100, dataIndex: 'id', key: 'id',  },
          { title: 'ช้อมูลการโยกเงิน', children:[
              { title: 'บัญชีต้นทาง',children:[
                  { title: 'ธนาคาร', width: 80, dataIndex: 'bank_image', key: 'bank_image',  },
                  { title: 'ชื่อบัญชี', width: 150, dataIndex: 'bank_name_member', key: 'bank_name_member',  },
                  { title: 'เลขบัญชี', width: 100, dataIndex: 'bank_no', key: 'bank_no',  },
              ]  },
              { title: 'บัญชีปลายทาง',children:[
                  { title: 'ธนาคาร', width: 80, dataIndex: 'bank_to_image', key: 'bank_to_image',  },
                  { title: 'ชื่อบัญชี', width: 150, dataIndex: 'bank_to_name_member', key: 'bank_to_name_member',  },
                  { title: 'เลขบัญชี', width: 100, dataIndex: 'bank_to_no', key: 'bank_to_no',  },
              ]  },
          ]  },
          { title: 'ยอดเงิน', width: 100, dataIndex: 'amount', key: 'amount',  },
          { title: 'เพิ่มเติม', dataIndex: 'remark', key: 'remark', width: 150 },
          { title: 'สถานะ', dataIndex: 'status', key: 'status', width: 100 },
          { title: 'โดย', dataIndex: 'created_by', key: 'created_by', width: 150 },
          { title: 'เวลา', width: 150, dataIndex: 'created_at', key: 'created_at' },
          // {
          //     title: 'สลิป',
          //     key: 'operation',
          //     width: 100,
          // }
      ] 
      },
  ];
  });
  
  const getTranferMoneyHistory = async() => {
    loading.value = true;
    const data = await getBankTranferHistory(formData);
    if (data.status === "success") {
        dataShow.value = data.data.data;
        allRecord.value = data.data.recordsTotal;
        sumAmount.value = data.data.sumAmount;
        paginationConfig.value.total = data.data.recordsTotal;
    } else {
        console.log("error : "+ data.message);
    }
    loading.value = false;
  }

  const showModal = () => {
        open.value = true;
    };

    const closeModal = () => {
        open.value = false
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
    
    getTranferMoneyHistory();
};

const search = () =>{
  getTranferMoneyHistory();
}

const paginationConfig = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `ทั้งหมด ${total} รายการ`,
});

const handleTableChange = (pagination: any) => {
  formData.page = pagination.current
  formData.pageSize = pagination.pageSize
  getTranferMoneyHistory();
  paginationConfig.value.current = pagination.current
  paginationConfig.value.pageSize = pagination.pageSize
};

onMounted(() => {
  getTranferMoneyHistory();
});
</script>
<style scoped>
.action{
  float: right;
}
</style>