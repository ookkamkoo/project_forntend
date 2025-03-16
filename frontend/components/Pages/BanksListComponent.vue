<template>
  <a-modal v-model:open="open" width="750px" :title="status == 0 ? 'เพิ่มบัญชีธนาคาร' : 'แก้ไขบัญชีธนาคาร'" :closable="true">
    <FormBankForm :closeModal="closeModal" :bankSystemEdit="bankSystemEdit" :getSystemBank="getSystemBank" :status="status"/>
    <template #footer></template>
  </a-modal>
  <a-modal v-model:open="statement" width="1300px" title="รายการจากทางธนาคาร" :closable="true">
    <TableTablesStatement :closeModal="closeModal" :id="idGetStatement" :bankId="BankGetStatement"/>
    <template #footer></template>
  </a-modal>
  <a-modal v-model:open="addCreditFmp" width="1300px" title="รายการเครดิต payment" :closable="true">
    <TableTablesPlaymentStatement :id="idGetStatement"/>
    <template #footer></template>
  </a-modal>
  <a-row class="p-2" justify="end">
    <a-col class="p-1">
      <label><br></label>
      <a-button class="submit sky" type="primary" @click="() => { status = 0; showModal(); }"><PlusOutlined /> เพิ่มบัญชี</a-button>
    </a-col>
  </a-row>
  <a-table 
    :columns="dynamicColumns" 
    :data-source="dataShow" 
    :scroll="{ x: 1500, y: 700 }"
    bordered
    :pagination="{ pageSize: 10 }"
    :loading="loading"
  >
  <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'operation'">
              <a-flex gap="small" :justify="'center'" horizontal>
                  <!-- <a-button v-if="record.bank.id==10 && record.typ != 'ParkingAccount'"><LinkOutlined /></a-button> -->
                  <a-button class="warning" type="primary" @click="() => { status = 1; onEdit(record); }"><FormOutlined /></a-button>
                  <a-button class="danger" type="primary" @click="onDelete(record)"><DeleteOutlined /></a-button>
              </a-flex>
          </template>
          <template v-else-if="column.key === 'type'">
              <a-tag color="green" v-if="record.type == 'deposit'">บัญชีฝาก</a-tag>
              <a-tag color="orange" v-if="record.type == 'withdraw'">บัญชีถอน</a-tag>
              <a-tag color="purple" v-if="record.type == 'SingleAccount'">บัญชีเดียว</a-tag>
              <a-tag color="cyan" v-if="record.type == 'ParkingAccount'">บัญชีพักเงิน</a-tag>
          </template>
          <template v-else-if="column.key === 'is_active'">
            <a-switch v-model:checked="record.is_active" @change="updateStatus(record.name,record.is_active,record.id,index,'status')"/>
          </template>
          <template v-else-if="column.key === 'is_qrcode'">
            <a-switch v-model:checked="record.is_qrcode" @change="updateStatus(record.name,record.is_qrcode,record.id,index,'qrcode')"/>
          </template>
          <template v-else-if="column.key === 'is_api'">
            <a-switch v-model:checked="record.is_api" @change="updateStatus(record.name,record.is_api,record.id,index,'api')"/>
          </template>
          <template v-else-if="column.key === 'is_sms'">
            <a-switch 
                v-model:checked="record.is_sms" 
                @change="updateStatus(record.name, record.is_sms, record.id, index, 'sms')" 
                :disabled="(record.type !== 'deposit' || record.type !== 'SingleAccount') && record.bank.name !== 'ธนาคารไทยพาณิชย์'" 
            />
          </template>
          <template v-else-if="column.key === 'bank'">
            <a-image width="30px" :src="record.bank.image" :preview="false"/>
          </template>
          <template v-else-if="column.key === 'check-connect'">
            <a-button type="dashed" @click="CheckConnect(record.id)" :disabled="isLoadingCheckConnect[record.id]"><a-spin size="small" v-if="isLoadingCheckConnect[record.id]"/> <SwapOutlined v-else/></a-button>
          </template>
          <template v-else-if="column.key === 'statement'">
            <a-button class="sky m-1" type="primary" @click="Statement(record.id,record.bank_id)"><a-spin size="small" v-if="isLoadingStatement"/><BarsOutlined v-else/></a-button>
            <a-button class="sky" type="primary" @click="CreditFmp(record.id,)" v-if="record.bank_id == 17"><PlusOutlined /></a-button>
          </template>
          <template v-else-if="column.key === 'date'">
            <div>{{ dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
          </template>
      </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ref,createVNode } from 'vue';
import dayjs from 'dayjs';
import { getSystemBankServices,updateStatuBankSystem,deleteBankSystemServices,CheckConnectBankSystemServices } from '~/services/bankServices';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Alert } from '../Alert/alertComponent';

