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
      <template v-if="column.key === 'status'">
        <a-tag color="green" >สำเร็จ</a-tag>
      </template>
    </template>
    <template #summary>
        <tr class="center">
            <td ><strong>รวม</strong></td>
            <td><strong>{{sumSummary.sum_deposit}}</strong></td>
            <td><strong>{{sumSummary.sum_deposit_count}}</strong></td>
            <td><strong>{{sumSummary.sum_withdraw}}</strong></td>
            <td><strong>{{sumSummary.sum_withdraw_count}}</strong></td>
            <td><strong>{{sumSummary.sum_edit_credit}}</strong></td>
            <td><strong>{{sumSummary.sum_edit_credit_count}}</strong></td>
            <td><strong>{{sumSummary.sum_add_credit}}</strong></td>
            <td><strong>{{sumSummary.sum_add_credit_count}}</strong></td>
            <td><strong>{{sumSummary.sum_remove_credit}}</strong></td>
            <td><strong>{{sumSummary.sum_remove_credit_count}}</strong></td>
            <td><strong>{{sumSummary.sum_recommend}}</strong></td>
            <td><strong>{{sumSummary.sum_win_lost}}</strong></td>
            <td><strong>{{sumSummary.profit_and_loss}}</strong></td>
        </tr>
    </template>
  </a-table>
    
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { getReportSummaryServices } from '~/services/reportSevices';

  const loading = ref(true);
  const dataShow = ref<any[]>([]);
  const sumSummary = ref<any>({});
  const allRecord = ref<number>(0);

  const dynamicColumns = computed(() => [
    {  title: `ทั้งหมด ${allRecord.value} รายการ`, children: [
      { title: 'วันที่', width:80, dataIndex: 'date', key: 'date' },
      { title: 'ยอดฝาก', children:[
        { title: 'ยอด', width: 100, dataIndex: 'deposit', key: 'deposit',  },
        { title: 'รายการ', width: 100, dataIndex: 'deposit_count', key: 'deposit_count',  },
      ]},
      { title: 'ยอดถอน', children:[
        { title: 'ยอด', width: 100, dataIndex: 'withdraw', key: 'withdraw',  },
        { title: 'รายการ', width: 100, dataIndex: 'withdraw_count', key: 'withdraw_count',  },
      ]},
      { title: 'ฝากไม่เข้า', children:[
        { title: 'ยอด', width: 80, dataIndex: 'edit_credit', key: 'edit_credit',  },
        { title: 'รายการ', width: 80, dataIndex: 'edit_credit_count', key: 'edit_credit_count',  },
      ]},
      { title: 'เพิ่มเครดิต', children:[
        { title: 'ยอด', width: 100, dataIndex: 'add_credit', key: 'add_credit',  },
        { title: 'รายการ', width: 100, dataIndex: 'add_credit_count', key: 'add_credit_count',  },
      ]},
      { title: 'ลดเครดิต', children:[
        { title: 'ยอด', width: 80, dataIndex: 'remove_credit', key: 'remove_credit',  },
        { title: 'รายการ', width: 80, dataIndex: 'remove_credit_count', key: 'remove_credit_count',  },
      ]},
      { title: 'เเนะนำเพื่อน', width: 80, dataIndex: 'recommend', key: 'recommend',  },
      { title: 'ยอดเสีย', width: 80, dataIndex: 'lost', key: 'lost',  },
      { title: 'กำไรขาดทุน', width: 80,dataIndex: 'profit_and_loss', key: 'profit_and_loss',  },
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

    getReportSummary();
  };

  const getReportSummary = async() => {
    loading.value = true;
    const data = await getReportSummaryServices(formData);
    if (data.status === "success") {
        dataShow.value = data.data.data;
        sumSummary.value = data.data.sumReportSummary;
        allRecord.value = data.data.recordsTotal;
        paginationConfig.value.total = data.data.recordsTotal;
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