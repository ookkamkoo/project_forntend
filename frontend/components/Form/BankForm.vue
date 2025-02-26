<template>
    <a-form
        :model="formData"
        name="basic"
        ref="formRef"
        autocomplete="off"
        @finish="handleFinish"
    >
        <a-row>
            <a-col :span="24" :md="12" class="p-2">
                <label for="ประเภทบัญชี"><b class="request">ประเภทบัญชี</b></label>
                <a-select
                    v-model:value="formData.bank_type"
                    style="width: 100%"
                    :options="Constants.optionsBankType"
                    @change="ChangeBankType"
                ></a-select>
            </a-col>
            
            <a-col :span="24" :md="12" class="p-2">
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
            <a-col :span="24" :md="12" class="p-2">
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
            <a-col :span="24" :md="12" class="p-2">
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
            <a-col :span="24" :md="12" class="p-2">
                <label for="ชื่อบัญชี"><b  class="request">ชื่อบัญชี</b></label>
                <a-form-item 
                    ref="bankName" 
                    name="bankName"
                    :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                    >
                    <a-input v-model:value="formData.bankName"/>
                </a-form-item>
            </a-col>
            <a-col :span="24" :md="12" class="p-2">
                <label for="เลขบัญชี"><b  class="request">{{Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].action[formData.bank_list_api-1].bankNo ? 'เลขบัญชี' : 'เบอร์โทรศัพท์' }}</b></label>
                <a-form-item 
                    ref="bankNo" 
                    name="bankNo"
                    :rules="[{ required: true, message: 'โปรดกรอก' + (Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].action[formData.bank_list_api-1].bankNo ? 'เลขบัญชี' : 'เบอร์โทรศัพท์') + '!' }]"
                    >
                    <a-input v-model:value="formData.bankNo"/>
                </a-form-item>
            </a-col>
            <!-- ฟิลด์ Pin -->
            <a-col :span="24" :md="12" class="p-2" v-if="showPinField">
                <label for="Pin"><b>Pin ตัวเลข 6 ตัว</b></label>
                <a-form-item
                    ref="bankPin" 
                    name="bankPin"
                >
                    <a-input v-model:value="formData.bankPin" :maxlength="6" />
                </a-form-item>
            </a-col>

            <!-- ฟิลด์ DevicesID หรือ Login-Token -->
            <a-col :span="24" :md="12" class="p-2" v-if="showDevicesIdField">
                <label for="DevicesID"><b>devicesID</b></label>
                <a-form-item ref="devicesID" name="devicesID" >
                <a-input v-model:value="formData.devicesID" />
                </a-form-item>
            </a-col>

            <a-col :span="24" :md="12" class="p-2" v-if="showLoginTokenField">
                <label for="LoginToken"><b>LoginToken</b></label>
                <a-form-item ref="loginToken" name="loginToken" >
                <a-input v-model:value="formData.loginToken" />
                </a-form-item>
            </a-col>

            <!-- ฟิลด์ KeyID -->
            <a-col :span="24" :md="12" class="p-2" v-if="showKeyIdField">
                <label for="keyID"><b>keyID</b></label>
                <a-form-item ref="keyID" name="keyID" >
                <a-input v-model:value="formData.keyID" />
                </a-form-item>
            </a-col>

            <!-- ฟิลด์ TureID -->
            <a-col :span="24" :md="12" class="p-2" v-if="showTureIdField">
                <label for="TureID"><b>TureID</b></label>
                <a-form-item ref="TureID" name="TureID" >
                <a-input v-model:value="formData.TureID" />
                </a-form-item>
            </a-col>

            <!-- ฟิลด์ Username -->
            <a-col :span="24" :md="12" class="p-2" v-if="showUsernameField">
                <label for="Username"><b>Username</b></label>
                <a-form-item ref="Username" name="Username" >
                <a-input v-model:value="formData.Username" />
                </a-form-item>
            </a-col>

            <!-- ฟิลด์ Password -->
            <a-col :span="24" :md="12" class="p-2" v-if="showPasswordField">
                <label for="Password"><b>Password</b></label>
                <a-form-item ref="Password" name="Password" >
                <a-input type="password" v-model:value="formData.Password" />
                </a-form-item>
            </a-col>

            <!-- ฟิลด์ ApiKey -->
            <a-col :span="24" :md="12" class="p-2" v-if="showApiKeyField">
                <label for="Password"><b>ApiKey</b></label>
                <a-form-item ref="ApiKey" name="ApiKey" >
                <a-input type="text" v-model:value="formData.ApiKey" />
                </a-form-item>
            </a-col>
            <!-- ฟิลด์ SecretKey -->
            <a-col :span="24" :md="12" class="p-2" v-if="showSecretKeyField">
                <label for="SecretKey"><b>SecretKey</b></label>
                <a-form-item ref="SecretKey" name="SecretKey" >
                <a-input type="text" v-model:value="formData.SecretKey" />
                </a-form-item>
            </a-col>
            <!-- ฟิลด์ ClientId -->
            <a-col :span="24" :md="12" class="p-2" v-if="showClientIdField">
                <label for="ClientId"><b>ClientId</b></label>
                <a-form-item ref="ClientId" name="ClientId" >
                <a-input type="text" v-model:value="formData.ClientId" />
                </a-form-item>
            </a-col>
            <!-- ฟิลด์ Merchant -->
            <a-col :span="24" :md="12" class="p-2" v-if="showMerchantField">
                <label for="Merchant"><b>Merchant</b></label>
                <a-form-item ref="Merchant" name="Merchant" >
                <a-input type="text" v-model:value="formData.Merchant" />
                </a-form-item>
            </a-col>
        </a-row>
        <a-row class="my-2">
            <a-col span="6" class="p-2">
                <label for="Password"><b>สถานะการใช้งาน</b></label>
                <a-col>
                    <a-switch v-model:checked="formData.is_active" />
                </a-col>
            </a-col>
            <a-col span="6" class="p-2">
                <label for="Password"><b>ใช้งาน QRCODE</b></label>
                <a-col>
                    <a-switch v-model:checked="formData.is_qrcode" />
                </a-col>
            </a-col>
            <a-col span="6" class="p-2" v-if="((formData.bank_type != 4) && Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].action[formData.bank_list_api-1].api)">
                <label for="Password"><b>ใช้งาน API</b></label>
                <a-col>
                    <a-switch v-model:checked="formData.is_api" />
                </a-col>
            </a-col>
            <a-col span="6" class="p-2" v-if="((formData.bank_type != 4) && Constants.optionsBankType[formData.bank_type-1].bank[formData.bank_list-1].action[formData.bank_list_api-1].sms)">
                <label for="Password"><b>ใช้งาน SMS</b></label>
                <a-col>
                    <a-switch v-model:checked="formData.is_sms" />
                </a-col>
            </a-col>
        </a-row>
        <a-row v-if="formData.is_qrcode">
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
        <a-row justify="center" class="p-2">
            <a-button @click="props.closeModal()" class="m-1">Cancel</a-button>
            <a-button type="primary" html-type="submit" class="m-1 sky"><span v-if="status==0">เพิ่ม</span><span v-else>เเก้ไข</span></a-button>
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
    const config = useRuntimeConfig()

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
        bank_old_type:1,
        bank_list:1,
        bank_list_api:1,
        bank_connect:1,
        bankName:'',
        bankNo:'',
        bankPin:'',
        devicesID:'',
        loginToken:'',
        keyID:'',
        TureID:'',
        Username:'',
        Password:'',
        ApiKey:'',
        SecretKey:'',
        ClientId:'',
        Merchant:'',

        is_api: true,
        is_qrcode: false,
        is_active: true,
        is_sms: false,
        Image: null as any
    });

    const props = defineProps<{
        status:Number,
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
                formData.bank_old_type = 1;
                formData.bank_list = 1;
                formData.bank_list_api = 1;
                formData.bank_connect = 1;
                formData.bank_connect = 1;
                formData.bankName = '';
                formData.bankNo = '';
                formData.bankPin = '';
                formData.devicesID = '';
                formData.loginToken = '';
                formData.keyID = '';
                formData.TureID = '';
                formData.Username = '';
                formData.Password = '';
                formData.ApiKey = '';
                formData.SecretKey = '';
                formData.ClientId = '';
                formData.Merchant = '';
                formData.is_api= true;
                formData.is_qrcode=true;
                formData.is_active=true;
                formData.is_sms=false;
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
                formData.bank_old_type = bank_type;
                formData.bank_list = bank_list;
                formData.bank_list_api = bank_list_api;
                formData.bank_connect = 1;
                formData.bankName = newValue.name;
                formData.bankNo = newValue.book_number;
                formData.bankPin = "";
                formData.devicesID = "";
                formData.loginToken = "";
                formData.keyID = "";
                formData.TureID = "";
                formData.Username = "";
                formData.Password = "";
                formData.ApiKey = "";
                formData.SecretKey = "";
                formData.ClientId = "";
                formData.Merchant = "";

                formData.is_api= newValue.is_api;
                formData.is_qrcode=newValue.is_qrcode;
                formData.is_active=newValue.is_active;
                formData.is_sms=newValue.is_sms;
                if(newValue.image != ""){
                    formData.Image = newValue.image;
                }else{
                    formData.Image = ""
                }
            }
            if(newValue.image != ""){
                ImageText.value = false;
                previewImage.value = newValue.image
            }
        } 
    }, { immediate: true });


    const ChangeBankType = () =>{
        console.log("aaaaa");
        console.log(formData.bank_type-1);
        console.log(formData.bank_type-1);
        console.log(formData.bank_list);
        console.log(formData.bank_old_type);
        let check = true
        Constants.optionsBankType[formData.bank_type-1].bank.forEach(element => {
            console.log(element);
            console.log(Constants.optionsBankType[formData.bank_old_type-1].bank[formData.bank_list-1].name);
            if(Constants.optionsBankType[formData.bank_old_type-1].bank[formData.bank_list-1].name == element.name){
                check = false
                formData.bank_list = element.value
                formData.bank_list_api = 1
            }
        });
        if(check){
            // Alert("warning","ธนาคารมีการเปลี่ยนเเปลงเนื่องจากไม่พบเงื่อนไขที่ท่านเลือก กรุณาตรวจสอบธนาคาร")
            formData.bank_list = 1;
            formData.bank_list_api = 1;
        }
        formData.bank_old_type = formData.bank_type
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
                Alert('success','เพิ่มบัญชีธนาคารเรียบร้อย.')
                props.closeModal()
                props.getSystemBank();
            }else{
                Alert('error',data.message);
            }
        }else{
            const data = await editSystemBank(formData);
            if(data.status == "success"){
                Alert('success','เเก้ไขบัญชีธนาคารเรียบร้อย.')
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
                element.action = [{value:1,name:'api',show:1,bankNo:0,pin:0,deviceId:0,keyID:0,UnP:0,ApiKey:0,SecretKey:0,ClientId:0,Merchant:0,status:1,api:0,sms:0}];
            });
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
      }

    });

    const showPinField = computed(() => {
    return (
        formData.bank_type !== 4 &&
        Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.action[formData.bank_list_api - 1]?.pin &&
        Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.bankConnect[formData.bank_connect - 1]?.label === 'เชื่อมเอง'
    );
    });

    const showDevicesIdField = computed(() => {
    return (
        formData.bank_type !== 4 &&
        Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.action[formData.bank_list_api - 1]?.deviceId &&
        Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.bankConnect[formData.bank_connect - 1]?.label === 'เชื่อมเอง'
    );
    });

    // const getDevicesIDLabel = computed(() => {
    // return formData.bank_type !== 4 && Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.action[formData.bank_list_api - 1]?.bankNo;
    // // return Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.action[formData.bank_list_api - 1]?.bankNo ? 'DevicesID' : 'Login-Token';
    // });
    const showLoginTokenField = computed(() => {
    return Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.name == 'ทรูมันนี่วอลเล็ท';
    // return Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.action[formData.bank_list_api - 1]?.bankNo ? 'DevicesID' : 'Login-Token';
    });

    const showKeyIdField = computed(() => {
    return formData.bank_type !== 4 &&
        Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.action[formData.bank_list_api - 1]?.keyID;
    });

    const showTureIdField = computed(() => {
    return formData.bank_type !== 4 &&
        Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.action[formData.bank_list_api - 1]?.keyID;
    });

    const showUsernameField = computed(() => {
    return formData.bank_type !== 4 &&
        Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.action[formData.bank_list_api - 1]?.UnP;
    });

    const showPasswordField = computed(() => {
    return formData.bank_type !== 4 &&
        Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.action[formData.bank_list_api - 1]?.UnP;
    });

    const showApiKeyField = computed(() => {
    return formData.bank_type !== 4 &&
        Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.action[formData.bank_list_api - 1]?.ApiKey;
    });
    const showSecretKeyField = computed(() => {
    return formData.bank_type !== 4 &&
        Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.action[formData.bank_list_api - 1]?.SecretKey;
    });
    const showClientIdField = computed(() => {
    return formData.bank_type !== 4 &&
        Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.action[formData.bank_list_api - 1]?.ClientId;
    });
    const showMerchantField = computed(() => {
    return formData.bank_type !== 4 &&
        Constants.optionsBankType[formData.bank_type - 1]?.bank[formData.bank_list - 1]?.action[formData.bank_list_api - 1]?.Merchant;
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