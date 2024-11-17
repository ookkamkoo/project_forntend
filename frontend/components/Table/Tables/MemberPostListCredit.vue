<template>
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
        <template v-if="column.key === 'id'">
            <div>{{ record.id }}</div>
        </template>
        <template v-if="column.key === 'name'">
            <div>{{ record.name }}</div>
        </template>
        <template v-if="column.key === 'bank'">
            <a-image
            width="35px"
            :src="record.bank.image"
            :preview="false"
            />
        </template>
        <template v-if="column.key === 'bank_no'">
            <div>{{ record.bank_no }}</div>
        </template>
        <template v-if="column.key === 'action'">
            <a-tag color="green" v-if="record.action == 1">ฝากเงิน</a-tag>
            <a-tag color="red" v-else-if="record.action == 2">ถอนเงิน</a-tag>
            <a-tag color="orange" v-else-if="record.action == 3">ฝากเงินไม่เข้า</a-tag>
        </template>
        <template v-if="column.key === 'amount_before'">
            <div>{{ record.amount_before }}</div>
        </template>
        <template v-if="column.key === 'amount'">
            <div>{{ record.amount }}</div>
        </template>
        <template v-if="column.key === 'bonus'">
            <div>{{ record.bonus }}</div>
        </template>
        <template v-if="column.key === 'amount_total'">
            <div v-if="!isNaN(record.amount + record.bonus)">{{ (record.amount + record.bonus).toFixed(2) }}</div>
            <div v-else>{{ record.amount.toFixed(2) }}</div>
        </template>
        <template v-if="column.key === 'amount_after'">
            <div>{{ record.amount_after }}</div>
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
        <template v-if="column.key === 'updated_by_name'">
            <div v-if="record.updated_by_name != ''">{{ record.updated_by_name }}</div>
            <div v-else> - </div>
        </template>
        <template v-else-if="column.key === 'created_at'">
            <div>{{ dayjs(record.created_at).format('YYYY-MM-DD') }} <br> {{ dayjs(record.created_at).format('HH:mm:ss') }}</div>
        </template>
        <template v-if="column.key === 'operation'">
            <a-button type="primary" ghost v-if="record.action =='1'" :disabled="record.image == ''"><ScanOutlined /></a-button>
            <a-button type="primary" ghost v-else-if="record.action =='2'" :disabled="record.detail == ''"><QrcodeOutlined /></a-button>
        </template>
        </template>
    </a-table>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { getMemberTransactionHistoryByIdServices } from '~/services/postCreditService';
import { ScanOutlined } from '@ant-design/icons';

const dataShow = ref<any[]>([]);
const allRecord = ref<number>(0);
const loading = ref(true);

const dynamicColumns = computed(() => {
  return [
    { 
      title: `ทั้งหมด ${allRecord.value} รายการ`, 
      children: [
        // { title: '#', width: 60, dataIndex: 'id', key: 'id' },
        { title: 'ยูสเซอร์เนม', width: 120, dataIndex: 'username', key: 'username' },
        { title: 'ธนาคาร', dataIndex: 'bank', key: 'bank', width: 80 },
        { title: 'เลขบัญชี', dataIndex: 'bank_no', key: 'bank_no', width: 100 },
        { title: 'สถานะ', dataIndex: 'action', key: 'action', width: 100 },
        { title: 'เครดิต', width: 100, children: [
          { title: 'ยอดเงิน', dataIndex: 'amount', key: 'amount', width: 80 },
          { title: 'โบนัส', dataIndex: 'bonus', key: 'bonus', width: 80 },
          { title: 'รวม', dataIndex: 'amount_total', key: 'amount_total', width: 80 },
          { title: 'เครดิตก่อนหน้า', dataIndex: 'amount_before', key: 'amount_before', width: 80 },
          { title: 'เครดิตหลัง', dataIndex: 'amount_after', key: 'amount_after', width: 80 },
        ] },
        { title: 'เพิ่มเติม', dataIndex: 'remark', key: 'remark', width: 200 },
        { title: 'โดย', dataIndex: 'updated_by_name', key: 'updated_by_name', width: 80 },
        { title: 'สถานะ', dataIndex: 'status', key: 'status', width: 100 },
        { title: 'วันที่', dataIndex: 'created_at', key: 'created_at', width: 150 },
        { title: 'เพิ่มเติม',key: 'operation',width: 110,},
      ] 
    },
  ];
});

let formData = reactive({
      page:ref<number>(1),
      pageSize:ref<number>(10),
  });

const props = defineProps<{
    id: number,
}>();

const getMemberTransactionHistoryById = async() => {
    loading.value = true;
    const data = await getMemberTransactionHistoryByIdServices(formData,props.id);
    loading.value = true;
    if (data.status === "success") {
      allRecord.value = data.data.recordsTotal;
      dataShow.value = data.data.data;
      paginationConfig.value.total = data.data.recordsTotal;
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
  getMemberTransactionHistoryById();
  paginationConfig.value.current = pagination.current
  paginationConfig.value.pageSize = pagination.pageSize
};

onMounted(() => {
    getMemberTransactionHistoryById();
});
</script>