<template>
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
      <template v-if="column.key === 'status'">
        <a-tag color="green" >สำเร็จ</a-tag>
      </template>
    </template>
  </a-table>
    
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { getReportSummaryProductServices } from '~/services/reportGame';

  const loading = ref(true);
  const dataShow = ref<any[]>([]);
  const sumSummary = ref<any>({});
  const allRecord = ref<number>(0);

  const dynamicColumns = computed(() => [
    {  title: `ทั้งหมด ${allRecord.value} รายการ`, children: [
      { title: 'วันที่', width:100, dataIndex: 'date', key: 'date' },
      { title: 'PG100', width: 80, dataIndex: 'pg100', key: 'pg100',  },
      { title: 'Slot Game', width: 80, dataIndex: 'slot_game', key: 'slot_game',  },
      { title: 'Sportsbook', width: 80, dataIndex: 'sports_book', key: 'sports_book',  },
      { title: 'Live Casino', width: 80,dataIndex: 'live_casino', key: 'live_casino',  },
      { title: 'Fishing Hunter', width: 80,dataIndex: 'fishing_hunter', key: 'fishing_hunter',  },
      { title: 'Game Card', width: 80,dataIndex: 'game_card', key: 'game_card',  },
      { title: 'Lotto', width: 80,dataIndex: 'lotto', key: 'lotto',  },
      { title: 'E-Sport', width: 80,dataIndex: 'e_sport', key: 'e_sport',  },
      { title: 'Poker Game', width: 80,dataIndex: 'poker_game', key: 'poker_game',  },
      { title: 'Keno', width: 80,dataIndex: 'keno', key: 'keno',  },
      { title: 'Crypto Tradding', width: 80,dataIndex: 'crypto_tradding', key: 'crypto_tradding',  },
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
    const data = await getReportSummaryProductServices(formData);
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