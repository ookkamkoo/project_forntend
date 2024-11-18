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
            <a-time-picker v-model:value="formData.timeEnd" format="HH:mm" />
            </a-col>
        </a-row>
      </a-col>
      <a-col class="p-1" :span="2">
        <label><br></label>
        <a-button class="submit sky" type="primary"><SearchOutlined /> ค้นหา</a-button>
      </a-col>
    </a-row>
    <a-row class="p-2">
        <div>
        <a-radio-group v-model:value="formData.dateSelect">
            <a-radio-button value="Today">วันนี้</a-radio-button>
            <a-radio-button value="Yesterday">เมื่อวาน</a-radio-button>
            <a-radio-button value="ThisMonth">เดือนนี้</a-radio-button>
        </a-radio-group>
        </div>
    </a-row>
    <a-table 
    :columns="dynamicColumns"
    :data-source="dataShow"
    bordered
    size="small"
    :scroll="{ x: 1500, y: 700 }"
    :pagination="{ pageSize: 10 }"
    :loading="loading"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'id'">
        <div>{{ record.id }}</div>
      </template>
      <template v-if="column.key === 'name'">
        <div>{{ record.name }}</div>
      </template>
      <template v-if="column.key === 'amount_before'">
        <div>{{ record.amount_before }}</div>
      </template>
      <template v-if="column.key === 'amount'">
        <div>{{ record.amount }}</div>
      </template>
      <template v-if="column.key === 'amount_after'">
        <div>{{ record.amount_after }}</div>
      </template>
      <template v-if="column.key === 'bank'">
        <a-image
          width="35px"
          :src="record.bank.image"
          :preview="false"
        />
      </template>
      <template v-if="column.key === 'booknumber'">
        <div>{{ record.bank_no }}</div>
      </template>
      <template v-if="column.key === 'image_bank'">
        <a-button type="primary" ghost><ScanOutlined /></a-button>
      </template>
      <template v-if="column.key === 'remark'">
        <div>{{ record.remark }}</div>
      </template>
      <template v-if="column.key === 'status'">
        <a-tag color="orange" v-if="record.status == 1">รอทำรายการ</a-tag>
        <a-tag color="green" v-else-if="record.status == 2">สำเร็จ</a-tag>
        <a-tag color="red" v-else-if="record.status == 3">ยกเลิก</a-tag>
        <a-tag color="red" v-else-if="record.status == 4">หมดเวลา</a-tag>
      </template>
      <template v-if="column.key === 'created_by'">
        <div>{{ record.CreatedBySearch.username }}</div>
      </template>
      <template v-else-if="column.key === 'created_at'">
        <div>{{ dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
      </template>
    </template>
  </a-table>
    
  </template>
  
  <script lang="ts" setup>
  import type { TableColumnsType } from 'ant-design-vue';
  import { ref } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { ScanOutlined } from '@ant-design/icons';
  import { getLogServices } from '~/services/userServices';
  import { Alert } from '../Alert/alertComponent';
  
  const dataShow = ref<any[]>([]);
  const allRecord = ref<number>(0);
  
  const dynamicColumns = computed(() => {
    return [
      { 
        title: `ทั้งหมด ${allRecord.value} รายการ`, 
        children: [
          { title: '#', width: 60, dataIndex: 'id', key: 'id' },
          { title: 'ชื่อพนักงาน', width: 120, dataIndex: 'name', key: 'name' },
          { title: 'เมนู', dataIndex: 'menu', key: 'menu', width: 80 },
          { title: 'รายการ', dataIndex: 'list', key: 'list', width: 100 },
          { title: 'รายละเอียด', dataIndex: 'detail', key: 'detail', width: 100 },
          { title: 'ip', dataIndex: 'ip', key: 'ip', width: 80 },
          { title: 'สถานะ', dataIndex: 'status', key: 'status', width: 100 },
          { title: 'วันที่', dataIndex: 'created_at', key: 'created_at', width: 150 },
        ] 
      },
    ];
  });
  
  
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const loading = ref(true);

  let formData = reactive({
      timeStart:ref(dayjs('00:00', 'HH:mm')),
      timeEnd:ref(dayjs('23:59', 'HH:mm')),
      dateStart:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
      dateEnd:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
      username:ref<string>(''),
      adminName:ref<string>(''),
      amount:ref<string>(''),
      dateSelect:ref<string>('Today'),
      sl_type:"all"
    });

  const getLog = async () => {
    const data = await getLogServices(formData);
    loading.value = true;
    if (data.status === "success") {
        dataShow.value = data.data.data;
        allRecord.value = data.data.recordsTotal;
    } else {
        Alert('error', data.message);
    }
    loading.value = false;
}

onMounted(() => {
  getLog();
});
  </script>