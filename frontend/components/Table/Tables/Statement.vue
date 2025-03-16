<template>
    <a-modal a-modal v-model:open="open" title="รหัสรายการ">
      <a-textarea
        v-model:value="data"
        auto-size
        :readonly="true"
      />
      <template #footer>
        <div class="center">
          <a-button type="primary" ghost @click="open = false"> closs </a-button>
        </div>
      </template>
    </a-modal>
    <a-row class="p-2" justify="space-between">
      <a-col class="p-1">
        <label><br></label>
        <a-button type="primary" @click="getStatement(props.id, '1')" style="margin-right:5px;"><span v-if="props.bankId != 17">รายการทั้งหมด</span><span v-else>รายการฝาก</span></a-button> 
        <a-button type="primary" @click="getStatement(props.id, '2')" v-if="props.bankId == 17">รายการถอน</a-button>
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
        <template v-else-if="column.key === 'status'">
          <a-tag color="green">สำเร็จ</a-tag>
        </template>
        <template v-else-if="column.key === 'date_time'">
          <div v-if="record.date_time != null">{{ record.date_time }}</div>
          <div v-else>{{ dayjs(record.transDate).format('YYYY-MM-DD') }} <br> {{ dayjs(record.transDate).format('HH:mm:ss') }}</div>
        </template>
      </template>
    </a-table>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import { getStatementServices } from '~/services/bankServices';
  import { Alert } from '~/components/Alert/alertComponent';
  import { UndoOutlined } from '@ant-design/icons-vue';
  import dayjs from 'dayjs';
  
  const dataShow = ref<any[]>([]);
  const loading = ref(true);
  const allRecord = ref<number>(0);
  const open = ref<boolean>(false);
  const data = ref<string>("");
  
  const dynamicColumns = computed(() => {
    return [
      {
        title: `ทั้งหมด ${allRecord.value} รายการ`,
        children: [
          { title: 'รหัสรายการ', width: 100, dataIndex: 'report_id', key: 'report_id' },
          { title: 'รายการ', width: 100, dataIndex: 'title', key: 'title' },
          { title: 'ประเภท', width: 100, dataIndex: 'type', key: 'type' },
          { title: 'original_action', width: 100, dataIndex: 'original_action', key: 'original_action' },
          { title: 'ชื่อ', dataIndex: 'sub_title', key: 'sub_title', width: 100 },
          { title: 'จำนวนเงิน', dataIndex: 'amount', key: 'amount', width: 100 },
          { title: 'สถานะ', dataIndex: 'status', key: 'status', width: 100 },
          { title: 'วันที่', dataIndex: 'date_time', key: 'date_time', width: 100 },
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
    bankId: number;
  }>();
  
  const getStatement = async (id: number,type: string) => {
    loading.value = true;
    try {
      const responseData = await getStatementServices(id,type);
      if (responseData.status === "success") {
        dataShow.value = responseData.data; // Correctly assign the data
        allRecord.value = responseData.data.length; // Correctly count and assign the number of records
      } else {
        Alert("error", responseData.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert("error", "An error occurred while fetching data.");
    } finally {
      loading.value = false; // Ensure loading is always set to false after the request
    }
  };
  
  const refresh = () => {
    getStatement(props.id,"1");
  }
  
  watch(() => props.id, (newValue: number) => {
    if (newValue) {
      dataShow.value = [];
      getStatement(newValue,"1");
    }
  }, { immediate: true });
  
  </script>
  