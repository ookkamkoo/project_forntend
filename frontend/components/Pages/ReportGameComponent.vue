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
              <a-select-option value="LOSS">รายการที่เเพ้</a-select-option>
              <a-select-option value="WIN">รายการที่ชนะ</a-select-option>
              <a-select-option value="EQ">รายการที่เสมอ</a-select-option>
          </a-select>
        </a-col>
        <a-col class="p-1" :span="8">
          <label>ยูสเซอร์เนม</label>
          <a-input v-model:value="formData.username" placeholder="username" />
        </a-col>
        <a-col class="p-1" :span="8">
          <label>ยอดเงิน</label>
          <a-input v-model:value="formData.amount" placeholder="amount" />
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
            <a-radio-button value="LastMonth">เดือนที่เเล้ว</a-radio-button>
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
            <template v-if="column.key === 'created_at'">
                <div >{{ dayjs(record.created_at).format('YYYY-MM-DD') }} <br> {{ dayjs(record.created_at).format('HH:mm:ss') }}</div>
            </template>
        </template>
        <template #summary>
        <tr class="center">
            <td colspan=4><strong>รวม</strong></td>
            <td><strong>{{sumBetAmount}}</strong></td>
            <td><strong>{{sumBetResult}}</strong></td>
            <td><strong>{{sumBetWinloss}}</strong></td>
            <td colspan=4></td>
        </tr>
    </template>
    </a-table>
    </template>
<script lang="ts" setup>
    import { ref, computed, onMounted } from 'vue';
    import dayjs, { Dayjs } from 'dayjs';
    import { getReportGameService } from '~/services/reportGame';
    
    const dataShow = ref<any[]>([]);
    const allRecord = ref<number>(0);
    const sumBetAmount = ref<number>(0);
    const sumBetResult = ref<number>(0);
    const sumBetWinloss = ref<number>(0);
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
        amount:ref<string>(''),
        dateSelect:ref<string>('Today'),
        sl_type:"all",
        page:ref<number>(1),
        pageSize:ref<number>(10),
    });
    

    const dynamicColumns = computed(() => {
    return [
        { 
        title: `ทั้งหมด ${allRecord.value} รายการ`, 
        children: [
            { title: '#', width: 60, dataIndex: 'id', key: 'id' },
            { title: 'ยูสเซอร์เนม', width: 120, dataIndex: 'username', key: 'username' },
            { title: 'ค่าย', dataIndex: 'product_name', key: 'product_name', width: 80 },
            { title: 'เกมส์', dataIndex: 'game_name', key: 'game_name', width: 100 },
            { title: 'เครดิต', width: 100, children: [
            { title: 'ยอดเล่น', dataIndex: 'bet_amount', key: 'bet_amount', width: 80 },
            { title: 'ผลลัพธ์', dataIndex: 'bet_result', key: 'bet_result', width: 80 },
            { title: 'รวม', dataIndex: 'bet_winloss', key: 'bet_winloss', width: 80 },
            { title: 'เครดิตก่อนหน้า', dataIndex: 'wallet_amount_before', key: 'wallet_amount_before', width: 80 },
            { title: 'เครดิตหลัง', dataIndex: 'wallet_amount_after', key: 'wallet_amount_after', width: 80 },
            ] },
            { title: 'สถานะ', dataIndex: 'status', key: 'status', width: 100 },
            { title: 'วันที่', dataIndex: 'created_at', key: 'created_at', width: 150 },
        ] 
        },
    ];
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

        getReportGame();
    };

const getReportGame = async() => {
  loading.value = true;
  const data = await getReportGameService(formData);
    if (data.status === "success") {
      allRecord.value = data.data.data.recordsTotal;
      dataShow.value = data.data.data.data;
      sumBetAmount.value = data.data.data.sumBetAmount;
      sumBetResult.value = data.data.data.sumBetResult;
      sumBetWinloss.value = data.data.data.sumBetWinloss;
      paginationConfig.value.total = data.data.data.recordsTotal;
  }
  loading.value = false;
}


const paginationConfig = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `ทั้งหมด ${total} รายการ`,
});


const handleTableChange = (pagination: any) => {
  formData.page = pagination.current
  getReportGame();
  console.log(pagination.pageSize);
  paginationConfig.value.current = pagination.current
  paginationConfig.value.pageSize = pagination.pageSize
};

const search = () =>{
    getReportGame();
}

onMounted(() => {
  getReportGame();
});
</script>
<style>
</style>