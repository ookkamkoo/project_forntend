<template>
    <a-form
        :model="formData"
        name="basic"
        ref="formRef"
        autocomplete="off"
        @finish="handleFinish"
    >
        <a-row>
            <a-col :span="24" :md="12" class="p-1">
                <label for="ประเภทบัญชี"><b class="request">ประเภทบัญชี</b></label>
                <a-select
                    v-model:value="formData.bank_type"
                    style="width: 100%"
                    :options="Constants.optionsBankType"
                    @change="ChangeBankType"
                ></a-select>
            </a-col>
            
            <a-col :span="24" :md="12" class="p-1">
                <label for="ชื่อธนาคาร"><b  class="request">ชื่อธนาคาร</b></label>
                <a-select ref="select" v-model:value="formData.bank_list" style="width: 100%" @change="ChangeBankList">
                    <a-select-option value="" disabled>เลือกธนาคาร</a-select-option>
                    <template v-for="option in Constants.optionsBankType[formData.bank_type-1].bank" :key="option.name">
                    <a-select-option :value="option.value" v-if="option.action">
                        <template #default>
                            <a-image :src="option.image" :alt="option.name" width="20px" height="20px" :preview="false"/>
                            {{ option.name }}
                        </template>
                    </a-select-option>
                    </template>
                </a-select>
            </a-col>
            <a-col :span="24" :md="12" class="p-1">
                <label for="ประเภทการใช้งาน"><b  class="request">ประเภทการใช้งาน</b></label>
                <a-select ref="select" v-model:value="formData.bank_list_api" style="width: 100%">
                    <a-select-option value="" disabled>เลือกประเภทการใช้งาน</a-select-option>
                    <template v-for="option in Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].action" :key="option.name">
                    <a-select-option :value="option.value" v-if="option.show==1">
                        <template #default>
                            {{ option.name}}
                        </template>
                    </a-select-option>
                    </template>
                </a-select>
            </a-col>
            <a-col :span="24" :md="12" class="p-1">
                <label for="ประเภทการใช้งาน"><b  class="request">เชื่อมบัญชี</b></label>
                <a-select ref="select" v-model:value="formData.bank_connect" style="width: 100%">
                    <a-select-option value="" disabled>เลือกประเภทการใช้งาน</a-select-option>
                    <template v-for="option in Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].bankConnect" :key="option.name">
                    <a-select-option :value="option.value">
                        <template #default>
                            {{ option.label}}
                        </template>
                    </a-select-option>
                    </template>
                </a-select>
            </a-col>
            <a-col :span="24" :md="12" class="p-1">
                <label for="ชื่อบัญชี"><b  class="request">ชื่อบัญชี</b></label>
                <a-form-item 
                    ref="bankName" 
                    name="bankName"
                    :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                    >
                    <a-input v-model:value="formData.bankName"/>
                </a-form-item>
            </a-col>
            <a-col :span="24" :md="12" class="p-1">
                <label for="เลขบัญชี"><b  class="request">{{Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].action[formData.bank_list_api-1].bankNo ? 'เลขบัญชี' : 'เบอร์โทรศัพท์' }}</b></label>
                <a-form-item 
                    ref="bankNo" 
                    name="bankNo"
                    :rules="[{ required: true, message: 'โปรดกรอก' + (Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].action[formData.bank_list_api-1].bankNo ? 'เลขบัญชี' : 'เบอร์โทรศัพท์') + '!' }]"
                    >
                    <a-input v-model:value="formData.bankNo"/>
                </a-form-item>
            </a-col>
            <a-col :span="24" :md="12" class="p-1" v-if="((formData.bank_type != 4) && Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].action[formData.bank_list_api-1].pin) && (Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].bankConnect[formData.bank_connect-1].label == 'เชื่อมเอง')">
                <label for="Pin"><b>Pin ตัวเลข 6 ตัว</b></label>
                <a-form-item ref="bankPin" name="bankPin">
                    <a-input v-model:value="formData.bankPin"/>
                </a-form-item>
            </a-col>
            <a-col :span="24" :md="12" class="p-1" v-if="((formData.bank_type != 4) && Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].action[formData.bank_list_api-1].deviceId) && (Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].bankConnect[formData.bank_connect-1].label == 'เชื่อมเอง')">
                <label for="DevicesID"><b>{{Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].action[formData.bank_list_api-1].bankNo ? 'DevicesID' : 'Login-Token' }}</b></label>
                <a-form-item ref="DevicesID" name="DevicesID">
                    <a-input v-model:value="formData.devicesID"/>
                </a-form-item>
            </a-col>
            <a-col :span="24" :md="12" class="p-1" v-if="((formData.bank_type != 4) && Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].action[formData.bank_list_api-1].keyID)">
                <label for="keyID"><b>keyID</b></label>
                <a-form-item ref="keyID" name="keyID">
                    <a-input v-model:value="formData.keyID"/>
                </a-form-item>
            </a-col>
            <a-col :span="24" :md="12" class="p-1" v-if="((formData.bank_type != 4) && Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].action[formData.bank_list_api-1].keyID)">
                <label for="TureID"><b>TureID</b></label>
                <a-form-item ref="TureID" name="TureID">
                    <a-input v-model:value="formData.TureID"/>
                </a-form-item>
            </a-col>
            <a-col :span="24" :md="12" class="p-1" v-if="((formData.bank_type != 4) && Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].action[formData.bank_list_api-1].UnP)">
                <label for="Username"><b>Username</b></label>
                <a-form-item ref="Username" name="Username">
                    <a-input v-model:value="formData.Username"/>
                </a-form-item>
            </a-col>
            <a-col :span="24" :md="12" class="p-1" v-if="((formData.bank_type != 4) && Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].action[formData.bank_list_api-1].UnP)">
                <label for="Password"><b>Password</b></label>
                <a-form-item ref="Password" name="Password">
                    <a-input v-model:value="formData.Password"/>
                </a-form-item>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <h3>QR Code</h3>
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
                    >
                        <div class="image-upload-text">
                            <div v-if="ImageText">
                                <p class="ant-upload-drag-icon">
                                    <inbox-outlined></inbox-outlined>
                                </p>
                                <p class="ant-upload-text">Click or drag file to this area to upload QR Code</p>
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
        <a-row justify="center">
            <a-button @click="props.closeModal()" class="m-1">Cancel</a-button>
            <a-button type="primary" html-type="submit" class="m-1 sky">เพิ่ม</a-button>
        </a-row>
    </a-form>
