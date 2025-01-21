<template>
  <a-row class="p-2" style="width: 100%;">
    <a-col :span="24" :md="8">
      <a-select
          ref="select"
          v-model:value="formData.sl_type"
          style="width: 100%"
          >
          <a-select-option value="all" class="m-2">ทั้งหมด</a-select-option>
          <a-select-option value="1">เพิ่มเครดิต</a-select-option>
          <a-select-option value="2">ลบเครดิต</a-select-option>
          <a-select-option value="3">เเก้ไขเครดิต</a-select-option>
          <a-select-option value="4">ฝากเงิน</a-select-option>
          <a-select-option value="5">ถอนเงิน</a-select-option>
          <a-select-option value="6">เกมส์โบนัส</a-select-option>
          <a-select-option value="7">ยอดเสีย</a-select-option>
          <a-select-option value="9">เเจ้งถอนเงิน</a-select-option>
          <a-select-option value="10">เพิ่มเครดิต + ฝากเงิน</a-select-option>
          <a-select-option value="11">ถอนเงิน + เเจ้งถอนเงิน</a-select-option>
      </a-select>
    </a-col>
  </a-row>
  <a-row class="p-2">
    <a-col :span="24" :md="10">
      <a-row >
        <a-col class="p-1" :span="12" :md="12">
          <label>เริ่มต้นวันที่</label>
          <a-date-picker v-model:value="formData.dateStart" />
        </a-col>
        <a-col class="p-1" :span="12" :md="12">
          <label><br></label>
          <a-time-picker v-model:value="formData.timeStart" format="HH:mm" />
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="24" :md="10">
      <a-row>
        <a-col class="p-1" :span="12" :md="12">
          <label>ถึงวันที่</label>
          <a-date-picker v-model:value="formData.dateEnd" />
        </a-col>
        <a-col class="p-1" :span="12" :md="12">
          <label><br></label>
          <a-time-picker v-model:value="formData.timeEnd" format="HH:mm" />
        </a-col>
      </a-row>
    </a-col>
    <a-col class="p-1" :span="24" :md="4">
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
            <a-radio-button value="all">ทั้งหมด</a-radio-button>
        </a-radio-group>
    </div>
  </a-row>
  <a-table 
    :columns="dynamicColumns"
    :data-source="dataShow"
    bordered
    size="small"
    :scroll="{ x: 800, y: 700 }"
    :pagination="paginationConfig"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a-tag color="cyan" v-if="record.action == 1">เพิ่มเครดิต</a-tag>
        <a-tag color="pink" v-else-if="record.action == 2">ลบเครดิต</a-tag>
        <a-tag color="orange" v-else-if="record.action == 3">เเก้ไขเครดิต</a-tag>
        <a-tag color="green" v-else-if="record.action == 4">ฝากเงิน</a-tag>
        <a-tag color="red" v-else-if="record.action == 5">ถอนเงิน</a-tag>
        <a-tag color="blue" v-else-if="record.action == 6">เกมส์โบนัส</a-tag>
        <a-tag color="purple" v-else-if="record.action == 7">ยอดเสีย</a-tag>
        <a-tag color="red" v-else-if="record.action == 8">ยกเลิกถอนเงิน</a-tag>
        <a-tag color="red" v-else-if="record.action == 9">เเจ้งถอนเงิน</a-tag>
      </template>
      <template v-if="column.key === 'updated_by_name'">
        <div>{{ record.created_by_name }}</div>
      </template>
      <template v-else-if="column.key === 'created_at'">
        <div>{{ dayjs(record.created_at).format('YYYY-MM-DD') }} <br> {{ dayjs(record.created_at).format('HH:mm:ss') }}</div>
      </template>
      <template v-if="column.key === 'status'">
        <a-tag color="green" >สำเร็จ</a-tag>
      </template>
    </template>
    <template #summary>
    <tr class="center">
      <td colspan="2"><strong>รวม</strong></td>
      <td><strong>{{ (totals.amount || 0).toFixed(2) }}</strong></td>
      <td><strong>{{ (totals.bonus || 0).toFixed(2) }}</strong></td>
      <td><strong>{{ (totals.amount_total || 0).toFixed(2) }}</strong></td>
      <td colspan="6"></td>
  </tr>
  </template>
  </a-table>
  </template>
  <script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { getCreditTransactionHistoryByIdServices } from '~/services/creditTransactionServices';
  
  const dataShow = ref<any[]>([]);
    const totals = ref({
      amount: 0,
      bonus: 0,
      amount_total: 0,
    });
  const allRecord = ref<number>(0);
  const loading = ref(true);

  const dynamicColumns = computed(() => [
    {
        title: `ทั้งหมด ${allRecord.value} รายการ`,
        children: [
            { title: 'ยูสเซอร์เนม', width: 80, dataIndex: 'username', key: 'username' },
            { title: 'รายการ', dataIndex: 'action', key: 'action', width: 80 },
            {
                title: 'เครดิต', width: 100, children: [
                    { title: 'ยอดเงิน', dataIndex: 'amount', key: 'amount', width: 60 },
                    { title: 'โบนัส', dataIndex: 'bonus', key: 'bonus', width: 60 },
                    { title: 'รวม', dataIndex: 'amount_total', key: 'amount_total', width: 60 },
                    { title: 'เครดิตก่อนหน้า', dataIndex: 'amount_before', key: 'amount_before', width: 60 },
                    { title: 'เครดิตหลัง', dataIndex: 'amount_after', key: 'amount_after', width: 60 },
                ]
            },
            { title: 'เพิ่มเติม', dataIndex: 'remark', key: 'remark', width: 150 },
            { title: 'สถานะ', dataIndex: 'status', key: 'status', width: 60 },
            { title: 'โดย', dataIndex: 'updated_by_name', key: 'updated_by_name', width: 80 },
            { title: 'วันที่', dataIndex: 'created_at', key: 'created_at', width: 80 },
        ]
    }
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
      sl_type:"all",
      page:ref<number>(1),
      pageSize:ref<number>(10),
  });

  const props = defineProps<{
        id: number,
    }>();
  


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
      }else if(formData.dateSelect === "LastMonth"){
          const firstDayLastMonth = dayjs().subtract(1, 'month').startOf('month');
          const lastDayLastMonth = dayjs().subtract(1, 'month').endOf('month');
          formData.dateStart = firstDayLastMonth;
          formData.dateEnd = lastDayLastMonth;
      }else if(formData.dateSelect === "all"){
          const firstDay = dayjs(`1999-01-01`, 'YYYY-MM-DD');
          const lastDay = dayjs(`9999-12-31`, 'YYYY-MM-DD');
          formData.dateStart = firstDay;
          formData.dateEnd = lastDay;
      }

      formData.timeStart = dayjs('00:00', 'HH:mm');
      formData.timeEnd = dayjs('23:59', 'HH:mm');
      getCreditHistory();
  };
  const getCreditHistory = async() => {
    loading.value = true;
    const data = await getCreditTransactionHistoryByIdServices(formData,props.id);
    if (data.status === "success") {
        dataShow.value = data.data.data;
        allRecord.value = data.data.recordsTotal;
        totals.value = data.data.totals;
        console.log(totals.value);
        
        paginationConfig.value.total = data.data.recordsTotal;
    } else {
        console.log("error : "+ data.message);
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
    getCreditHistory();
    paginationConfig.value.current = pagination.current
    paginationConfig.value.pageSize = pagination.pageSize
  };

  const search = () =>{
    getCreditHistory();
  }

  onMounted(() => {
    getCreditHistory();
  });
  </script>