<template>
    <a-form :model="formData" name="basic" ref="formRef" autocomplete="off">
      <!-- รายการโยกเงินออโต้ -->
        <a-col :span="24" class="p-1">
            <a-col :span="24">
            <label for="จากบัญชี">บัญชีโอนเงิน</label>
            <a-select
                ref="selectFrom"
                v-model:value="formData.bank_tranfer"
                style="width: 100%"
            >
                <a-select-option value="" disabled>เลือกประเภทการใช้งาน</a-select-option>
                <template v-for="option in fileListSelect" :key="option.id">
                <a-select-option :value="option.id">
                    <a-image
                    :src="option.bank.image"
                    :alt="option.bank.name"
                    width="20px"
                    height="20px"
                    :preview="false"
                    />
                    {{ option.book_number }} {{ option.name }}
                </a-select-option>
                </template>
            </a-select>
            </a-col>
        </a-col>
    
        <!-- ธนาคาร -->
        <a-col class="p-1" :span="24">
            <label><b>ธนาคาร</b></label>
            <a-select ref="select" v-model:value="formData.bankId" style="width: 100%">
            <a-select-option value="">เลือกธนาคาร</a-select-option>
            <template v-for="option in optionsBank" :key="option.id">
                <a-select-option :value="option.id">
                <a-image
                    :src="option.image"
                    :alt="option.name"
                    width="20px"
                    height="20px"
                />
                {{ option.name }}
                </a-select-option>
            </template>
            </a-select>
        </a-col>
        <a-col :span="24" class="p-1">
            <label for="จากบัญชี">เลขบัญชี</label>
            <a-input id="inputNumber" v-model:value="formData.bank_no" :min="1" :max="99999"/>
        </a-col>
        <a-col :span="24" class="p-1">
            <label for="จากบัญชี">จำนวนเงินที่ต้องการ</label>
            <a-input-number id="inputNumber" v-model:value="formData.amount" :min="1" :max="99999"/>
        </a-col>
        <a-row justify="center">
            <a-button @click="props.closeModal()" class="m-1">Cancel</a-button>
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="SubmitTranfer()" >โยกเงิน</a-button>
        </a-row>
    </a-form>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive, onMounted } from "vue";
  import { getSystemBankServices,tranferManualServices } from "~/services/bankServices";
  import { fetchBankServices } from "~/services/memberServices"; // ตรวจสอบว่ามี service นี้
  import { Alert } from '../Alert/alertComponent';
  
  interface FileOption {
    id: number;
    book_number: string;
    name: string;
    bank: Bank;
  }
  
  interface Bank {
    image: string;
    name: string;
  }
  
  const props = defineProps<{
        closeModal:Function,
        getTranferMoneyHistory:Function,
    }>();


  // ฟอร์มข้อมูล
  const formData = reactive({
    id: 0,
    bankId: "",
    bank_tranfer: "",
    bank_no: "",
    amount: 0,
  });
  
  // ตัวเลือกบัญชีและธนาคาร
  const fileList = ref<FileOption[]>([]);
  const fileListSelect = ref<FileOption[]>([]);
  const optionsBank = ref<any[]>([]);
  
  // ดึงข้อมูลบัญชีระบบ
  const fetchSystemBankServices = async () => {
    const data = await getSystemBankServices();
    if (data.status) {
      fileList.value = data.data.data;
      fileListSelect.value = data.data.data;
    } else {
      console.error("Error fetching system bank services");
    }
  };
  
  // ดึงข้อมูลการตั้งค่าและธนาคาร
  const getDetailconfigMember = async () => {
    try {
      const data = await fetchBankServices();
      if (data.status === "success") {
        optionsBank.value = data.data || [];
      } else {
        console.error("Error fetching detail config member");
      }
    } catch (error) {
      console.error("Error fetching user roles:", error);
    }
  };

  const SubmitTranfer = async () => {
    try {
      const data = await tranferManualServices(formData);
      if (data.status === "success") {
        Alert('success',data.message)
        props.closeModal()
        props.getTranferMoneyHistory()
      } else {
        console.error("Error fetching detail config member");
        Alert('error',data.message);
      }
    } catch (error) {
      console.error("Error fetching user roles:", error);
    }
  };
  
  // เริ่มต้นการทำงาน
  onMounted(async () => {
    await fetchSystemBankServices();
    await getDetailconfigMember();
  });
  </script>
  
  <style>
  .text-danger {
    color: red;
  }
  .text-success {
    color: green;
  }
  </style>
  