<template>
    <a-row class="p-2">
      <a-col class="p-1" :span="6">
        <label>ประเภท</label>
        <a-select
            ref="select"
            v-model:value="formData.sl_type"
            style="width: 100%"
            >
            <a-select-option value="">ทั้งหมด</a-select-option>
            <a-select-option value="SpinWheel">SpinWheel</a-select-option>
            <a-select-option value="Card">Card</a-select-option>
        </a-select>
      </a-col>
      <a-col class="p-1" :span="6">
        <label>Username</label>
        <a-input v-model:value="formData.username" placeholder="username" />
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
      <template v-if="column.key === 'date'">
        <div >{{ dayjs(record.date).format('YYYY-MM-DD') }}</div>
      </template>
      <template v-else-if="column.key === 'action'">
        <a-tag color="green" v-if="record.action='add'" >เพิ่ม</a-tag>
        <a-tag color="red" v-else>ลบ</a-tag>
      </template>
      <template v-else-if="column.key === 'result_detail'">
        <div >{{ record.result_detail }}</div>
      </template>
      <template v-else-if="column.key === 'created_at'">
        <div >{{ dayjs(record.created_at).format('YYYY-MM-DD') }} <br> {{ dayjs(record.created_at).format('HH:mm:ss') }}</div>
      </template>
      <template v-else-if="column.key === 'status'">
        <a-tag color="green" >สำเร็จ</a-tag>
      </template>
    </template>
    <template #summary>
      <tr class="center">
          <td colspan=4><strong>รวม</strong></td>
          <td><strong>{{total_coin}}</strong></td>
          <td></td>
          <td><strong>{{total_coin_result.toFixed(2)}}</strong></td>
          <td colspan=2></td>
      </tr>
    </template>
  </a-table>
    
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { getMiniGameReport } from '~/services/reportGame';

  const loading = ref(true);
  const dataShow = ref<any[]>([]);
  const total_coin_result = ref<number>(0);
  const total_coin = ref<number>(0);
  const allRecord = ref<number>(0);

  const dynamicColumns = computed(() => {
        return [
        { 
            title: `ทั้งหมด ${allRecord.value} รายการ`, 
            children: [
            { title: 'รายการที่', dataIndex: 'id', key: 'id', width: 30 },
            { title: 'ชื่อ', dataIndex: 'username', key: 'username', width: 30 },
            { title: 'เกมส์', dataIndex: 'game', key: 'game', width: 30 },
            { title: 'กระทำ', dataIndex: 'action', key: 'action', width: 30 },
            { title: 'จำนวนเหรียญ', children: [
            { title: 'ก่อน', dataIndex: 'Coin_before', key: 'Coin_before', width: 30 },
            { title: 'เหรียญที่ใช้', dataIndex: 'Coin', key: 'Coin', width: 30 },
            { title: 'หลัง', dataIndex: 'Coin_after', key: 'Coin_after', width: 30 },
            ]},
            { title: 'ผลที่ออก', key: 'result_detail', width: 30},
            { title: 'สถานะ', key: 'status', width: 30 },
            { title: 'วันที่', key: 'created_at', width: 40 },
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
    sl_type:"",
    username:"",
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

    getReportSummary();
  };

  const getReportSummary = async() => {
    loading.value = true;
    const data = await getMiniGameReport(formData);
    if (data.status === "success") {
        dataShow.value = data.data.transactions;
        allRecord.value = data.data.total_count;
        paginationConfig.value.total = data.data.total_count;
        total_coin_result.value = data.data.total_coin_result
        total_coin.value = data.data.total_coin
    } else {
        console.log("error : "+ data.message);
    }
    loading.value = false;
  }

  const search = () =>{
    getReportSummary();
  }
  
  const paginationConfig = ref({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total: number) => `ทั้งหมด ${total} รายการ`,
  });

  const handleTableChange = (pagination: any) => {
    formData.page = pagination.current
    getReportSummary();
    console.log(pagination.pageSize);
    paginationConfig.value.current = pagination.current
    paginationConfig.value.pageSize = pagination.pageSize
  };

  onMounted(() => {
    getReportSummary();
  });
  </script>