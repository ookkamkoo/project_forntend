<template>
    <a-form
        :model="formData"
        name="basic"
        ref="formRef"
        autocomplete="off"
        @finish="handleFinish"
    >
        <a-row>
            <a-col :span="24" :md="12">
                <div class="mx-1 my-1">
                    <label for="ชื่อโปรชั่น"><b>ชื่อโปรชั่น</b></label>
                    <a-form-item ref="name" name="name">
                        <a-input v-model:value="formData.name" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :span="12" :md="6">
                <div class="mx-1 my-1">
                    <label for="ประเภท"><b>ประเภท</b></label>
                    <a-select
                        v-model:value="formData.type"
                        style="width: 100%"
                        :options="Constants.optionsType"
                    ></a-select>
                </div>
            </a-col>
            <a-col :span="12" :md="6">
                <div class="mx-1 my-1">
                    <label for="ประเภทโบนัส"><b>ประเภทโบนัส</b></label>
                    <a-select
                        v-model:value="formData.bonusType"
                        style="width: 100%"
                        :options="Constants.optionsTypeBonus"
                    ></a-select>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="24" :md="8">
                <div class="mx-1 my-1">
                    <label for="ถอนโบนัส"><b>ถอนโบนัส</b></label>
                    <a-select
                        v-model:value="formData.bonusWithdraw"
                        style="width: 100%"
                        :options="Constants.optionsBonusWithdrow"
                    ></a-select>
                </div>
            </a-col>
            <a-col :span="24" :md="8">
                <div class="mx-1 my-1">
                    <label for="วันเปิด"><b>วันเปิด</b></label>
                    <a-select
                        v-model:value="formData.dayOpen"
                        style="width: 100%"
                        :options="Constants.optionsDayOpen"
                        @change="handleDayOpenChange"
                    ></a-select>
                </div>
            </a-col>
            <a-col :span="24" :md="8">
                <div class="mx-1 my-1">
                    <label for="เวลาเปิด"><b>เวลาเปิด/ปิด</b></label>
                    <a-select
                        v-model:value="formData.timeOpen"
                        style="width: 100%"
                        :options="Constants.optionsTimeOpen"
                    ></a-select>
                </div>
            </a-col>
        </a-row>
        <a-row v-if="formData.dayOpen == '2'">
            <a-col :span="24" :md="24">
                <div class="select-day">
                    <h3>
                        เลือกวัน
                        <a-checkbox v-model:checked="all" style="float: inline-end;" @change="selectAll">เลือกทั้งหมด</a-checkbox>
                    </h3>
                    <a-checkbox-group v-model:value="formData.week" :options="Constants.optionWeek" class="model-week">
                        <template #label="{ label }">
                            <p>{{ label }}</p>
                        </template>
                    </a-checkbox-group>
                </div>
            </a-col>
        </a-row>
        <a-row v-if="formData.dayOpen == '3'">
            <a-col :span="24" :md="24">
                <div class="select-day">
                    <h3>
                        เลือกวันที่
                        <a-checkbox v-model:checked="all" style="float: inline-end;" @change="selectAll">เลือกทั้งหมด</a-checkbox>
                    </h3>
                    <a-checkbox-group v-model:value="formData.day" :options="Constants.optionDay" class="model-week">
                        <template #label="{ label }">
                            <p>{{ label }}</p>
                        </template>
                    </a-checkbox-group>
                </div>
            </a-col>
        </a-row>
        <a-row v-if="formData.timeOpen == '2'" class="model-time">
            <a-col :span="24" :md="8">
                <div class="mx-1 my-1">
                    <label for="เวลาเปิด"><b>เวลาเปิด</b></label>
                    <a-time-picker v-model:value="formData.time.timeOpen" format="HH:mm" />
                </div>
            </a-col>
            <a-col :span="24" :md="8">
                <div class="mx-1 my-1">
                    <label for="เวลาเปิด"><b>เวลาปิด</b></label>
                    <a-time-picker v-model:value="formData.time.timeCloss" format="HH:mm" />
                </div>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="12" :md="8">
                <div class="mx-1 my-1">
                    <label for="ฝากขั้นต่ำ">
                        <b>ฝากขั้นต่ำ</b>
                    </label>
                    <a-form-item ref="nalowDepositme" name="lowDeposit">
                        <a-input-number v-model:value="formData.lowDeposit"/>
                    </a-form-item>
                </div>
            </a-col>
            <a-col :span="12" :md="8">
                <div class="mx-1 my-1">
                    <label for="จำนวนครั้งที่รับได้ทั้งหมด">
                        <b>จำนวนครั้งที่รับได้ 
                            <a-popover>
                                <template #content>
                                <p>0 คือ รับได้ไม่จำกัด</p>
                                </template>
                                <QuestionCircleOutlined />
                            </a-popover>
                        </b>
                    </label>
                    <a-form-item ref="limitRound" name="limitRound">
                        <a-input-number v-model:value="formData.limitRound"/>
                    </a-form-item>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="24" :md="6">
                <div class="mx-1 my-1">
                    <label for="ประเภท"><b>ประเภทรายการฝาก</b></label>
                    <a-select
                        v-model:value="formData.typeDeposit"
                        style="width: 100%"
                        :options="Constants.optionsListType"
                    ></a-select>
                </div>
            </a-col>
        </a-row>
        <a-row v-if="formData.typeDeposit == '1'">
            <a-col :span="12" :md="6">
                <div class="mx-1 my-1">
                    <label for="จำนวนเงิน/เปอร์เซนต์"><b>จำนวนเงิน/เปอร์เซนต์</b></label>
                    <a-form-item ref="amount/percent" name="amount/percent">
                        <a-input-number v-model:value="formData.additionalColumns.amount" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :span="12" :md="6">
                <div class="mx-1 my-1">
                    <label for="จำนวนเงิน/เปอร์เซนต์"><b>โบนัสสูงสุด</b></label>
                    <a-form-item ref="amount/percent" name="amount/percent">
                        <a-input-number v-model:value="formData.additionalColumns.bonus" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :span="12" :md="6">
                <div class="mx-1 my-1">
                    <label for="ประเภท"><b>ประเภทถอนสูงสุด</b></label>
                    <a-select
                        v-model:value="formData.typeMaxWithDrow"
                        style="width: 100%"
                        :options="Constants.optionsMaxWithdrow"
                    ></a-select>
                </div>
            </a-col>
            <a-col :span="12" :md="6">
                <div class="mx-1 my-1">
                    <label for="ถอนได้สูงสุด"><b>ถอนสูงสุด</b></label>
                    <a-form-item ref="amountMaxWithDrow" name="amountMaxWithDrow">
                        <a-input-number v-model:value="formData.additionalColumns.amountMaxWithDrow" />
                    </a-form-item>
                </div>
            </a-col>
        </a-row>
        <a-row v-if="formData.typeDeposit == '2'">
            <a-col v-for="(column, index) in formData.additionalColumnsFix" :key="index" :span="24" :md="24">
                <a-row>
                    <a-col :span="12" :md="6">
                        <div class="mx-1 my-1">
                            <label for="จำนวนเงิน/เปอร์เซนต์"><b>ยอดฝาก {{index+1}} 
                                <a-popover>
                                    <template #content>
                                    <p>จำนวนเงินที่ลูกค้าฝากเข้ามา</p>
                                    </template>
                                    <QuestionCircleOutlined />
                                </a-popover></b></label>
                            <a-form-item :ref="'amount' + index" :name="'amount' + index">
                                <a-input-number v-model:value="column.amount" />
                            </a-form-item>
                        </div>
                    </a-col>
                    <a-col :span="12" :md="6">
                        <div class="mx-1 my-1">
                            <label for="โบนัสสูงสุด"><b>โบนัส ({{ Constants.optionsTypeBonus?.[Number(formData.bonusType)-1]?.label ?? 'ประเภทโบนัส' }}) {{index+1}} 
                                <a-popover>
                                    <template #content>
                                    <p>เปอร์เซ็นต์ หรือ จำนวนเงิน จากการเลือก "ประเภทโบนัส" </p>
                                    </template>
                                    <QuestionCircleOutlined />
                                </a-popover></b></label>
                            <a-form-item :ref="'bonus' + index" :name="'bonus' + index">
                                <a-input-number v-model:value="column.bonus" />
                            </a-form-item>
                        </div>
                    </a-col>
                    <a-col :span="12" :md="7">
                        <div class="mx-1 my-1">
                            <label for="ประเภท"><b>ประเภทถอนสูงสุด</b></label>
                            <a-select
                                v-model:value="formData.typeMaxWithDrow"
                                style="width: 100%"
                                :options="Constants.optionsMaxWithdrow"
                            ></a-select>
                        </div>
                    </a-col>
                    <a-col :span="12" :md="5">
                        <div class="mx-1 my-1">
                            <label for="ถอนได้สูงสุด"><b>ถอนสูงสุด</b></label>
                            <a-form-item ref="amountMaxWithDrow" name="amountMaxWithDrow">
                                <a-input-number v-model:value="column.amountMaxWithDrow" />
                            </a-form-item>
                        </div>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="24" :md="24">
                <div class="mx-1 center">
                    <br>
                    <a-button class="sky mx-1" type="primary" @click="addColumn"><PlusOutlined /></a-button>
                    <a-button class="danger" type="primary" @click="removeColumn()"><CloseOutlined /></a-button>
                </div>
            </a-col>
        </a-row>
        <a-row v-if="formData.typeDeposit == '3'">
            <a-col v-for="(column, index) in formData.additionalColumnsScale" :key="index" :span="24" :md="24">
                <a-row>
                    <a-col :span="24" :md="3">
                        <br>
                        <div class="mx-1 my-1">
                            <a-button type="primary" class="sky" style="width: 100%;"><b> มากกว่า </b></a-button>
                        </div>
                    </a-col>
                    <a-col :span="12" :md="4">
                        <div class="mx-1 my-1">
                            <label for="จำนวนเงิน/เปอร์เซนต์"><b>ยอดฝาก {{index+1}} 
                                <a-popover>
                                    <template #content>
                                    <p>จำนวนเงินที่ลูกค้าฝากเข้ามา</p>
                                    </template>
                                    <QuestionCircleOutlined />
                                </a-popover></b></label>
                            <a-form-item :ref="'amountScale' + index" :name="'amountScale' + index">
                                <a-input-number v-model:value="column.amount" />
                            </a-form-item>
                        </div>
                    </a-col>
                    <a-col :span="12" :md="6">
                        <div class="mx-1 my-1">
                            <label for="โบนัสสูงสุด"><b>โบนัส ({{ Constants.optionsTypeBonus?.[parseInt(formData.bonusType)-1]?.label ?? 'ประเภทโบนัส' }}) {{index+1}} 
                                <a-popover>
                                    <template #content>
                                    <p>เปอร์เซ็นต์ หรือ จำนวนเงิน จากการเลือก "ประเภทโบนัส" </p>
                                    </template>
                                    <QuestionCircleOutlined />
                                </a-popover></b></label>
                            <a-form-item :ref="'bonusScale' + index" :name="'bonusScale' + index">
                                <a-input-number v-model:value="column.bonus" />
                            </a-form-item>
                        </div>
                    </a-col>
                    <a-col :span="12" :md="7">
                        <div class="mx-1 my-1">
                            <label for="ประเภท"><b>ประเภทถอนสูงสุด</b></label>
                            <a-select
                                v-model:value="formData.typeMaxWithDrow"
                                style="width: 100%"
                                :options="Constants.optionsMaxWithdrow"
                            ></a-select>
                        </div>
                    </a-col>
                    <a-col :span="12" :md="4">
                        <div class="mx-1 my-1">
                            <label for="ถอนได้สูงสุด"><b>ถอนสูงสุด</b></label>
                            <a-form-item ref="amountMaxWithDrow" name="amountMaxWithDrow">
                                <a-input-number v-model:value="column.amountMaxWithDrow" />
                            </a-form-item>
                        </div>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="24" :md="24">
                <div class="mx-1 center">
                    <br>
                    <a-button class="sky mx-1" type="primary" @click="addColumnScale"><PlusOutlined /></a-button>
                    <a-button class="danger" type="primary" @click="removeColumnScale()"><CloseOutlined /></a-button>
                </div>
            </a-col>
        </a-row>
        <br>
        <a-row :justify="'center'">
            <a-col :span="8" :md="6">
                <div class="mx-1 my-1">
                    <label class="text-label-turn" for="CASINO">CASINO</label>
                    <a-input-number id="CASINO" v-model:value="formData.turn.casino" :min="0" :max="100" style="width: 100%" />
                </div>
            </a-col>
            <a-col :span="8" :md="6">
                <div class="mx-1 my-1">
                    <label class="text-label-turn" for="GAME">GAME</label>
                    <a-input-number id="GAME" v-model:value="formData.turn.game" :min="0" :max="100" style="width: 100%" />
                </div>
            </a-col>
            <a-col :span="8" :md="6">
                <div class="mx-1 my-1">
                    <label class="text-label-turn" for="FISHING">FISHING</label>
                    <a-input-number id="FISHING" v-model:value="formData.turn.fishing" :min="0" :max="100" style="width: 100%" />
                </div>
            </a-col>
            <a-col :span="8" :md="6">
                <div class="mx-1 my-1">
                    <label class="text-label-turn" for="SPORTSBOOK">SPORTSBOOK</label>
                    <a-input-number id="SPORTSBOOK" v-model:value="formData.turn.sportsbook" :min="0" :max="100" style="width: 100%" />
                </div>
            </a-col>
            <a-col :span="8" :md="6">
                <div class="mx-1 my-1">
                    <label class="text-label-turn" for="TRADING">TRADING</label>
                    <a-input-number id="TRADING" v-model:value="formData.turn.trading" :min="0" :max="100" style="width: 100%" />
                </div>
            </a-col>
            <a-col :span="8" :md="6">
                <div class="mx-1 my-1">
                    <label class="text-label-turn" for="CARD">CARD</label>
                    <a-input-number id="CARD" v-model:value="formData.turn.card" :min="0" :max="100" style="width: 100%" />
                </div>
            </a-col>
            <a-col :span="8" :md="6">
                <div class="mx-1 my-1">
                    <label class="text-label-turn" for="LOTTO">LOTTO</label>
                    <a-input-number id="LOTTO" v-model:value="formData.turn.lotto" :min="0" :max="100" style="width: 100%" />
                </div>
            </a-col>
            <a-col :span="8" :md="6">
                <div class="mx-1 my-1">
                    <label class="text-label-turn" for="KENO">KENO</label>
                    <a-input-number id="KENO" v-model:value="formData.turn.keno" :min="0" :max="100" style="width: 100%" />
                </div>
            </a-col>
            <a-col :span="8" :md="6">
                <div class="mx-1 my-1">
                    <label class="text-label-turn" for="ESPORT">ESPORT</label>
                    <a-input-number id="ESPORT" v-model:value="formData.turn.esport" :min="0" :max="100" style="width: 100%" />
                </div>
            </a-col>
            <a-col :span="8" :md="6">
                <div class="mx-1 my-1">
                    <label class="text-label-turn" for="POKER">POKER</label>
                    <a-input-number id="POKER" v-model:value="formData.turn.poker" :min="0" :max="100" style="width: 100%" />
                </div>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="24">
                <div v-if="!ImageText" class="close-image" @click="clearPreviewImage">
                    <CloseCircleOutlined />
                </div>
                <a-upload-dragger
                        v-model:fileList="fileList"
                        name="file"
                        :showUploadList=false
                        class="image-upload"
                        @change="handleChange"
                        @drop="handleDrop"
                    >
                        <div class="image-upload-text">
                            <div v-if="ImageText">
                                <p class="ant-upload-drag-icon">
                                    <inbox-outlined></inbox-outlined>
                                </p>
                                <p class="ant-upload-text">Click or drag file to this area to upload</p>
                                <p class="ant-upload-hint">
                                    โปรดเช็คขนาดไฟล์ในการอัปโหลด ขนาดเเนะนำ 1:1 ไฟล์ PNG JPG JPEG
                                </p>
                            </div>
                        </div>
                        <div v-if="previewImage" class="preview-image-container">
                            <img :src="previewImage" class="preview-image" style="width: 350px;">
                        </div>
                    </a-upload-dragger>
            </a-col>
        </a-row>
        <br>
        <a-row justify="center">
            <a-button @click="props.closeModal()" class="m-1">Cancel</a-button>
            <a-button type="primary" html-type="submit" class="m-1 sky">เพิ่ม</a-button>
        </a-row>
    </a-form>

