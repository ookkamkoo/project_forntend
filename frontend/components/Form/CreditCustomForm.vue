<template>
    <a-form
        :model="formData"
        name="basic"
        ref="formRef"
        autocomplete="off"
        @finish="handleFinish"
        @finishFailed="onFinishFailed"
    >
        <a-row class="my-2">
            <a-col :span="24" :md="8" class="p-1">
                <label for="ประเภทการใช้งาน"><b  class="request">ประเภทการใช้งาน</b></label>
                <a-select
                    v-model:value="formData.creditCustomType"
                    style="width: 100%"
                    :options="Constants.creditCustom"
                ></a-select>
            </a-col>
            <a-col :span="24" :md="8" class="p-1">
                <label for="ประเภทการใช้งาน"><b  class="request">ยูซเซอร์เนม</b></label>
                <a-form-item
                        name="username"
                        :rules="[{ required: true, message: 'โปรดกรอกยูซเซอร์เนม!' }]"
                    >
                    <a-input v-model:value="formData.username" placeholder="ยูซเซอร์เนม"/>
                </a-form-item>  
            </a-col>
            <a-col :span="24" :md="8" class="p-1">
                <label for="ประเภทการใช้งาน"><b  class="request">จำนวนเงิน</b></label>
                <a-form-item
                            name="amount"
                            :rules="[{ required: true, message: 'โปรดกรอกจำนวนเงิน!' }]"
                        >
                        <a-input-number v-model:value="formData.amount" placeholder="จำนวนเงิน" :rules="[{ required: true, message: 'โปรดกรอกจำนวนเงิน!' }]"/>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row v-if="formData.creditCustomType == 1">
            <a-col :span="8" :md="6" class="p-1 my-1">
                <label for="ประเภทการใช้งาน"><b  class="request">FOOTBALL</b></label>
                <a-input-number v-model:value="formData.turn.football" placeholder="จำนวนเงิน" />
            </a-col>
            <a-col :span="8" :md="6" class="p-1 my-1">
                <label for="ประเภทการใช้งาน"><b  class="request">STEP</b></label>
                <a-input-number v-model:value="formData.turn.step" placeholder="จำนวนเงิน" />
            </a-col>
            <a-col :span="8" :md="6" class="p-1 my-1">
                <label for="ประเภทการใช้งาน"><b  class="request">PARLAY</b></label>
                <a-input-number v-model:value="formData.turn.parlay" placeholder="จำนวนเงิน" />
            </a-col>
            <a-col :span="8" :md="6" class="p-1 my-1">
                <label for="ประเภทการใช้งาน"><b  class="request">GAME</b></label>
                <a-input-number v-model:value="formData.turn.game" placeholder="จำนวนเงิน" />
            </a-col>
            <a-col :span="8" :md="6" class="p-1 my-1">
                <label for="ประเภทการใช้งาน"><b  class="request">CASINO</b></label>
                <a-input-number v-model:value="formData.turn.casino" placeholder="จำนวนเงิน" />
            </a-col>
            <a-col :span="8" :md="6" class="p-1 my-1">
                <label for="ประเภทการใช้งาน"><b  class="request">LOTTO</b></label>
                <a-input-number v-model:value="formData.turn.lotto" placeholder="จำนวนเงิน" />
            </a-col>
            <a-col :span="8" :md="6" class="p-1 my-1">
                <label for="ประเภทการใช้งาน"><b  class="request">M2</b></label>
                <a-input-number v-model:value="formData.turn.m2" placeholder="จำนวนเงิน" />
            </a-col>
            <a-col :span="8" :md="6" class="p-1 my-1">
                <label for="ประเภทการใช้งาน"><b  class="request">MULTI_PLAYER</b></label>
                <a-input-number v-model:value="formData.turn.multi_player" placeholder="จำนวนเงิน" />
            </a-col>
            <a-col :span="8" :md="6" class="p-1 my-1">
                <label for="ประเภทการใช้งาน"><b  class="request">KENO</b></label>
                <a-input-number v-model:value="formData.turn.keno" placeholder="จำนวนเงิน" />
            </a-col>
            <a-col :span="8" :md="6" class="p-1 my-1">
                <label for="ประเภทการใช้งาน"><b  class="request">E_SPORT</b></label>
                <a-input-number v-model:value="formData.turn.esport" placeholder="จำนวนเงิน" />
            </a-col>
            <a-col :span="8" :md="6" class="p-1 my-1">
                <label for="ประเภทการใช้งาน"><b  class="request">TRADING</b></label>
                <a-input-number v-model:value="formData.turn.tranding" placeholder="จำนวนเงิน" />
            </a-col>
            <a-col :span="8" :md="6" class="p-1 my-1">
                <label for="ประเภทการใช้งาน"><b  class="request">POKER</b></label>
                <a-input-number v-model:value="formData.turn.poker" placeholder="จำนวนเงิน" />
            </a-col>
            <a-col :span="24" :md="24" class="p-1">
                <div class="mx-1 center">
                    <br>
                    <a-button class="sky mx-1" type="primary" @click="addTurn()">เพิ่มเทิร์น</a-button>
                    <a-button class="danger" type="primary" @click="removeTurn()">ลดเทิร์น</a-button>
                </div>
            </a-col>
        </a-row>
        <a-row v-if="formData.creditCustomType == 3">
            <a-col :span="8" :md="8" class="p-1 my-1">
                <label for="วันที่สลิป"><b  class="request">วันที่สลิป</b></label>
                <a-date-picker v-model:value="formData.date" />
            </a-col>
            <a-col :span="8" :md="8" class="p-1 my-1">
                <label for="เวลาสลิป"><b  class="request">เวลาสลิป</b></label>
                <a-time-picker v-model:value="formData.time" :format="'HH:mm'"/>
            </a-col>
            <a-col :span="8" :md="8" class="p-1 my-1">
                <label for="บัญชี"><b  class="request">บัญชีรับเงิน</b></label>
                <a-form-item
                        name="bank_receives_id"
                        :rules="[{ required: true, message: 'โปรดเลือกบัญชีรับเงิน!' }]"
                    >
                    <a-select ref="select" v-model:value="formData.bank_receives_id" style="width: 100%" >
                        <a-select-option value="">บัญชีรับเงิน</a-select-option>
                        <template v-for="option in dataShow" :key="option.name">
                        <a-select-option :value="option.id">
                            <template #default>
                                <div class="image-center">
                                    <img :alt="option.bank.name" width="20px" height="20px" class="ant-image-img px-1" :src="option.bank.image" style="height: 20px;">
                                    {{ option.name }}
                                    {{ option.book_number }}
                                </div>
                            </template>
                        </a-select-option>
                        </template>
                    </a-select>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="24" :md="24" class="p-1 my-1">
                <label for="ประเภทการใช้งาน"><b  class="request">หมายเหตุ</b></label>
                <a-form-item
                        name="remark"
                        :rules="[{ required: true, message: 'โปรดกรอกหมายเหตุ!' }]"
                    >
                    <a-textarea v-model:value="formData.remark" />
                </a-form-item>
            </a-col>
        </a-row>
        <a-row justify="center">
            <a-button @click="props.closeModal()" class="m-1">Cancel</a-button>
            <a-button type="primary" html-type="submit" class="m-1 sky">เเก้ไขเครดิต</a-button>
        </a-row>
    </a-form>
