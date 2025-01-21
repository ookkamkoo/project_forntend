<template>
  <a-row class="p-2">
    <a-col :span="24" :md="8">
      <a-row >
        <a-col class="p-1" :span="24" :md="24">
          <label>สถานะ</label>
          <a-select
            ref="select"
            v-model:value="formData.status"
            style="width: 100%"
          >
            <a-select-option value="">ทั้งหมด</a-select-option>
            <a-select-option value="0">ยังไม่ได้รับ</a-select-option>
            <a-select-option value="1">รับเเล้ว</a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="24" :md="16">
      <a-row >
        <a-col class="p-1" :span="24" :md="12">
          <label>ยูสเซอร์เนม</label>
          <a-input v-model:value="formData.username" placeholder="ยูสเซอร์เนม" />
        </a-col>
        <a-col class="p-1" :span="24" :md="12">
          <label>ลูกค้าถูกเเนะนำ</label>
          <a-input v-model:value="formData.usernameRecommend" placeholder="ลูกค้าถูกเเนะนำ" />
        </a-col>
      </a-row>
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
    size="small"
    :scroll="{ x: 1500, y: 700 }"
    :pagination="paginationConfig"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'type'">
        <a-tag color="blue">เเนะนำเพื่อน</a-tag>
      </template>
      <template v-if="column.key === 'date'">
        <div>{{ dayjs(record.date).format('YYYY-MM-DD') }}</div>
      </template>
      <template v-if="column.key === 'updated_at'">
        <div>{{ dayjs(record.updated_at).format('YYYY-MM-DD') }} <br> {{ dayjs(record.updated_at).format('HH:mm:ss') }}</div>
      </template>
      <template v-if="column.key === 'remark'">
        <div>system</div>
      </template>
      <template v-if="column.key === 'refund_amount'">
        <div>{{record.refund_amount}}</div>
      </template>
      <template v-if="column.key === 'status'">
        <a-tag color="red" v-if="record.status == 0">ยังไม่ได้รับ</a-tag>
        <a-tag color="green" v-else-if="record.status == 1">รับเเล้ว</a-tag>
      </template>
    </template>
    <template #summary>
        <tr class="center">
            <td ><strong>รวม</strong></td>
            <td colspan="2"></td>
            <td><strong>{{sumAmountStatus.sumAmount}}</strong></td>
            <td><strong>{{sumAmountStatus.sumBonus}}</strong></td>
            <td><strong>{{sumAmountStatus.sumAmountTotal}}</strong></td>
            <td colspan="1"></td>
            <td><strong>{{sumAmountStatus.sumRefundAmount}}</strong></td>
            <td colspan="1"></td>
            <td><strong>รายการทั้งหมด</strong></td>
            <td><strong>{{allRecord}}</strong></td>
        </tr>
    </template>
    
  </a-table>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { getRecommendServices } from '~/services/recommendServices';

const dataShow = ref<any[]>([]);
const allRecord = ref<number>(0);
const loading = ref(true);
  const sumAmountStatus = ref({
  sumAmount: 0,
  sumBonus: 0,
  sumAmountTotal: 0,
  sumRefundAmount: 0
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
      username:ref<string>(''),
      usernameRecommend:ref<string>(''),
      status:ref<string>(''),
      dateSelect:ref<string>('Today'),
      page:ref<number>(1),
      pageSize:ref<number>(10),
  });

  const dynamicColumns = computed(() => {
    return [
    { title: `ทั้งหมด ${allRecord.value} รายการ`, children: [
      { title: 'ลำดับ', width: 100, dataIndex: 'type', key: 'type'},
      { title: 'ยูสเซอร์เนม', width: 100, dataIndex: 'username_receive_id', key: 'username_receive_id' },
      { title: 'ลูกค้าถูกเเนะนำ', width: 100, dataIndex: 'username_send_id', key: 'username_send_id'},
      { title: 'เครดิต', width: 100, children: [
          { title: 'ยอดเงิน', dataIndex: 'amount', key: 'amount', width: 80 },
          { title: 'โบนัส', dataIndex: 'bonus', key: 'bonus', width: 80 },
          { title: 'รวม', dataIndex: 'amount_total', key: 'amount_total', width: 80 },
          { title: 'เปอร์เซ็นต์', width: 100, dataIndex: 'percent', key: 'percent',  },
          { title: 'ยอดเเนะนำ', width: 100, dataIndex: 'refund_amount', key: 'refund_amount',  },
        ] },
      { title: 'ของวันที่', dataIndex: 'date', key: 'date', width: 150 },
      { title: 'เวลากดรับ', dataIndex: 'updated_at', key: 'updated_at', width: 150 },
      // { title: 'เหตุผล', dataIndex: 'remark', key: 'remark', width: 150 },
      { title: 'สถานะ', dataIndex: 'status', key: 'status', width: 150 },
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
  }

  formData.timeStart = dayjs('00:00', 'HH:mm');
  formData.timeEnd = dayjs('23:59', 'HH:mm');
  getRecommend();
};

const getRecommend = async() => {
  loading.value = true;
  const data = await getRecommendServices(formData);
    if (data.status === "success") {
        dataShow.value = data.data.data;
        allRecord.value = data.data.recordsTotal;
        sumAmountStatus.value = data.data.sumAmountStatus;
        paginationConfig.value.total = data.data.recordsTotal;
    } else {
        console.log("error : "+ data.message);
    }
    loading.value = false;
}

const search = () =>{
  getRecommend();
}

const paginationConfig = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `ทั้งหมด ${total} รายการ`,
});

const handleTableChange = (pagination: any) => {
  formData.page = pagination.current
  getRecommend();
  paginationConfig.value.current = pagination.current
  paginationConfig.value.pageSize = pagination.pageSize
};

onMounted(() => {
  getRecommend();
});


</script>