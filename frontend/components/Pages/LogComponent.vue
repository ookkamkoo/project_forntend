<template>
  <a-row class="p-2">
    <a-col :span="6" class="p-1">
      <label>สถานะ</label>
      <a-select
        ref="select"
        v-model:value="formData.sl_type"
        style="width: 100%"
        >
        <a-select-option value="all">ทั้งหมด</a-select-option>
        <a-select-option value="success">success</a-select-option>
        <a-select-option value="error">error</a-select-option>
      </a-select>
    </a-col>
    <a-col :span="6" class="p-1">
      <label>ยูสเซอร์เนม</label>
      <a-input v-model:value="formData.username" placeholder="username" />
    </a-col>
    <a-col :span="6" class="p-1">
      <label>เมนู</label>
      <a-input v-model:value="formData.menu" placeholder="menu" />
    </a-col>
    <a-col :span="6" class="p-1">
      <label>ไอพี</label>
      <a-input v-model:value="formData.ip" placeholder="ip" />
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
        <a-button class="submit sky" type="primary"><SearchOutlined /> ค้นหา</a-button>
      </a-col>
    </a-row>
    <a-row class="p-2">
        <div>
        <a-radio-group v-model:value="formData.dateSelect" @change="dateChange">
            <a-radio-button value="Today">วันนี้</a-radio-button>
            <a-radio-button value="Yesterday">เมื่อวาน</a-radio-button>
            <a-radio-button value="ThisMonth">เดือนนี้</a-radio-button>
            <a-radio-button value="All">ทั้งหมด</a-radio-button>
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
        <a-tag color="green" v-if="record.status == 'success'">สำเร็จ</a-tag>
        <a-tag color="red" v-else-if="record.status == 'error'">ยกเลิก</a-tag>
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
          { title: 'ชื่อพนักงาน', width: 120, dataIndex: 'username', key: 'username' },
          { title: 'วิธีการ', dataIndex: 'method', key: 'method', width: 80 },
          { title: 'เมนู', dataIndex: 'menu', key: 'menu', width: 100 },
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
      menu:ref<string>(''),
      ip:ref<string>(''),
      dateSelect:ref<string>('Today'),
      sl_type:"all"
    });

  const getLog = async () => {
    const data = await getLogServices(formData);
    loading.value = true;
    if (data.status === "success") {
        dataShow.value = data.data.data;
        allRecord.value = data.data.records_total;
    } else {
        Alert('error', data.message);
    }
    loading.value = false;
}

const dateChange = () => {
    if(formData.dateSelect == "Today"){
      formData.dateStart = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
      formData.dateEnd = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    }else if(formData.dateSelect == "Yesterday"){
      formData.dateStart = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD').subtract(1, 'day');
      formData.dateEnd = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD').subtract(1, 'day');
    }else if(formData.dateSelect == "ThisMonth"){
      formData.dateStart = dayjs().startOf('month');
      formData.dateEnd = dayjs().endOf('month');
    }else if(formData.dateSelect == "All"){
      formData.dateStart = dayjs(`2020-01-01`, 'YYYY-MM-DD');
      formData.dateEnd = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    }
    getLog();
  }

onMounted(() => {
  getLog();
});
  </script>