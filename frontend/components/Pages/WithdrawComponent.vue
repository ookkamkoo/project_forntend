<template>
  <a-modal v-model:open="open" width="650px" title="เลือกบัญชีถอน" :closable="true">
    <FormWithdraw :closeModal="closeModal" :dataMember="dataMember" />
    <template #footer></template>
  </a-modal>
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
      <template v-if="column.key === 'updated_by_name'">
        <div v-if="record.updated_by_name != ''">{{ record.updated_by_name }}</div>
        <div v-else> - </div>
      </template>
      <template v-else-if="column.key === 'created_at'">
        <div >{{ dayjs(record.created_at).format('YYYY-MM-DD') }} <br> {{ dayjs(record.created_at).format('HH:mm:ss') }}</div>
      </template>
      <template v-if="column.key === 'operation'">
        <a-flex gap="small" horizontal :justify="'center'">
          <a-button type="primary" class="sky" :disabled="record.status!=1 || store.setting.withdrawAuto=='false'" v-if="record.status == 1 || record.status == 3" @click="showModal(record)"><CheckOutlined /></a-button>
          <a-button type="primary" class="warning" :disabled="record.status!=1" v-if="record.status == 1 || record.status == 3" @click="manualWithdraw(record)"><LikeOutlined /></a-button>
          <a-button type="primary" class="danger" danger ghost :disabled="record.status!=1" v-if="record.status == 1 || record.status == 3" @click="cancel(record)"><CloseOutlined /></a-button>
          <a-button type="primary" ghost v-if="record.status == 2"><QrcodeOutlined /></a-button>
        </a-flex>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted,createVNode } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { getWithdrawServices } from '~/services/memberServices';
import { manualPostWithdrawServices } from '~/services/bankServices';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { cancelPostServices } from '~/services/postCreditService';
import { Alert } from '../Alert/alertComponent';
import { notifyStore } from '~/store/index';
const store = notifyStore();

const dataShow = ref<any[]>([]);
const allRecord = ref<number>(0);
const loading = ref(true);
const open = ref<boolean>(false);
const dataMember = ref<any>({});


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
const data = await getWithdrawServices(formData);
  if (data.status === "success") {
    allRecord.value = data.data.recordsTotal;
    dataShow.value = data.data.data;
  }
  loading.value = false;
}

const closeModal = () => {
  open.value = false;
};

const showModal = (record: any) => {
  console.log("Opening modal with record:", record);  // Debugging log
  open.value = true;
  dataMember.value = record;
};

const cancel = (record:any) => {
  Modal.confirm({
        title: 'คุณต้องการยกเลิกรายการถอน ใช่หรือไหม?',
        icon: createVNode(ExclamationCircleOutlined),
        content: `ยกเลิกรายการถอน ที่ ${record.id}`,
        okText: 'OK',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            loading.value = true;
            const data = await cancelPostServices(record.id);
            if (data.status == 'success') {
                Alert("success", `ยกเลิกรายการถอน ${record.id} เรียบร้อย.`);
                getList();
                store.setNotify({
                    deposit: store.notify.deposit, // ค่าปัจจุบันของ deposit
                    withdraw: (Number(store.notify.withdraw) - 1).toString(), // แปลงเป็น number, คำนวณ, และแปลงกลับเป็น string
                });
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

const manualWithdraw = (record:any) => {
  Modal.confirm({
        title: 'คุณต้องการทำรายการถอนมือ ใช่หรือไหม?',
        icon: createVNode(ExclamationCircleOutlined),
        content: `ทำรายการถอนมือรายการที่ ${record.id}`,
        okText: 'OK',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            loading.value = true;
            const data = await manualPostWithdrawServices(record);
            if (data.status == 'success') {
                Alert("success", `ทำรายการถอนมือรายการที่ ${record.id} เรียบร้อย.`);
                getList();
                store.setNotify({
                    deposit: store.notify.deposit, // ค่าปัจจุบันของ deposit
                    withdraw: (Number(store.notify.withdraw) - 1).toString(), // แปลงเป็น number, คำนวณ, และแปลงกลับเป็น string
                });
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

watch(() => store.notify.withdraw,(newVal, oldVal) => {
    console.log(`notify.notify.withdraw เปลี่ยนจาก ${oldVal} เป็น ${newVal}`);
    getList();
  }
);


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
        { title: 'ธนาคาร', dataIndex: 'bank', key: 'bank', width: 60 },
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
        { title: 'สร้าง', dataIndex: 'created_by_name', key: 'created_by_name', width: 80 },
        { title: 'เเก้ไข', dataIndex: 'updated_by_name', key: 'updated_by_name', width: 80 },
        { title: 'วันที่', dataIndex: 'created_at', key: 'created_at', width: 120 },
        { title: 'จัดการ',key: 'operation',width: 140,},
      ] 
    },
  ];
});

</script>