const open = ref<boolean>(false);
const statement = ref<boolean>(false);
const addCreditFmp = ref<boolean>(false);
const dataShow = ref<any[]>([]);
const bankSystemEdit = ref<any>();
const active = ref<boolean>(true);
const loading = ref(true);
const allRecord = ref<number>(0);
const isLoadingCheckConnect = ref<Record<number, boolean>>({});
const isLoadingStatement = ref(false);
const idGetStatement = ref(0);
const BankGetStatement = ref(0);
const status = ref(0);

const showModal = () => {
    open.value = true;
  };

const closeModal = () => {
  open.value = false;
};


const dynamicColumns = computed(() => {
    return [
      { 
        title: `ทั้งหมด ${allRecord.value} รายการ`, 
        children: [
      { title: 'ประเภท', width:60, dataIndex: 'type', key: 'type' },
      { title: 'สถานะ', width: 60, dataIndex: 'is_active', key: 'is_active'},
      { title: 'ธนาคาร', dataIndex: 'bank', key: 'bank', width: 60 },
      { title: 'ชื่อนามสกุล', dataIndex: 'name', key: 'name', width: 100 },
      { title: 'เลขบัญชี', dataIndex: 'book_number', key: 'book_number', width: 100 },
      { title: 'ยอดคงเหลือ', dataIndex: 'balance', key: 'balance', width: 80 },
      { title: 'Qrcode', width: 60, dataIndex: 'is_qrcode', key: 'is_qrcode'},
      { title: 'Api', width: 60, dataIndex: 'is_api', key: 'is_api'},
      { title: 'Sms', width: 60, dataIndex: 'is_sms', key: 'is_sms'},
      { title: 'เช็คการเชื่อมต่อ', dataIndex: 'check-connect', key: 'check-connect', width: 60 },
      { title: 'Statement', dataIndex: 'statement', key: 'statement', width: 60 },
      { title: 'วันที่', dataIndex: 'date', key: 'date', width: 80 },
      {
              title: 'แก้ไข / ลบ',
              key: 'operation',
              width: 100,
      }
      ] 
    },
  ];
});

const getSystemBank = async() =>{
    const data = await getSystemBankServices();
    loading.value = true;
    if (data.status === "success") {
        dataShow.value = data.data.data;
        allRecord.value = data.data.recordsTotal;
    } else {
      console.log(data.message);
    }
    loading.value = false;
}

const onEdit = (data:any) => {
    active.value = false;
    bankSystemEdit.value = data
        
    showModal();
}

const updateStatus = async(name: string,status: boolean,id: number,index: number,active:string) =>{
  let is_active = ''; 
    if (status) {
        is_active = 'เปิดใช้งาน ' + active;
    } else {
        is_active = 'ปิดใช้งาน ' + active;
    }

    Modal.confirm({
        title: 'คุณต้องการที่จะเปลี่ยนสถานะใช่ไหม?',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', { key: 'content' }, [`เปลี่ยนสถานะ ${active} ของ ${name} เป็น ${is_active}`]),
        async onOk() {
            const data = await updateStatuBankSystem(id, status,active);
            loading.value = true;
            if (data.status == 'success') {
                Alert("success", "เปลี่ยนสถานะเรียบร้อย.");
                getSystemBank();
            } else {
                getSystemBank();
                Alert("error", data.message);
            }
            loading.value = false;
        },
        onCancel() {
          if(active == "status"){
            dataShow.value[index].is_active = !status;
          }else if(active == "api"){
            dataShow.value[index].is_api = !status;
          }else if(active == "sms"){
            dataShow.value[index].is_sms = !status;
          }else if(active == "qrcode"){
            dataShow.value[index].is_qrcode = !status;
          }
          console.log('Cancel');
        },
        class: 'test',
    });
}

const onDelete = (record:any) => {
  Modal.confirm({
        title: 'คุณต้องลบบัญชี ใช่หรือไหม?',
        icon: createVNode(ExclamationCircleOutlined),
        content: `ลบบัญชี ชื่อ ${record.book_number}`,
        okText: 'OK',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            const data = await deleteBankSystemServices(record.id);
            loading.value = true;
            if (data.status == 'success') {
                Alert("success", `ลบโปรโมชั่น ${record.book_number} เรียบร้อย.`);
                getSystemBank();
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

onMounted(() => {
  getSystemBank();
});

const CheckConnect = async(id: number) =>{
  isLoadingCheckConnect.value[id] = true;
  const data = await CheckConnectBankSystemServices(id);
    if (data.status === "success") {
        getSystemBank();
        Alert("success", `บัญชีธนาคารเชื่อมต่อกับทางธนาคาร`);
    } else {
        // Alert('error', data.message);
    }
    isLoadingCheckConnect.value[id] = false;
}

const Statement = async(id: number,bank: number) =>{
  isLoadingStatement.value = true
  idGetStatement.value = id
  isLoadingStatement.value = false
  statement.value = true
  BankGetStatement.value = bank
}
const CreditFmp = async(id: number) =>{
  addCreditFmp.value = true
  idGetStatement.value = id
}
</script>