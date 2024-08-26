<template>
  <a-table 
    :columns="dynamicColumns"
    :data-source="dataShow"
    bordered
    :scroll="{ x: 1500, y: 700 }"
    :pagination="{ pageSize: 10 }"
    :loading="loading"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'id'">
        <div>{{ record.id }}</div>
      </template>
      <template v-if="column.key === 'username'">
        <div>{{ record.username }}</div>
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
           v-if="record.bank.image != ''"
        />
        <div v-else> - </div>
      </template>
      <template v-if="column.key === 'bank_no'">
        <div v-if="record.bank_no != ''">{{ record.bank_no }}</div>
        <div v-else> - </div>
      </template>
      <template v-if="column.key === 'image'">
        <a-button type="primary" ghost :disabled="record.image==''"><ScanOutlined /></a-button>
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
      <!-- <template v-if="column.key === 'updated_by'">
        <div v-if="record.UpdatedBySearch.id != 0">{{ record.UpdatedBySearch.username }}</div>
        <div v-else>member</div>
      </template> -->
      <template v-else-if="column.key === 'created_at'">
        <div >{{ dayjs(record.created_at).format('YYYY-MM-DD') }} <br> {{ dayjs(record.created_at).format('HH:mm:ss') }}</div><div>{{ dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
      </template>
      <template v-if="column.key === 'operation'">
        <a-flex gap="small" horizontal :justify="'center'">
          <a-button type="primary" class="sky"><CheckOutlined /></a-button>
          <a-button type="primary" class="danger" danger ghost ><CloseOutlined /></a-button>
        </a-flex>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { getDepositServices } from '~/services/memberServices';

const dataShow = ref<any[]>([]);
const allRecord = ref<number>(0);
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
    adminName:ref<string>(''),
    amount:ref<string>(''),
    dateSelect:ref<string>('Today'),
    sl_type:"all"
  });

const getList = async() => {
  const data = await getDepositServices(formData);
    if (data.status === "success") {
      allRecord.value = data.data.recordsTotal;
      dataShow.value = data.data.data;
  }
  loading.value = false;
}

onMounted(() => {
  getList();
});

const dynamicColumns = computed(() => {
  return [
    { 
      title: `ทั้งหมด ${allRecord.value} รายการ`, 

      children: [
        { title: '#', width: 60, dataIndex: 'id', key: 'id' },
        { title: 'ยูสเซอร์เนม', width: 120, dataIndex: 'username', key: 'username' },
        { title: 'ธนาคาร', dataIndex: 'bank', key: 'bank', width: 80 },
        { title: 'เลชบัญชี', dataIndex: 'bank_no', key: 'bank_no', width: 100 },
        { title: 'เครดิต', width: 100, children: [
          { title: 'ยอดเงิน', dataIndex: 'amount', key: 'amount', width: 80 },
          { title: 'โบนัส', dataIndex: 'amount_before', key: 'amount_before', width: 80 },
          { title: 'รวม', dataIndex: 'amount_before', key: 'amount_before', width: 80 },
          { title: 'เครดิตก่อนหน้า', dataIndex: 'amount_before', key: 'amount_before', width: 80 },
          { title: 'เครดิตหลัง', dataIndex: 'amount_after', key: 'amount_after', width: 80 },
        ] },
        { title: 'รูปสลิป', dataIndex: 'image', key: 'image', width: 80 },
        { title: 'โปรโมชั่น', dataIndex: 'remark', key: 'remark', width: 200 },
        { title: 'โดย', dataIndex: 'updated_by_name', key: 'updated_by_name', width: 80 },
        { title: 'สถานะ', dataIndex: 'status', key: 'status', width: 100 },
        { title: 'วันที่', dataIndex: 'created_at', key: 'created_at', width: 150 },
        { title: 'จัดการ',key: 'operation',width: 110,},
      ] 
    },
  ];
});

</script>