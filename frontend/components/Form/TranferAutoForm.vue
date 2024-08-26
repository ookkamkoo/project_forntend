<template>
    <a-form
        :model="formData"
        name="basic"
        ref="formRef"
        autocomplete="off"
        @finish="handleFinish"
    >   
        <a-col :span="24" class="p-1">
            <label for="จากบัญชี">รายการบัญชีโยกเงินออโต้</label>
            <a-select
                ref="select"
                v-model:value="formData.bank_tranfer_type"
                style="width: 100%"
                >
                <a-select-option value="transfer">โอนเงินปกติ ( เช็คยอดเงินจาก บัญชีโอนเงิน)</a-select-option>
                <a-select-option value="pullMoney">ดึงเงิน ( เช็คยอดเงินจาก บัญชีรับเงิน)</a-select-option>
            </a-select>
        </a-col>
        <a-col :span="24" class="p-1">
            <label for="จากบัญชี" >บัญชี โอนเงิน</label>
            <a-select ref="selectFrom" v-model:value="formData.bank_tranfer" style="width: 100%" @change="handleBankTranferChange">
                <a-select-option value="" disabled>เลือกประเภทการใช้งาน</a-select-option>
                <template v-for="option in fileListSelect" :key="option.id" >
                    <a-select-option :value="option.id">
                        <template #default>
                            <a-image :src="option.bank.image" :alt="option.bank.name" width="20px" height="20px" :preview="false"/>
                            {{ option.book_number }}
                            {{ option.name }}
                        </template>
                    </a-select-option>
                </template>
            </a-select>
        </a-col>

        <a-col :span="24" class="p-1">
            <label for="จากบัญชี" >บัญชี รับเงิน</label>
            <a-select ref="selectTo" v-model:value="formData.bank_tranfer_to" style="width: 100%">
                <a-select-option value="" disabled>เลือกประเภทการใช้งาน</a-select-option>
                <template v-for="option in filteredOptions" :key="option.id">
                    <a-select-option :value="option.id">
                        <template #default>
                            <a-image :src="option.bank.image" :alt="option.bank.name" width="20px" height="20px" :preview="false"/>
                            {{ option.book_number }}
                            {{ option.name }}
                        </template>
                    </a-select-option>
                </template>
            </a-select>
        </a-col>

        <a-col :span="24" class="p-1">
            <label for="จากบัญชี">เมื่อเงินมี <span v-if="formData.bank_tranfer_type == 'transfer'" class="text-danger">( มากกว่า )</span> <span v-else class="text-danger">( น้อยกว่า )</span></label>
            <a-input-number id="inputNumber" v-model:value="formData.amount_more" :min="1" :max="99999" />
        </a-col>
        <a-col :span="24" class="p-1">
            <label for="จากบัญชี">จำนวนเงินที่ต้องการ</label>
            <a-input-number id="inputNumber" v-model:value="formData.amount" :min="1" :max="99999" />
        </a-col>
        <a-col :span="24" class="p-1">
            <h4>รายละเอียด</h4>
            <p> <b>โอนเงินปกติ</b> คือการทำรายการจาก <b>บัญชีโอนเงิน -> บัญชีรับเงิน</b> เช็คยอดเงินจาก<span class="text-danger">บัญชีโอนเงิน</span> เช่น <span class="text-danger">บัญชีโอนเงิน</span>มียอดเงินมากกว่า 3000 ถึงจะทำรายการ</p>
            <p> <b>ดึงเงิน</b> คือการทำรายการจาก <b>บัญชีโอนเงิน -> บัญชีรับเงิน</b> เช็คยอดเงินจาก<span class="text-success">บัญชีรับเงิน</span> เช่น <span class="text-success">บัญชีรับเงิน</span>มีเงินน้อยกว่า 3000 ถึงจะทำรายการ</p>
        </a-col>
        <a-row justify="center">
            <a-button @click="props.closeModal()" class="m-1">Cancel</a-button>
            <a-button type="primary" html-type="submit" class="m-1 sky">เพิ่ม</a-button>
        </a-row>
    </a-form>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { getSystemBankServices } from '~/services/bankServices';
import { createTranferAutoServices,editTranferAutoServices } from '~/services/tranferAutoServices';
import { Alert } from '../Alert/alertComponent';

// Define the types for better TypeScript support
interface Bank {
    image: string;
    name: string;
}

interface FileOption {
    id: number;
    book_number: string;
    name: string;
    bank: Bank;
}

const props = defineProps<{
        closeModal:Function,
        tranferAutoEdit:Function,
        getTranferAuto:Function,
        active:boolean,
    }>();

const fileList = ref<FileOption[]>([]);
const fileListSelect = ref<FileOption[]>([]);
const formData = reactive({
    id: 0,
    bank_tranfer: '',
    bank_tranfer_to: '',
    amount_more: 0,
    amount: 0,
    bank_tranfer_type: 'transfer',
});

watch(() => props.tranferAutoEdit, (newValue:any) => {
        console.log(newValue);
        
        if (props.active) {
            console.log('sssssssssssssssss');
            formData.id = 0;
            formData.bank_tranfer = '';
            formData.bank_tranfer_to = '';
            formData.amount_more = 0;
            formData.amount = 0;
            formData.bank_tranfer_type= 'transfer';
        }else{
            console.log('11111111111111111');
            formData.id = newValue.id;
            formData.bank_tranfer = newValue.bank_id;
            formData.bank_tranfer_to = newValue.bank_to_id;
            formData.amount_more = newValue.amount_more;
            formData.amount = newValue.amount;
            formData.bank_tranfer_type= newValue.bank_tranfer_type;
        } 
    }, { immediate: true });

// Computed property to filter options for the second select list
const filteredOptions = computed(() => {
    return fileListSelect.value.filter(option => option.id.toString() !== formData.bank_tranfer.toString());
});

const fetchSystemBankServices = async () => {
    const data = await getSystemBankServices();
    if (data.status) {
        fileList.value = data.data;
        fileListSelect.value = data.data;
    } else {
        console.log("TransferAuto error");
    }
};

const handleBankTranferChange = () => {
    formData.bank_tranfer_to = ''
}

onMounted(fetchSystemBankServices);

const handleFinish = (values: any) => {
        if(formData.bank_tranfer == '' || formData.bank_tranfer_to == ''){
            Alert('error',"กรุณากรอกข้อมูลให้กรอบ!!");
        }else{
            handleSubmit();
        }
    };

const handleSubmit = async() => {
    if(props.active){
        const data = await createTranferAutoServices(formData);
        if(data.status == "success"){
            Alert('success','เพิ่มบัญชีโยกเงินเรียบร้อย.')
            props.closeModal()
            props.getTranferAuto();
        }else{
            Alert('error',data.message);
        }
    }else{
        const data = await editTranferAutoServices(formData);
        if(data.status == "success"){
            Alert('success','เเก่ไขบัญชีโยกเงินเรียบร้อย.')
            props.closeModal()
            props.getTranferAuto();
        }else{
            Alert('error',data.message);
        }
    }
};    
</script>
<style>
.text-danger{
    color: red;
}
.text-success{
    color: green;
}
</style>