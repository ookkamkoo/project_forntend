<template>
  <!-- Loading Spinner Overlay -->
    <a-col :span="24" class="my-2 content-wrapper">
      <div v-if="loading" class="loading-overlay">
          <a-spin :spinning="loading" size="large" />
      </div>
      <!-- Bank Selection -->
      <h3>บัญชีลูกค้า</h3>
      <a-flex :align="'center'" class="my-2" :justify="'center'" wrap="wrap">
        <a-col :span="12" :md="7" class="px-1" @click="handleMemberBank(member.bank_id)">
          <a-col :span="24" :sm="24" class="my-1 bank-member">
            <a-flex
              class="info-bank mx-1 p-2"
              :class="{'clicked': formData.bankMemberId != 16}"
              :align="'center'"
              :justify="'center'"
              wrap="wrap"
            >
              <a-col :span="24" class="center info-image">
                <!-- Only display image if member.bank is defined -->
                <a-image v-if="member.bank && member.bank.image" :width="60" :preview="false" :src="member.bank.image" />
              </a-col>
              <a-col :span="24" class="center bank-member-detail">
                <div class="bank">
                  <span class="bank-title" v-if="member.bank">{{ member.bank.name }}</span>
                </div>
                <div class="name">
                  <span class="name-title">{{ member.firstname }} {{ member.lastname }}</span>
                </div>
                <div class="bank-number">
                  <span class="bank-number-title">{{ member.bank_no }}</span>
                </div>
              </a-col>
            </a-flex>
          </a-col>
        </a-col>
        <a-col :span="12" :md="7" class="px-1" @click="handleMemberBank(16)" v-if="member.bank_true_no !=''">
          <a-col :span="24" :sm="24" class="my-1 bank-member">
            <a-flex
              class="info-bank mx-1 p-2"
              :class="{'clicked': formData.bankMemberId == 16}"
              :align="'center'"
              :justify="'center'"
              wrap="wrap"
            >
              <a-col :span="24" class="center info-image">
                <a-image
                  v-if="member.bank_true && member.bank_true.image"
                  :width="60"
                  :preview="false"
                  :src="member.bank_true.image"
                />
              </a-col>
              <a-col :span="24" class="center bank-member-detail">
                <div class="bank">
                  <span class="bank-title" v-if="member.bank_true">{{ member.bank_true.name }}</span>
                </div>
                <div class="name">
                  <span class="name-title">{{ member.firstname }} {{ member.lastname }}</span>
                </div>
                <div class="bank-number">
                  <span class="bank-number-title">{{ member.bank_true_no }}</span>
                </div>
              </a-col>
            </a-flex>
          </a-col>
        </a-col>
      </a-flex>

      <a-col :span="24" class="px-1" :align="'center'">
        <h3>จำนวนเงินที่ถอน</h3>
        <h2 class="amount-withdraw">{{ Number(props.dataMember.amount).toFixed(2) }}</h2>
      </a-col>

      <h3>บัญชีระบบ</h3>
      <a-flex :align="'center'" class="my-2" :justify="'center'" wrap="wrap">
        <!-- Looping through the bank list and applying the condition -->
        <template v-for="(v, index) in bankData" >
            <a-col 
            :span="12" 
            :md="7" 
            :key="v.id" 
            class="px-1" 
            v-if="(formData.bankMemberId == 16 && v.bank_id == 16) || (formData.bankMemberId != 16)"
          >
            <a-col :span="24" :sm="24" class="my-1 bank-member" @click="handleBankClick(index, v)">
              <a-flex 
                class="info-bank mx-1 p-2" 
                :class="{ 'clicked': clickedIndex === index }" 
                :align="'center'" 
                :justify="'center'" 
                wrap="wrap"
              >
                <a-col :span="24" class="center info-image">
                  <a-image :width="60" :preview="false" :src="v.bank.image" />
                </a-col>
                <a-col :span="24" class="center bank-member-detail">
                  <div class="bank">
                    <span class="bank-title">{{ v.bank.name }}</span>
                  </div>
                  <div class="name">
                    <span class="name-title">{{ v.name }}</span>
                  </div>
                  <div class="bank-number">
                    <span class="bank-number-title">{{ v.book_number }}</span>
                  </div>
                </a-col>
              </a-flex>
            </a-col>
          </a-col>
        </template>
      </a-flex>
      <a-col>
        <h4>เงื่อนไข</h4>
        <p>1.การโอนเงินทุกครั้งกรุณาตรวจเช็คความเรียบร้อย</p>
        <p>2.เมื่อโอนเงินเสร็จเเล้วกรุณาตรวจเช็ครายการอีกครั้ง</p>
      </a-col>
      <a-col v-if="(formData.bankSystemBankId == 16 && formData.bankMemberId != 16)">
          <h4>เงื่อนไขจากทางทรูวอเล็ต โอนไปยัง ธนาคาร</h4>
          <p>1.ค่าธรรมเนียมการโอนเงินไปบัญชีธนาคาร 20 บาท ต่อรายการ</p>
          <p>2.เงินจะโอนเข้าบัญชีธนาคารผู้รับภายใน 2 ชั่วโมง </p>
          <p>3.หากคุณทำรายการระหว่างช่วงเวลา 23.00 – 2:00 น. เงินจะเข้าบัญชีผู้รับภายใน 4:00 น.</p>
      </a-col>
      <!-- Action Buttons -->
      <a-flex :justify="'center'" :align="'center'" class="mt-4">
        <a-button size="large" type="primary" class="mx-2" style="width: 150px;" danger @click="props.closeModal">ยกเลิก</a-button>
        <a-button size="large" type="primary" class="mx-2" style="width: 150px;" @click="confirmWithdraw" :loading="btnloading">ถอนเงิน</a-button>
      </a-flex>
    </a-col>
