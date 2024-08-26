<template>
    <a-row class="p-2">
        <a-col class="p-1" :span="8">
            <label>ประเภท</label>
            <a-select
                ref="select"
                v-model:value="formData.sl_type"
                style="width: 100%"
                >
                <a-select-option value="all">ทั้งหมด</a-select-option>
                <a-select-option value="1">เเพ้ชนะ</a-select-option>
                <!-- <a-select-option value="2">turnOver</a-select-option> -->
            </a-select>
        </a-col>
        <a-col class="p-1" :span="8">
        <label>ค้นหาด้วย</label>
        <a-select
                ref="select"
                v-model:value="formData.sl_search"
                style="width: 100%"
                >
                <a-select-option value="0">ยูสเซอร์เนม</a-select-option>
                <!-- <a-select-option value="1">เบอร์มือถือ</a-select-option>
                <a-select-option value="2">หมายเลขบัญชี</a-select-option>
                <a-select-option value="3">ชื่อ</a-select-option>
                <a-select-option value="4">นามสกุล</a-select-option> -->
            </a-select>
        </a-col>
        <a-col class="p-1" :span="8">
        <label>ข้อมูลที่ต้องการค้นหา</label>
        <a-input v-model:value="formData.data" />
        </a-col>
    </a-row>
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
        <template v-if="column.key === 'id'">
          <div>{{ record.id }}</div>
        </template>
        <template v-if="column.key === 'type'">
          <div> ยอดเสีย </div>
        </template>
        <template v-if="column.key === 'username'">
          <div>{{ record.username }}</div>
        </template>
        <template v-if="column.key === 'amount'">
          <div>{{ record.amount }}</div>
        </template>
        <template v-if="column.key === 'percent'">
          <div>{{ record.percent }}</div>
        </template>
        <template v-if="column.key === 'turn'">
          <div>{{ record.turn }}</div>
        </template>
        <template v-if="column.key === 'bonus'">
          <div>{{ record.bonus }}</div>
        </template>
        <template v-if="column.key === 'status'">
          <a-tag color="green" v-if="record.status == 1">รับเเล้ว</a-tag>
          <a-tag color="red" v-else-if="record.status == 0">ยังไม่ได้รับ</a-tag>
        </template>
        <template v-if="column.key === 'date'">
          <div>{{ dayjs(record.date).format('YYYY-MM-DD') }}</div>
        </template>
      </template>
      <template #summary>
        <tr class="center">
            <td ><strong>รวม</strong></td>
            <td colspan="2"></td>
            <td><strong>{{dataSum.sumAmount}}</strong></td>
            <td><strong>{{dataSum.sumBonus}}</strong></td>
            <td><strong>{{dataSum.sumAmountTotal}}</strong></td>
            <td colspan="1"></td>
            <td><strong>{{dataSum.sumRefundAmount}}</strong></td>
            <td colspan="3"></td>
        </tr>
    </template>
    </a-table>

  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { getCashbackServices } from '~/services/cashbackServices';

  const dataShow = ref<any[]>([]);
  const dataSum = ref({
  sumAmountTotal: 0,
  sumAmount: 0,
  sumBonus: 0,
  sumRefundAmount: 0
  });
  const allRecord = ref<number>(0);
  const loading = ref(true);

  const dynamicColumns = computed(() => {
    return [
    { title: `ทั้งหมด ${allRecord.value} รายการ`, children: [
      { title: 'รายการ', width: 100, dataIndex: 'id', key: 'id',  },
      { title: 'ประเภท', width: 100, dataIndex: 'type', key: 'type',  },
      { title: 'ยูสเซอร์เนม', width: 100, dataIndex: 'username', key: 'username',  },
      { title: 'เครดิต', width: 100, children: [
          { title: 'ยอดเงิน', dataIndex: 'amount', key: 'amount', width: 80 },
          { title: 'โบนัส', dataIndex: 'bonus', key: 'bonus', width: 80 },
          { title: 'รวม', dataIndex: 'amount_total', key: 'amount_total', width: 80 },
          { title: 'เปอร์เซ็นต์', width: 100, dataIndex: 'percent', key: 'percent',  },
          { title: 'ยอดเสีย', width: 100, dataIndex: 'refund_amount', key: 'refund_amount',  },
        ] },
      { title: 'เทิร์น', width: 100, dataIndex: 'turn', key: 'turn',  },
      { title: 'สถานะ', width: 100, dataIndex: 'status', key: 'status' },
      { title: 'วันที่', width: 100, dataIndex: 'date', key: 'date' },
    ]},
    ];
  });
  

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');


  let formData = reactive({
      timeStart:ref(dayjs('00:00', 'HH:mm')),
      timeEnd:ref(dayjs('23:59', 'HH:mm')),
      dateStart:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
      dateEnd:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
      data:ref<string>(''),
      dateSelect:ref<string>('Today'),
      sl_type:"all",
      sl_search:"0",
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
    }else if(formData.dateSelect === "all"){
      const firstDay = dayjs(`1999-01-01`, 'YYYY-MM-DD');
      const lastDay = dayjs(`9999-12-31`, 'YYYY-MM-DD');
      formData.dateStart = firstDay;
      formData.dateEnd = lastDay;
    }

    formData.timeStart = dayjs('00:00', 'HH:mm');
    formData.timeEnd = dayjs('23:59', 'HH:mm');
    getReFound();
};

const search = () =>{
  getReFound();
}

const getReFound = async() => {
  loading.value = true;
  const data = await getCashbackServices(formData);
  if (data.status === "success") {
      dataShow.value = data.data.data;
      dataSum.value = data.data.amountSum;
      allRecord.value = data.data.recordsTotal;
      paginationConfig.value.total = data.data.recordsTotal;
  } else {
      console.log("error : "+ data.message);
  }
  loading.value = false;
}

onMounted(() => {
  getReFound();
});

const paginationConfig = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `ทั้งหมด ${total} รายการ`,
});

const handleTableChange = (pagination: any) => {
  formData.page = pagination.current
  getReFound();
  paginationConfig.value.current = pagination.current
  paginationConfig.value.pageSize = pagination.pageSize
};

</script>