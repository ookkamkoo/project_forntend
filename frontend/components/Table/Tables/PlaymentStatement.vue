<template>
    <a-modal v-model:open="openDetail" title="รายละเอียด" width="750px">
      <pre style="white-space: pre-wrap; word-wrap: break-word;">
        {{"\n"}}{{ JSON.stringify(detail, null, 2) }}
    </pre>
    </a-modal>
    <a-modal a-modal v-model:open="open" title="กรอกธนาคารที่ใช้โอนเงิน">
      <a-row class="my-3" v-if="active==1">
        <a-col :span="24" class="my-1" style="margin: auto auto;">
          <a-col :span="24" class="input-withdraw my-1">
            <label><b>ธนาคาร</b></label>
            <a-select ref="select" v-model:value="formData.bankId" style="width: 100%">
                <a-select-option value="">เลือกธนาคาร</a-select-option>
                <template v-for="option in optionsBank" :key="option.name">
                <a-select-option :value="option.id" v-if="option.show">
                    <template #default>
                    <a-image :src="option.image" :alt="option.name" width="20px" height="20px" />
                    {{ option.name }}
                    </template>
                </a-select-option>
                </template>
            </a-select>
          </a-col>
          <a-col :span="24" class="input-withdraw my-1">
              <label for="เลขบัญชี">เลขบัญชี</label>
              <a-input-group compact>
                <a-input v-model:value="formData.bankNo" placeholder="เลขบัญชี"/>
              </a-input-group>
          </a-col>
          <a-col :span="24" class="input-withdraw my-1">
              <label for="ชื่อ-นามสกุล">ชื่อ-นามสกุล</label>
              <a-input-group compact>
                <a-input v-model:value="formData.name" placeholder="ชื่อ-นามสกุล"/>
              </a-input-group>
          </a-col>
          <a-col :span="24" class="input-withdraw my-1">
              <label for="จำนวนเงิน">จำนวนเงิน</label>
              <a-input-group compact>
                <a-input-number
                id="inputNumber"
                v-model:value="formData.amount"
                min="20"
                max="50000"
                style="width: 100%; font-weight: 600; text-align: center"
                class="centered-input"
                size="large"
                :controls="false"
              />
              </a-input-group>
          </a-col>
        </a-col>
      </a-row>
      <a-row class="my-3" v-if="active==2" :justify="'center'">
        <a-qrcode
          :error-level="'L'"
          :value="qr"
        />
      </a-row>
      <a-row class="my-3" v-if="active==2" :justify="'center'">
        <a-col :span="24" class="center m-1"><b>{{ amount }}</b></a-col>
        <a-col :span="24" class="center m-1"><div>เวลาคงเหลือ {{ countdown }} วิ</div> </a-col>
      </a-row>
      <template #footer>
        <a-col :span="24">
          <a-row justify="center" class="p-2">
              <a-button @click="open = false" class="m-1">Cancel</a-button>
              <a-button type="primary" :loading="load" class="m-1 sky" @click="addCreditFmp()" v-if="active==1">สร้าง QR Code</a-button>
              <a-button type="primary" danger  :loading="load" class="m-1 sky" @click="closeFmp()" v-if="active==2">ยกเลิกการนับเวลา</a-button>
          </a-row>
        </a-col>
      </template>
    </a-modal>
    <a-row class="p-2" justify="space-between">
      <a-col class="p-1">
        <label><br></label>
        <a-button type="primary" @click="open=true" style="margin-right:5px;"><span>เพิ่มเครดิต Payment</span></a-button> 
      </a-col>
      <a-col class="p-1">
        <label><br></label>
        <a-button class="submit sky" type="primary" @click="refresh" ghost>
          <UndoOutlined /> รีเฟรช
        </a-button>
      </a-col>
    </a-row>
    <a-table
      :columns="dynamicColumns"
      :data-source="dataShow"
      bordered
      :scroll="{ x: 800, y: 700 }"
      :pagination="{ pageSize: 20 }"
      :loading="loading"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'report_id'">
          <a-button @click="showReportId(record.report_id,record.origRqUid,record.referenceId)">show</a-button>
        </template>
        <template v-else-if="column.key === 'title'">
          <div v-if="record.title == 'Receive money from' || record.transNameTh == 'รับโอนเงิน'">
            <a-tag color="green">เงินเข้าบัญชี</a-tag>
          </div>
          <div v-else-if="record.title == 'Transfer to' || record.message == 'โอนเรียบร้อย'">
            <a-tag color="red">เงินออกบัญชี</a-tag>
          </div>
          <div v-else>
            <a-tag color="purple">{{ record.title }} {{ record.transNameTh }}</a-tag>
          </div>
        </template>
        <template v-else-if="column.key === 'type'">
          <div v-if="record.type != null">{{ record.type }}</div>
          <div v-else>{{ record.transNameTh }}</div>
          <div v-if="record.clientId != null">โอนเงิน payment</div>
        </template>
        <template v-else-if="column.key === 'original_action'">
          <div v-if="record.original_action != null">{{ record.original_action }}</div>
          <div v-else>{{ record.toAccountBank }}</div> <div>{{ record.toAccountNumber }}</div> <div>{{ record.transactionId }}</div>
        </template>
        <template v-else-if="column.key === 'sub_title'">
          <div v-if="record.sub_title != null">{{ record.sub_title }}</div>
          <div v-else><div>{{ record.fromAccountNameEn }}</div> <div>{{ record.fromAccountNameTh }}</div>  <div>{{ record.benefitAccountNameTh }}</div> <div>{{ record.systemBankAccountName }}</div></div>
        </template>
        <template v-else-if="column.key === 'amount'">
          <div v-if="record.amount != null">{{ record.amount }}</div>
          <div v-else>{{ record.depositAmount }} {{ record.withdrawAmount }}</div>
        </template>
        <template v-if="column.key === 'status'">
          <a-tag color="orange" v-if="record.status == 1">รอทำรายการ</a-tag>
          <a-tag color="green" v-else-if="record.status == 2">สำเร็จ</a-tag>
          <a-tag color="red" v-else-if="record.status == 3">ยกเลิก</a-tag>
          <a-tag color="red" v-else-if="record.status == 4">หมดเวลา</a-tag>
          <a-tag color="orange" v-else-if="record.status == 7">กำลังประมวลผล</a-tag>
          <a-tag color="red" v-else-if="record.status == 8">ถูกยกเลิก</a-tag>
        </template>
        <template v-else-if="column.key === 'created_at'">
          <div v-if="record.date_time != null">{{ record.date_time }}</div>
          <div v-else>{{ dayjs(record.transDate).format('YYYY-MM-DD') }} <br> {{ dayjs(record.transDate).format('HH:mm:ss') }}</div>
        </template>
        <template v-else-if="column.key === 'detail'">
          <a-button type="primary" class="sky" @click="showModal(record)"><FileOutlined /></a-button>
      </template>
      </template>
    </a-table>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import { getCreditFmpServices,CreateQrCodeFmp } from '~/services/bankServices';
  import { getDetailconfigMember } from '~/services/memberServices';
  import { UndoOutlined } from '@ant-design/icons-vue';
  import dayjs from 'dayjs';
  
  const dataShow = ref<any[]>([]);
  const loading = ref(true);
  const load = ref(false);
  const allRecord = ref<number>(0);
  const active = ref<number>(1);
  const open = ref<boolean>(false);
  const data = ref<string>("");
  const qr = ref<string>("");
  const amount = ref<string>("");
  const optionsBank = ref<any[]>([]);
  const countdown = ref(300);
  let timer: number | null = null; 
  const openDetail = ref<boolean>(false);
  const detail = ref<any>();
  

  let formData = reactive({
      name:"",
      bankNo:"",
      amount: 0,
      bankId:10
    });
  
  const showModal = (data:any) => {
    openDetail.value = true;
    detail.value = data
  };

  const dynamicColumns = computed(() => {
    return [
      {
        title: `ทั้งหมด ${allRecord.value} รายการ`,
        children: [
          { title: 'id', width: 100, dataIndex: 'id', key: 'id' },
          { title: 'ประเภท', width: 100, dataIndex: 'type', key: 'type' },
          { title: 'ธนาคาร', width: 100, dataIndex: 'bank_system_no', key: 'bank_system_no' },
          { title: 'ยอดเงิน', dataIndex: 'amount', key: 'amount', width: 70 },
          { title: 'สถานะ', dataIndex: 'status', key: 'status', width: 100 },
          { title: 'วันที่', dataIndex: 'created_at', key: 'created_at', width: 100 },
          { title: 'รายละเอียด', dataIndex: 'detail', key: 'detail', width: 80 },
        ]
      }
    ];
  });
  
  const showReportId = (report_id:string,origRqUid:string,referenceId:string) =>{
    if(report_id != undefined){
      data.value = report_id
    }else if(referenceId != undefined){
      data.value = referenceId
    }else{
      data.value = origRqUid
    }
    open.value = true
  }

  const props = defineProps<{
    id: number;
  }>();
  
  const getStatement = async (id: number) => {
    loading.value = true;
    try {
      const responseData = await getCreditFmpServices(id);
      if (responseData.status === "success") {
        dataShow.value = responseData.data; // Correctly assign the data
        allRecord.value = responseData.data.length; // Correctly count and assign the number of records
      } else {
        // Alert("error", responseData.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Alert("error", "An error occurred while fetching data.");
    } 
    loading.value = false;
  };

  const addCreditFmp = async () => {
    load.value = true;
    try {
      const responseData = await CreateQrCodeFmp(props.id,formData);
      if (responseData.status === "success") {
        if(responseData.data.qrcode != ""){
          active.value = 2
          qr.value = responseData.data.qrcode
          amount.value = responseData.data.amount
        }
        // dataShow.value = responseData.data; // Correctly assign the data
        // allRecord.value = responseData.data.length; // Correctly count and assign the number of records
      } else {
        // Alert("error", responseData.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Alert("error", "An error occurred while fetching data.");
    }
    load.value = false; 
  };
  
  const refresh = () => {
    getStatement(props.id);
  }

  const closeFmp = () => {
    active.value=1
  }
  
  watch(() => props.id, (newValue: number) => {
    if (newValue) {
      dataShow.value = [];
      getStatement(newValue);
    }
  }, { immediate: true });
  
  onMounted(() => {
      timer = window.setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--;
      } else {
        clearInterval(timer as number);
        active.value = 2
        qr.value = ""
        // formState.amount = 1
        countdown.value = 300
      }
    }, 1000);
  });

  onMounted(async () => {
      try {
        const data = await getDetailconfigMember();
        if (data.status === "success") {
            optionsBank.value = data.data.Bank
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
      }

    });

  </script>
  