</template>

<script lang="ts" setup>
  import { getbankWithdrawServices,confirmWithdrawServices } from '~/services/bankServices';
  import { ref } from 'vue';
  import { Alert } from '../Alert/alertComponent';
  
  const props = defineProps<{
        closeModal: () => void,
        dataMember: any
    }>();
  
  let formData = reactive({
    postId:0,
    memberId:0,
    bankMemberId:0,
    bankSystemId:0,
    bankSystemBankId:0
  });
  const bankData = ref<any[]>([]);
  const member = ref<any>({});
  const clickedIndex = ref<number>(0);  // Default to first item
  const loading = ref<boolean>(true);
  const btnloading = ref<boolean>(false);

  const getbankWithdraw = async () => {
    const data = await getbankWithdrawServices(props.dataMember.member_id);
    if (data.status === 'success') {
      bankData.value = data.data.data;
      member.value = data.data.member;
      
      formData.bankSystemId = data.data.data[0].id
      formData.bankSystemBankId = data.data.data[0].bank_id
    }
    setTimeout(() => {
      loading.value = false;
    }, 300);
  };

  const handleBankClick = (index: number,data :any) => {
      clickedIndex.value = index;
      formData.bankSystemId = data.id
      formData.bankSystemBankId = data.bank_id
  };

  const handleMemberBank = (bankID: number) => {
      formData.bankMemberId = bankID
  };
  
  const confirmWithdraw = async() =>{
    btnloading.value = true
    const data = await confirmWithdrawServices(formData);
    if (data.status === 'success') {
      Alert("success", `ทำรายการถอนเรียบร้อย.`);
    }else{
      Alert("error", data.message);
    }
    btnloading.value = false
  }

  watch(() => props.dataMember, (newValue) => {
  if (newValue) {
    formData.postId = newValue.id
    formData.memberId = newValue.member_id
    formData.bankMemberId = newValue.bank_member_id
  }
  getbankWithdraw();
}, { immediate: true });
</script>
<style>

.loading-overlay {
  position: absolute;
  text-align: center;
  background: rgb(255, 255, 255);
  width: 100%;
  height: 105%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 2s ease;
  opacity: 1;
}

.content-wrapper{
  position: relative;
}

.bank-member-detail {
  margin-top: 1rem;
  text-align: center;
}
.info-bank {
  border-radius: 10px;
  border: 2px solid #2cd8d5;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: white; /* เพิ่มพื้นหลังสีขาว */
}
.info-bank:hover {
  cursor: pointer;
  background-color: #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.clicked {
  background-image: linear-gradient(-225deg, #2cd8d5 0%, #c5c1ff 56%, #ffbac3 100%) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
a-button {
  font-weight: bold;
  border-radius: 10px;
}
.mx-2 {
  margin-left: 8px;
  margin-right: 8px;
}
.mt-4 {
  margin-top: 1.5rem;
}
.amount-withdraw{
  color: #2cd8d5;
}
</style>