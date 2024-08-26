<template>
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
      <template v-if="column.key === 'username'">
        <div>{{ record.username }}</div>
      </template>
      <template v-if="column.key === 'amount_before'">
        <div>{{ record.amount_before }}</div>
      </template>
      <template v-if="column.key === 'amount'">
        <div>{{ record.amount }}</div>
      </template>
      <template v-if="column.key === 'amount_total'">
        <div>{{ record.amount + record.bonus  }}</div>
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
      <template v-if="column.key === 'remark'">
        <div>{{ record.remark }}</div>
      </template>
      <template v-if="column.key === 'status'">
        <a-tag color="orange" v-if="record.status == 1">รอทำรายการ</a-tag>
        <a-tag color="green" v-else-if="record.status == 2">สำเร็จ</a-tag>
        <a-tag color="red" v-else-if="record.status == 3">ยกเลิก</a-tag>
      </template>
      <!-- <template v-if="column.key === 'updated_by'">
        <div v-if="record.UpdatedBySearch.id != 0">{{ record.UpdatedBySearch.username }}</div>
        <div v-else> - </div>
      </template> -->
      <template v-else-if="column.key === 'created_at'">
        <div >{{ dayjs(record.created_at).format('YYYY-MM-DD') }} <br> {{ dayjs(record.created_at).format('HH:mm:ss') }}</div>
      </template>
      <template v-if="column.key === 'operation'">
        <a-flex gap="small" horizontal :justify="'center'">
          <a-button type="primary" class="sky" :disabled="record.status!=1" v-if="record.status == 1 || record.status == 3"><CheckOutlined /></a-button>
          <a-button type="primary" class="warning" :disabled="record.status!=1" v-if="record.status == 1 || record.status == 3"><LikeOutlined /></a-button>
          <a-button type="primary" class="danger" danger ghost :disabled="record.status!=1" v-if="record.status == 1 || record.status == 3"><CloseOutlined /></a-button>
          <a-button type="primary" ghost v-if="record.status == 2"><QrcodeOutlined /></a-button>
        </a-flex>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { getWithdrawServices } from '~/services/memberServices';

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
  const data = await getWithdrawServices(formData);
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
        { title: 'ยูสเซอร์เนม', width: 80, dataIndex: 'username', key: 'username' },
        { title: 'ธนาคาร', dataIndex: 'bank', key: 'bank', width: 50 },
        { title: 'เลขบัญชี', dataIndex: 'bank_no', key: 'bank_no', width: 80 },
        { title: 'เครดิต', width: 100, children: [
          { title: 'ยอดเงิน', dataIndex: 'amount', key: 'amount', width: 60 },
          { title: 'โบนัส', dataIndex: 'bonus', key: 'bonus', width: 60 },
          { title: 'ทั้งหมด', dataIndex: 'amount_total', key: 'amount_total', width: 60 },
          { title: 'เครดิตก่อนหน้า', dataIndex: 'amount_before', key: 'amount_before', width: 60 },
          { title: 'เครดิตหลัง', dataIndex: 'amount_after', key: 'amount_after', width: 60 },
        ] },
        { title: 'เพิ่มเติม', dataIndex: 'remark', key: 'remark', width: 150 },
        { title: 'สถานะ', dataIndex: 'status', key: 'status', width: 70 },
        { title: 'โดย', dataIndex: 'updated_by_name', key: 'updated_by_name', width: 80 },
        { title: 'วันที่', dataIndex: 'created_at', key: 'created_at', width: 120 },
        { title: 'จัดการ',key: 'operation',width: 140,},
      ] 
    },
  ];
});

</script>