</template>
<script lang="ts" setup>
    import { getDetailconfigMember } from '~/services/memberServices';
    import { createBank,editSystemBank } from '~/services/bankServices';
    import { Alert } from '../Alert/alertComponent';
    import type { UploadChangeParam } from 'ant-design-vue';
    import * as Constants from '../Constants/Constants';
    const action = ref("create")

    const fileList = ref([]);
    const previewImage = ref('');
    const ImageText = ref(true);

    const handleChange = async (info: UploadChangeParam) => {
        const status = info.file.status;
        const file = info.file.originFileObj; // File object

        if (file instanceof File) {
            const reader = new FileReader();

            reader.onload = () => {
                const base64String = reader.result as string;
                if (base64String) {
                    previewImage.value = base64String;
                    formData.Image = base64String;
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


    let formData = reactive({
        id: 0,
        bank_type:1,
        bank_list:1,
        bank_list_api:1,
        bank_connect:1,
        bankName:'กิตติพงษ์ คำก๋อง',
        bankNo:'8422576122',
        bankPin:'123456',
        devicesID:'devicesID-1',
        keyID:'keyID-1',
        TureID:'TureID-1',
        Username:'sdDDD',
        Password:'asdf123456',
        Image: null as any
    });

    const props = defineProps<{
        closeModal:Function,
        getSystemBank:Function,
        bankSystemEdit:object,
    }>();

    const clearPreviewImage = () => {
      previewImage.value = '';
      fileList.value = [];
      ImageText.value = true;
    };

    watch(() => props.bankSystemEdit, (newValue:any) => {
        console.log(newValue);
        
        if (newValue) {
            if(newValue.id == undefined){
                console.log('111111111111111');
                action.value ="create";

                formData.id = 0;
                formData.bank_type = 1;
                formData.bank_list = 1;
                formData.bank_list_api = 1;
                formData.bank_connect = 1;
                formData.bankName = '';
                formData.bankNo = '';
                formData.bankPin = '';
                formData.devicesID = '';
                formData.keyID = '';
                formData.TureID = '';
                formData.Username = '';
                formData.Password = '';
            }else{
                console.log('22222222222222');
                action.value ="edit";
                
                let bank_type: number = 0;
                Constants.optionsBankType.forEach(element => {
                    if(element.labelEN == newValue.type){
                        bank_type = element.value
                        console.log(element.value);
                    }
                });

                let bank_list: number = 1;
                Constants.optionsBankType[bank_type-1].bank.forEach(element => {
                    if(element.short == newValue.bank.short){
                        console.log(element);
                        bank_list = element.value
                    }
                });

                let bank_list_api: number = 0;
                Constants.optionsBankType[bank_type-1].bank[bank_list-1].action.forEach(element => {
                    if(element.name == newValue.bank_type){
                        bank_list_api = element.value
                    }
                });

                formData.id = newValue.id;
                formData.bank_type = bank_type;
                formData.bank_list = bank_list;
                formData.bank_list_api = bank_list_api;
                formData.bank_connect = 1;
                formData.bankName = newValue.name;
                formData.bankNo = newValue.book_number;
                formData.bankPin = newValue.detail.bankPin;
                formData.devicesID = newValue.detail.devicesID;
                formData.keyID = newValue.detail.keyID;
                formData.TureID = newValue.detail.TureID;
                formData.Username = newValue.detail.Username;
                formData.Password = newValue.detail.Password;
                formData.Image = newValue.image;

            }
            
            ImageText.value = false;
            previewImage.value = newValue.image
        } 
    }, { immediate: true });


    const ChangeBankType = () =>{
        formData.bank_list = 1;
        formData.bank_list_api = 1;
    }
    
    const ChangeBankList = () =>{
        formData.bank_list_api = 1;
    }

    const handleFinish = () => {
        handleSubmit();
    };

    const handleSubmit = async() => {
        
        if(action.value == "create"){
            const data = await createBank(formData);
            if(data.status == "success"){
                Alert('success','เพิ่มพนักงาน หรือ ผู้ดูเเลระบบเรียบร้อย.')
                props.closeModal()
                props.getSystemBank();
            }else{
                Alert('error',data.message);
            }
        }else{
            const data = await editSystemBank(formData);
            if(data.status == "success"){
                Alert('success','เเก้ไขพนักงาน หรือ ผู้ดูเเลระบบเรียบร้อย.')
                props.closeModal()
                props.getSystemBank();
            }else{
                Alert('error',data.message);
            }
        }
    };
    
    onMounted(async () => {
      try {
        const data = await getDetailconfigMember();
        if (data.status === "success") {
            Constants.optionsBankType[3].bank = data.data.Bank
            Constants.optionsBankType[3].bank.forEach((element,index) => {
                element.value = index+1;
                element.action = [{value:1,name:'api',show:1,bankNo:0,pin:0,deviceId:0,keyID:0,UnP:0}];
            });
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
      }

    });
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