</template>
<script lang="ts" setup>
    import type { SelectProps } from 'ant-design-vue';
    import { InboxOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
    import { message } from 'ant-design-vue';
    import type { UploadChangeParam } from 'ant-design-vue';
    import { ref, reactive } from 'vue';
    import { Alert } from '../Alert/alertComponent';
    import { createPromotion,editPromotion } from '~/services/promotionServices';
    import * as Constants from '../Constants/Constants';
    import dayjs from 'dayjs';
    const open = ref<boolean>(true);
    const all = ref(false);

    const fileList = ref([]);
    const previewImage = ref('');
    const ImageText = ref(true);
    const action = ref("create")
    const config = useRuntimeConfig()

    const props = defineProps<{
        closeModal:Function,
        getPromotions:Function,
        promotionEdit:object
    }>();

    const handleChange = async (info: UploadChangeParam) => {
        const status = info.file.status;
        const file = info.file.originFileObj; // File object

        if (file instanceof File) {
            const reader = new FileReader();

            reader.onload = () => {
                const base64String = reader.result as string;
                if (base64String) {
                    previewImage.value = base64String;
                    formData.image = base64String;
                }
            };
            ImageText.value = false;
            reader.readAsDataURL(file);
        }
        
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`อัพโหลดรูปภาพเรียบร้อย`);
        }
    };

    const clearPreviewImage = () => {
      previewImage.value = '';
      fileList.value = [];
      ImageText.value = true;
    };

    function handleDrop(e: DragEvent) {
        console.log(e);
    }

    let formData = reactive({
        id: 0,
        name:'',
        lowDeposit:0,
        limitRound:0,
        type:'1',
        typeDeposit:'1',
        bonusType:'1',
        typeMaxWithDrow:'1',
        bonusWithdraw:'1',
        dayOpen:'1',
        timeOpen:'1',
        time:{
            timeOpen:dayjs('00:00', 'HH:mm'),
            timeCloss:dayjs('23:59', 'HH:mm'),
        },
        day:[] as string[],
        week:[] as string[],
        additionalColumns:{ amount: 0, bonus: 0,amountMaxWithDrow:0 } as { amount: number; bonus: number; amountMaxWithDrow:number },
        additionalColumnsFix:[{ amount: 100, bonus: 0,amountMaxWithDrow:0 },{ amount: 200, bonus: 0,amountMaxWithDrow:0 }] as { amount: number; bonus: number; amountMaxWithDrow:number }[],
        additionalColumnsScale:[{ amount: 0, bonus: 0,amountMaxWithDrow:0 },{ amount: 100, bonus: 0,amountMaxWithDrow:0 },{ amount: 200, bonus: 0 ,amountMaxWithDrow:0}]as { amount: number; bonus: number; amountMaxWithDrow:number}[],
        turn:{
            casino:0,
                    game:0,
                    fishing:0,
                    sportsbook:0,
                    trading:0,
                    card:0,
                    lotto:0,
                    keno:0,
                    esport:0,
                    poker:0,
        },
        image: null as any
    });

    watch(() => props.promotionEdit, (newValue:any) => {
        console.log(newValue);
        
        if (newValue) {
            if(newValue.id == undefined){
                action.value ="create";
                formData.id = 0;
                formData.name = '';
                formData.lowDeposit = 0;
                formData.limitRound = 0;
                formData.type = '1';
                formData.typeDeposit = '1';
                formData.bonusType = '1';
                formData.typeMaxWithDrow = '1';
                formData.bonusWithdraw = '1';
                formData.dayOpen = '1';
                formData.timeOpen = '1';
                formData.time = {
                    timeOpen:dayjs('00:00', 'HH:mm'),
                    timeCloss:dayjs('23:59', 'HH:mm')
                };
                formData.day = [] as string[];
                formData.week = [] as string[];
                formData.additionalColumns = { amount: 0, bonus: 0,amountMaxWithDrow:0 } as { amount: number; bonus: number; amountMaxWithDrow:number };
                formData.additionalColumnsFix = [{ amount: 100, bonus: 0,amountMaxWithDrow:0 },{ amount: 200, bonus: 0,amountMaxWithDrow:0 }] as { amount: number; bonus: number; amountMaxWithDrow:number }[];
                formData.additionalColumnsScale = [{ amount: 0, bonus: 0,amountMaxWithDrow:0 },{ amount: 100, bonus: 0,amountMaxWithDrow:0 },{ amount: 200, bonus: 0 ,amountMaxWithDrow:0}]as { amount: number; bonus: number; amountMaxWithDrow:number}[];
                formData.turn = {
                    casino:0,
                    game:0,
                    fishing:0,
                    sportsbook:0,
                    trading:0,
                    card:0,
                    lotto:0,
                    keno:0,
                    esport:0,
                    poker:0,
                                };
                formData.image =  null as any
            }else{
                action.value ="edit";

                formData.id = newValue.id;
                formData.name = newValue.name;
                formData.lowDeposit = newValue.low_deposit.toString();
                formData.limitRound = newValue.limit_round.toString();
                formData.type = newValue.type.toString();
                formData.typeDeposit = newValue.type_deposit.toString();
                formData.bonusType = newValue.bonus_type.toString();
                formData.typeMaxWithDrow = newValue.type_max_withDrow.toString();
                formData.bonusWithdraw = newValue.bonus_withdraw.toString();
                formData.dayOpen = newValue.type_open.toString();
                formData.timeOpen = newValue.time_open_close.toString();
                formData.time = {
                    timeOpen:dayjs(newValue.time_open),
                    timeCloss:dayjs(newValue.time_close)
                };
                formData.day = newValue.open_data;
                formData.week = newValue.open_data;
                if(formData.typeDeposit == "1"){
                    formData.additionalColumns = newValue.condition_data;
                    formData.additionalColumnsFix = [{ amount: 100, bonus: 0,amountMaxWithDrow:0 },{ amount: 200, bonus: 0,amountMaxWithDrow:0 }];
                    formData.additionalColumnsScale = [{ amount: 100, bonus: 0,amountMaxWithDrow:0 },{ amount: 200, bonus: 0,amountMaxWithDrow:0 }];
                }else{
                    formData.additionalColumns = { amount: 0, bonus: 0,amountMaxWithDrow:0 };
                    formData.additionalColumnsFix = newValue.condition_data;
                    formData.additionalColumnsScale = newValue.condition_data;
                }
                formData.turn = newValue.turn;
                formData.image = config.public.serviceUrls +'/'+ newValue.image
            }
            // iamge
            ImageText.value = false;
            previewImage.value = config.public.serviceUrls +'/'+ newValue.image

            console.log(config.public.serviceUrls +'/'+ newValue.image);
            
        } 
    }, { immediate: true });


    const addColumn = () => {
        formData.additionalColumnsFix.push({ amount: 0, bonus: 0, amountMaxWithDrow: 0 });
    };

    const removeColumn = () => {
        formData.additionalColumnsFix.pop();
    };

    const addColumnScale = () => {
        formData.additionalColumnsScale.push({ amount: 0, bonus: 0, amountMaxWithDrow: 0 });
    };

    const removeColumnScale = () => {
        formData.additionalColumnsScale.pop();
    };

    const handleFinish = () => {
        handleSubmit();
    };

    const handleSubmit = async() => {
        
        if(action.value == "create"){
            const data = await createPromotion(formData);
            if(data.status == "success"){
                Alert('success','เพิ่มพนักงาน หรือ ผู้ดูเเลระบบเรียบร้อย.')
                props.closeModal()
                props.getPromotions();
            }else{
                Alert('error',data.message);
            }
        }else{
            const data = await editPromotion(formData);
            if(data.status == "success"){
                Alert('success','เเก้ไขพนักงาน หรือ ผู้ดูเเลระบบเรียบร้อย.')
                props.closeModal()
                props.getPromotions();
            }else{
                Alert('error',data.message);
            }
        }
    };

    const handleDayOpenChange = () =>{
        if(formData.dayOpen == '1'){
            open.value = false
        }else if(formData.dayOpen == '2'){
            open.value = true
        }else if(formData.dayOpen == '3'){
            open.value = false
        }
    }

    const selectAll = () =>{
        if(formData.dayOpen == '2'){
            if(all.value){
                formData.week = ['อา','จ','อ','พ','พฤ','ศ','ส'];
            }else{
                formData.week = []
            }
        }else if(formData.dayOpen == '3'){
            if(all.value){
            formData.day = Array.from({ length: 31 }, (_, index) => (index + 1).toString());
            }else{
                formData.day = []
            }
        }
    }

</script>

<style>
.preview-image-container{
    position: relative;
}
.close-image {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  cursor: pointer;
  font-size: 25px;
  z-index: 999;
  color:#14b6c9
}
.text-label-turn{
    font-weight: 500;
}
</style>