<template>
    <a-modal v-model:open="open" width="450px" title="ค้นหาลูกค้า" :closable="true">
        <FormFindMember :closeModal="closeModal" :addData="addData" :getList="getList"/>
        <template #footer></template>
    </a-modal>
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
        <div v-if="record.username != ''">{{ record.username }}</div>
        <div v-else> - </div>
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
        <a-tag color="red" v-else-if="record.status == 5">other</a-tag>
      </template>
      <template v-if="column.key === 'created_by_name'">
        <div v-if="record.created_by_name != ''">{{ record.created_by_name }}</div>
        <div v-else> - </div>
      </template>
      <template v-if="column.key === 'updated_by_name'">
        <div v-if="record.updated_by_name != ''">{{ record.updated_by_name }}</div>
        <div v-else> - </div>
      </template>
      <template v-else-if="column.key === 'created_at'">
        <div >{{ dayjs(record.created_at).format('YYYY-MM-DD') }} <br> {{ dayjs(record.created_at).format('HH:mm:ss') }}</div>
        <!-- <div>{{ dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div> -->
      </template>
      <template v-if="column.key === 'operation'">
        <a-flex gap="small" horizontal :justify="'center'">
          <a-button type="primary" class="sky" :disabled="record.status!=1" @click="selectList(record)"><CheckOutlined /></a-button>
          <a-button type="primary" class="danger" danger ghost :disabled="record.status!=1" @click="cancel(record)"><CloseOutlined /></a-button>
        </a-flex>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted,createVNode } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { getDepositServices } from '~/services/memberServices';
import { Alert } from '../Alert/alertComponent';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { cancelPostServices } from '~/services/postCreditService';
import { ScanOutlined } from '@ant-design/icons';

const dataShow = ref<any[]>([]);
const allRecord = ref<number>(0);
const loading = ref(true);
const open = ref<boolean>(false);
const addData = ref<number>(0);

let formData = reactive({
    timeStart:ref(dayjs('00:00', 'HH:mm')),
    timeEnd:ref(dayjs('23:59', 'HH:mm')),
    dateStart:ref<Dayjs>(dayjs(`1999-01-01`, 'YYYY-MM-DD')),
    dateEnd:ref<Dayjs>(dayjs(`9999-12-31`, 'YYYY-MM-DD')),
    username:ref<string>(''),
    adminName:ref<string>(''),
    amount:ref<string>(''),
    dateSelect:ref<string>('Today'),
    sl_type:"1"
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

const closeModal = () => {
  open.value = false;
};


const dynamicColumns = computed(() => {
  return [
    { 
      title: `ทั้งหมด ${allRecord.value} รายการ`, 

      children: [
        { title: '#', width: 60, dataIndex: 'id', key: 'id' },
        { title: 'ยูสเซอร์เนม', width: 120, dataIndex: 'username', key: 'username' },
        { title: 'ธนาคาร', dataIndex: 'bank', key: 'bank', width: 80 },
        { title: 'เลขบัญชี', dataIndex: 'bank_no', key: 'bank_no', width: 100 },
        { title: 'เครดิต', width: 100, children: [
          { title: 'ยอดเงิน', dataIndex: 'amount', key: 'amount', width: 80 },
          { title: 'โบนัส', dataIndex: 'bonus', key: 'bonus', width: 80 },
          { title: 'รวม', dataIndex: 'amount_total', key: 'amount_total', width: 80 },
          { title: 'เครดิตก่อนหน้า', dataIndex: 'amount_before', key: 'amount_before', width: 80 },
          { title: 'เครดิตหลัง', dataIndex: 'amount_after', key: 'amount_after', width: 80 },
        ] },
        { title: 'รูปสลิป', dataIndex: 'image', key: 'image', width: 80 },
        { title: 'โปรโมชั่น', dataIndex: 'remark', key: 'remark', width: 200 },
        { title: 'สร้าง', dataIndex: 'created_by_name', key: 'created_by_name', width: 80 },
        { title: 'เเก้ไข', dataIndex: 'updated_by_name', key: 'updated_by_name', width: 80 },
        { title: 'สถานะ', dataIndex: 'status', key: 'status', width: 100 },
        { title: 'วันที่', dataIndex: 'created_at', key: 'created_at', width: 150 },
        { title: 'จัดการ',key: 'operation',width: 110,},
      ] 
    },
  ];
});

const cancel = (record:any) => {
  Modal.confirm({
        title: 'คุณต้องการยกเลิกรายการฝาก ใช่หรือไหม?',
        icon: createVNode(ExclamationCircleOutlined),
        content: `ยกเลิกรายการฝาก ที่ ${record.id}`,
        okText: 'OK',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            loading.value = true;
            const data = await cancelPostServices(record.id);
            if (data.status == 'success') {
                Alert("success", `ยกเลิกรายการฝากเรียบร้อย ${record.id} เรียบร้อย.`);
                getList();
            } else {
                Alert("error", data.message);
            }
            loading.value = false;
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

const selectList = (record:any) =>{
  open.value = true
  addData.value = record.id
}
</script>