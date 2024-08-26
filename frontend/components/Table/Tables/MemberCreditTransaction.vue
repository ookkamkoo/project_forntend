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
      <template v-if="column.key === 'action'">
        <a-tag color="cyan" v-if="record.action == 1">เพิ่มเครดิต</a-tag>
        <a-tag color="pink" v-else-if="record.action == 2">ลบเครดิต</a-tag>
        <a-tag color="orange" v-else-if="record.action == 3">เเก้ไขเครดิต</a-tag>
        <a-tag color="green" v-else-if="record.action == 4">ฝากเงิน</a-tag>
        <a-tag color="red" v-else-if="record.action == 5">ถอนเงิน</a-tag>
        <a-tag color="blue" v-else-if="record.action == 6">เกมส์โบนัส</a-tag>
        <a-tag color="purple" v-else-if="record.action == 7">ยอดเสีย</a-tag>
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
  </a-table>
  </template>
  <script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import dayjs from 'dayjs';
  import { getCreditTransactionHistoryByIdServices } from '~/services/creditTransactionServices';
  
  const dataShow = ref<any[]>([]);
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
  
  let formData = reactive({
      page:ref<number>(1),
      pageSize:ref<number>(10),
  });

  const props = defineProps<{
        id: number,
    }>();
  

  const getCreditHistory = async() => {
    loading.value = true;
    const data = await getCreditTransactionHistoryByIdServices(formData,props.id);
    if (data.status === "success") {
        dataShow.value = data.data.data;
        allRecord.value = data.data.recordsTotal;
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

  onMounted(() => {
    getCreditHistory();
  });
  </script>