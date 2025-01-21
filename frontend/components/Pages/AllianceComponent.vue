<template>
  <a-row class="p-2" justify="end">
    <a-col :span="12" :md="5">
      <a-col class="p-1" :span="24">
      <label><b>เริ่มต้นวันที่</b></label>
        <a-date-picker v-model:value="formData.dateStart" />
      </a-col>
    </a-col>
    <a-col :span="12" :md="5">
        <a-col class="p-1" :span="24">
        <label><b>ถึงวันที่</b></label>
          <a-date-picker v-model:value="formData.dateEnd" />
        </a-col>
    </a-col>
    <a-col :span="12" :md="5">
        <a-col class="p-1" :span="24">
          <label><b>ค้นหาด้วย</b></label>
          <a-select ref="select" v-model:value="formData.typeSearch" style="width: 100%">
              <a-select-option value="" disabled>เลือกประเภท</a-select-option>
              <template v-for="option in Constants.optionsBlacklist " :key="option.name">
              <a-select-option :value="option.value">
                  <template #default>
                      {{ option.label}}
                  </template>
              </a-select-option>
              </template>
          </a-select>
        </a-col>
    </a-col>
    <a-col :span="12" :md="5">
        <a-col class="p-1" :span="24">
          <label><b>ข้อมูลที่ต้องการค้นหา</b></label>
          <a-input-search
            v-model:value="formData.search"
            placeholder="ข้อมูลที่ต้องการ"
            style="width: 100%"
          />
        </a-col>
    </a-col>
    <a-col class="p-1" :span="24" :md="4">
      <label><br></label>
      <a-button class="submit sky" type="primary" @click="getAlliance"><SearchOutlined /> ค้นหา</a-button>
    </a-col>
  </a-row>
  <a-row class="p-2">
      <div>
      <a-radio-group v-model:value="dateSelect" @change="dateChange">
          <a-radio-button value="Today">วันนี้</a-radio-button>
          <a-radio-button value="Yesterday">เมื่อวาน</a-radio-button>
          <a-radio-button value="ThisMonth">เดือนนี้</a-radio-button>
          <a-radio-button value="All">ทั้งหมด</a-radio-button>
      </a-radio-group>
      </div>
  </a-row>
  <a-table 
      :columns="columns"
      :data-source="dataShow"
      bordered
      size="small"
      :scroll="{ x: 1500, y: 700 }"
      :pagination="{ pageSize: 10 }"
      :loading="loading"
  >
    <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'username_agent'">
          <div>{{ record.username_agent }}</div>
        </template>
        <template v-if="column.key === 'username'">
          <div>{{ record.username }}</div>
        </template>
        <template v-if="column.key === 'bank'">
          <a-image
            width="35px"
            :src="record.bank.image"
            :preview="false"
          />
        </template>
        <template v-else-if="column.key === 'name'">
          <div>{{ record.firstname + ' ' +record.lastname }}</div>
        </template>
        <template v-else-if="column.key === 'agent_type'">
          <div v-if="record.agent_type == 0">ยอดฝากถอน</div>
          <div v-if="record.agent_type == 1">ยอดเสีย</div>
        </template>
        <template v-else-if="column.key === 'created_at'">
          <div>{{ dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
        </template>
        <template v-else-if="column.key === 'detail'">
          <a-button type="primary" class="sky" @click="openAlliance(record.key_ref)" ghost>รายละเอียด</a-button>
        </template>
    </template>
  </a-table>
  
</template>

<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue';
import { ref,createVNode } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import dayjs, { Dayjs } from 'dayjs';
import { Alert } from '../Alert/alertComponent';
import { getAllianceServices } from '~/services/memberServices';
import * as Constants from '../Constants/Constants';
import { getToken } from '~/auth/authToken'


const dataShow = ref<any[]>([]);
const loading = ref(true);

const columns: TableColumnsType = [
  { title: 'ทั้งหมด 6 รายการ', children: [
    { title: 'ชื่อ', width:80, dataIndex: 'agent_name', key: 'agent_name' },
    { title: 'ยูสเซอร์เนม', width:80, dataIndex: 'username_agent', key: 'username_agent' },
    // { title: 'เบอร์มือถือ', width: 80, dataIndex: 'username', key: 'username' },
    { title: 'ธนาคาร', dataIndex: 'bank', key: 'bank', width: 50 },
    // { title: 'ชื่อ-นามสกุล', dataIndex: 'name', key: 'name', width: 80 },
    { title: 'เลขบัญชี', dataIndex: 'bank_no', key: 'bank_no', width: 80 },
    { title: 'ประเภท', dataIndex: 'agent_type', key: 'agent_type', width: 80 },
    { title: 'เปอร์เซ็น', dataIndex: 'agent_percent', key: 'agent_percent', width: 80 },
    { title: 'เปอร์เซ็นคืน company', dataIndex: 'agent_company_percent', key: 'agent_company_percent', width: 80 },
    // { title: 'หมายเหตุ', dataIndex: 'remark_is_black', key: 'remark_is_black', width: 150 },
    { title: 'วันที่', dataIndex: 'created_at', key: 'created_at', width: 80 },
    { title: 'รายละเอียด', dataIndex: 'detail', key: 'detail', width: 80 },
  ] },
];


const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

const dateSelect = ref<string>('All');

let formData = reactive({
  dateStart: ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
  dateEnd: ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
  typeSearch:1,
    search:"",
});

const getAlliance = async() =>{
  loading.value = true;
  const data = await getAllianceServices(formData);
  if (data.status === "success") {
      dataShow.value = data.data;
  } else {
      Alert('error', data.message);
  }
  loading.value = false;
}


const openAlliance = (key_ref :string) =>{
  const config = useRuntimeConfig();
  const url = config.public.webUrl;
  console.log(config.public.webName);
  console.log(url);
  
  window.open(url+`alliance/dashboard?ref=${key_ref}&token=${getToken()}&status=subport`, "_blank");
}

const dateChange = () => {
  if(dateSelect.value == "Today"){
    formData.dateStart = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    formData.dateEnd = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
  }else if(dateSelect.value == "Yesterday"){
    formData.dateStart = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD').subtract(1, 'day');
    formData.dateEnd = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD').subtract(1, 'day');
  }else if(dateSelect.value == "ThisMonth"){
    formData.dateStart = dayjs().startOf('month');
    formData.dateEnd = dayjs().endOf('month');
  }else if(dateSelect.value == "All"){
    formData.dateStart = dayjs(`2020-01-01`, 'YYYY-MM-DD');
    formData.dateEnd = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
  }
  getAlliance();
}

onMounted(() => {
  dateChange();
  getAlliance();
});


</script>