</template>
<script lang="ts" setup>
    import { getSystemBankServices } from '~/services/bankServices';
    import { creditCustom } from '~/services/creditService';
    import * as Constants from '../Constants/Constants';
    import dayjs, { Dayjs } from 'dayjs';
    import { Alert } from '../Alert/alertComponent';
    
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const dataShow = ref<any[]>([]);

    let formData = reactive({
        id: 0,
        creditCustomType:1,
        username:'',
        amount:'',
        turn:{
            football:1,
            step:1,
            parlay:1,
            game:1,
            casino:1,
            lotto:1,
            m2:1,
            multi_player:1,
            keno:1,
            esport:1,
            tranding:1,
            poker:1,
        },
        bank_receives_id:1,
        date:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
        time:dayjs('00:00', 'HH:mm'),
        remark:'',
    });

    const props = defineProps<{
        closeModal:Function,
        getCreditCustom:Function,
    }>();

    const handleFinish = () => {
        handleSubmit();
    };

    const handleSubmit = async() => {
        const data = await creditCustom(formData);
        if(data.status == "success"){
            Alert('success','เเก้ไขเครดิตลูกค้าสำเร็จ.')
            props.closeModal()
            props.getCreditCustom();
        }else{
            Alert('error',data.message);
        }
        
    };

    const addTurn = () => {
        Object.keys(formData.turn).forEach((key) => {
            const turnKey = key as keyof typeof formData.turn;
            formData.turn[turnKey] += 1;
        });
    };

    const removeTurn = () => {
        Object.keys(formData.turn).forEach((key) => {
            const turnKey = key as keyof typeof formData.turn;
            if (formData.turn[turnKey] > 0) {
                formData.turn[turnKey] -= 1;
            }
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        Alert("error","กรุณากรอกข้อมูลให้ครบ!!")
    };
    
    onMounted(async () => {
      try {
        const data = await getSystemBankServices();
        if (data.status === "success") {
            dataShow.value = data.data;
        } else {
            Alert('error', data.message);
        }
      } catch (error) {
        console.error('Error fetching bank system:', error);
      }

    });
</script >
<style>
.image-center{
    display: flex;
    align-items: center;
}
.px-1{
    padding: 0 0.3rem;
}
</style>