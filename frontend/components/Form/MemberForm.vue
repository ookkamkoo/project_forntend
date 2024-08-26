<template>
    <a-form
      :model="formData"
      name="basic"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      class="member-form"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
        <a-row>
            <a-col class="p-1" :span="12" :md="12">
                <label><b>เบอร์โทรศัพท์</b></label>
                <a-form-item
                    name="username"
                    :rules="[{ required: true, message: 'โปรดกรอกข้อมูล เบอร์โทรศัพท์!' }]"
                >
                <a-input v-model:value="formData.username" placeholder="เบอร์โทรศัพท์"/>
                </a-form-item>
            </a-col>
            <a-col class="p-1" :span="12" :md="12">
                <label><b>พาสเวิร์ด</b></label>
                <a-form-item
                    name="password"
                    :rules="[{ required: role_req, message: 'โปรดกรอกข้อมูล พาสเวิร์ด!' }]"
                >
                    <a-input v-model:value="formData.password" placeholder="รหัสผ่าน" :disabled="!role_req" :readonly="action == 'edit'" />
                </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="p-1" :span="12" :md="12">
                <label><b>ชื่อ</b></label>
                <a-form-item
                    name="firstName"
                    :rules="[{ required: true, message: 'โปรดกรอกข้อมูล ชื่อ!' }]"
                >
                <a-input v-model:value="formData.firstName" placeholder="ชื่อ"/>
                </a-form-item>
            </a-col>
            <a-col class="p-1" :span="12" :md="12">
                <label><b>นามสกุล</b></label>
                <a-form-item
                    name="lastName"
                    placeholder="นามสกุล"
                    :rules="[{ required: true, message: 'โปรดกรอกข้อมูล นามสกุล!' }]"
                >
                    <a-input v-model:value="formData.lastName" placeholder="นามสกุล"/>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="p-1" :span="12" :md="12">
                <label><b>ชื่อจากธนาคาร</b></label>
                <a-input v-model:value="formData.nameCheck" placeholder="ชื่อจากธนาคาร"/>
            </a-col>
            <a-col class="p-1" :span="12" :md="12">
                <label><b>รหัสลูกค้า</b></label>
                    <a-input v-model:value="formData.usernameAgent" placeholder="รหัสลูกค้า" disabled/>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="p-1" :span="12" :md="12">
                <label><b>ช่องทางเข้าการถึง</b></label>
                    <a-select ref="select" v-model:value="formData.marketingId" style="width: 100%" >
                        <a-select-option value="">ช่องทางเข้าการถึง</a-select-option>
                        <template v-for="option in optionsMarketing" :key="option.name">
                        <a-select-option :value="option.id">
                            <template #default>
                            {{ option.name }}
                            </template>
                        </a-select-option>
                        </template>
                    </a-select>
            </a-col>
            <a-col class="p-1" :span="12" :md="12">
                <label><b>ไลน์ไอดี</b></label>
                <a-form-item
                    name="lineId"
                >
                    <a-input v-model:value="formData.lineId" placeholder="ไลน์ไอดี"/>
                </a-form-item>
            </a-col>
            <a-col class="p-1" :span="24">
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
            <a-col class="p-1" :span="24">
                <label><b>เลขบัญชี</b></label>
                <a-form-item
                    name="bankNo"
                    :rules="[{ required: true, message: 'โปรดกรอกข้อมูล เลขบัญชี!' }]"
                >
                    <a-input v-model:value="formData.bankNo" placeholder="เลขบัญชี"/>
                </a-form-item>
            </a-col>
            <a-col class="p-1" :span="24">
                <label><b>ทรูวอเล็ต</b></label>
                    <a-select ref="select" v-model:value="formData.bankTrueId" style="width: 100%">
                        <a-select-option value="">เลือกธนาคาร</a-select-option>
                        <template v-for="option in optionsBank" :key="option.name">
                        <a-select-option :value="option.id" v-if="!option.show">
                            <template #default>
                            <a-image :src="option.image" :alt="option.name" width="20px" height="20px" />
                            {{ option.name }}
                            </template>
                        </a-select-option>
                        </template>
                    </a-select>
            </a-col>
            <a-col class="p-1" :span="24">
                <label><b>เลขทรูวอเล็ต</b></label>
                <a-form-item
                    name="bankNo"
                    :rules="[{ required: true, message: 'โปรดกรอกข้อมูล เลขบัญชี!' }]"
                >
                    <a-input v-model:value="formData.bankTrueNo" placeholder="เลขบัญชี"/>
                </a-form-item>
            </a-col>
            <a-col class="p-1 center" :span="8" >
                <label><b>สถานะ</b></label>
            </a-col>
            <a-col class="p-1 center" :span="8" >
                <label><b>มิจฉาชีพ</b></label>
            </a-col>
            <a-col class="p-1 center" :span="8" >
                <label><b>พันธมิตร</b></label>
            </a-col>
            <a-col class="p-2 center" :span="8" >
                <a-switch v-model:checked="formData.IsActive" />
            </a-col>
            <a-col class="p-2 center" :span="8" >
                <a-switch v-model:checked="formData.IsBlock" />
            </a-col>
            <a-col class="p-2 center" :span="8" >
                <a-switch  v-model:checked="formData.IsAgent" />
            </a-col>
            <a-col class="p-1 center" :span="24" v-if="formData.IsBlock">
                <a-textarea
                    v-model:value="formData.RemarkIsBlock"
                    placeholder="หมายเหตุ"
                    :auto-size="{ minRows: 2, maxRows: 5 }"
                />
            </a-col>
            <a-col class="p-1" :span="24">
                <a-row v-if="formData.IsAgent">
                    <a-col class="p-1" :span="12">
                        <label><b>ชื่อพันธมิตร</b></label>
                        <a-form-item
                            name="agentName"
                            :rules="[{ required: true, message: 'โปรดกรอกข้อมูล ชื่อพันธมิตร' }]"
                        >
                            <a-input v-model:value="formData.agentName" placeholder="ชื่อพันธมิตร"/>
                        </a-form-item>
                        
                    </a-col>
                    <a-col class="p-1" :span="12">
                        <label><b>ประเภทคอมมิชชั่น</b></label>
                            <a-select
                            ref="select"
                            v-model:value="formData.agentType"
                            style="width: 100%"
                            >
                                <a-select-option value="0" key="0">ยอดฝากถอน</a-select-option>
                                <a-select-option value="1" key="1">ยอดเสีย</a-select-option>
                            </a-select>
                    </a-col>
                    <a-col class="p-1" :span="12">
                        <label><b>ค่าคอมมิชชั่น ( % )</b></label>
                        <a-form-item
                            name="nameAgent"
                        >
                            <a-input-number v-model:value="formData.agentPercent" placeholder="เปอร์เซ็นต์" :min="1" :max="100" style="width: 100%"/>
                        </a-form-item>
                        
                    </a-col>
                    <a-col class="p-1" :span="12">
                        <label><b>ค่าส่งบริษัท ( % )</b></label>
                        <a-form-item
                            name="AgentCompanyPercent"
                        >
                            <a-input-number v-model:value="formData.AgentCompanyPercent" placeholder="เปอร์เซ็นต์" :min="1" :max="100" style="width: 100%"/>
                        </a-form-item>
                        
                    </a-col>
                </a-row>
            </a-col>
            <a-col class="p-1" :span="24">
                <label><b>เเนะนำ</b></label>
                <a-select
                    v-model:value="formData.agentId"
                    show-search
                    placeholder="Agent ที่ต้องการหา"
                    style="width: 100%"
                    :default-active-first-option="false"
                    :show-arrow="false"
                    :filter-option="false"
                    :not-found-content="null"
                    :options="data"
                    @search="handleSearch"
                    @change="handleChange"
                >
                </a-select>
            </a-col>
        </a-row>
        <a-row justify="center" v-if="load">
            <a-spin size="large" />
        </a-row>
        <a-row justify="center">
            <a-button @click="props.closeModal()" class="m-1">Cancel</a-button>
            <a-button type="primary" html-type="submit" class="m-1 sky">เพิ่ม</a-button>
        </a-row>
    </a-form>
</template>
<script lang="ts" setup>
import { ref  } from 'vue';
import { getDetailconfigMember,createMember,getAgent,editMember,getMemberSearchServices } from '~/services/memberServices';
import { Alert } from '../Alert/alertComponent';

    const optionsBank = ref<any[]>([]);
    const optionsMarketing = ref<any[]>([]);
    const action = ref("create")
    const data = ref<any[]>([{ label:'ไม่เลือกผู้เเนะนำ', value:0 }]);
    // const value = ref();
    const password = ref('');
    const role_req = ref(true)
    // const memberSetting = ref('');
    const props = defineProps<{
        value: string,
        closeModal:Function,
        getMember:Function
        memberEdit:object
    }>();

    let formData = reactive({
        id: 0,
        username: '0623373068',
        password: '',
        firstName: 'นิตยา',
        lastName: 'ชูศรีทอง',
        nameCheck: '',
        usernameAgent: '',
        marketingId: 1,
        lineId: '',
        bankId: 1,
        bankNo: '0270057609',
        bankTrueId:16,
        bankTrueNo:'',
        refKey: '',
        IsActive: true,
        IsBlock: false,
        RemarkIsBlock: '',
        agentId: 0,
        agentName: '',
        IsAgent: false,
        agentPercent: 1,
        AgentCompanyPercent: 1,
        agentType: '0'
    });

    const handleFinish = (values: any) => {
        handleSubmit();
    };

    const handleFinishFailed = (errors: any) => {
        Alert('error',"กรุณากรอกข้อมูลให้กรอบ!!");
    };


    watch(() => props.memberEdit, (newValue:any) => {
        console.log(newValue);
        
        if (newValue) {
            if(newValue.id == undefined){
                action.value ="create";
                formData.username = '0623373061';
                formData.password = '';
                formData.firstName = 'นิตยา';
                formData.lastName = 'ชูศรีทอง';
                formData.nameCheck = '';
                formData.usernameAgent = '';
                formData.marketingId = 1;
                formData.IsActive = true;
                formData.IsBlock = false;
                formData.RemarkIsBlock = '';
                formData.agentId = 0;
                formData.lineId = '';
                formData.bankId = 1;
                formData.bankNo = '0270057609';
                formData.bankTrueId = 16;
                formData.bankTrueNo = '0811111111';
                formData.refKey = '';
                formData.agentName = '';
                formData.IsAgent = false;
                formData.agentPercent = 1;
                formData.AgentCompanyPercent = 1;
                formData.agentType = '0';
                role_req.value = true;
                data.value = [{ label:'ไม่เลือกผู้เเนะนำ', value:0 }];
            }else{
                role_req.value = false;
                action.value ="edit";
                formData.id = newValue.id;
                formData.username = newValue.username;
                formData.password =  password.value;
                formData.firstName = newValue.firstname;
                formData.lastName = newValue.lastname;
                formData.nameCheck = newValue.name_check;
                formData.usernameAgent = newValue.username_agent;
                formData.marketingId = newValue.marketing_id;
                formData.IsActive = newValue.is_active;
                formData.IsBlock = newValue.is_block;
                formData.RemarkIsBlock = newValue.remark_is_black;
                formData.agentId = newValue.agent_id;
                formData.lineId = newValue.line_id;
                formData.bankId = newValue.bank_id;
                formData.bankNo = newValue.bank_no;
                formData.bankTrueId = newValue.bank_true_id;
                formData.bankTrueNo = newValue.bank_true_no;
                formData.refKey = '';
                formData.agentName = newValue.agent_name;
                formData.IsAgent = newValue.is_agent;
                formData.agentPercent = newValue.agent_percent;
                formData.AgentCompanyPercent = newValue.agent_company_percent;
                formData.agentType = newValue.agent_type.toString();

                if(newValue.agent_id != 0){
                    if(newValue.agent.is_agent){
                        data.value = [{ label: `${newValue.agent.username_agent}  ${newValue.agent.agent_name} โดย พันธมิตร`, value: newValue.agent_id }];
                    }else{
                        data.value = [{ label: `${newValue.agent.username_agent} โดย เเนะนำเพื่อน`, value: newValue.agent_id }];
                    }
                }else{
                    data.value = [{ label:'ไม่เลือกผู้เเนะนำ', value:0 }];
                }
            }

        } 
    }, { immediate: true });

    const load = ref(false);

    let timeout: any;
    let currentValue = '';

    function fetch(value: string, callback: any) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        async function fake() {
            try {
                const response = await getMemberSearchServices(formData.id,value);
                if (currentValue === value) {
                    if(response.data != ''){
                        const result = response.data;
                        const data: { label: string; value: number; }[] = [{ label:'ไม่เลือกผู้เเนะนำ', value:0 }];
                        result.forEach((r: any) => {
                            data.push({
                                label: `${r.username_agent}  ${r.agent_name} `,
                                value: r.id,
                            });
                        });
                        console.log(data);
                        callback(data);
                    }
                }
            } catch (error) {
                const data: { label: string; value: number; }[] = [{ label:'ไม่เลือกผู้เเนะนำ', value:0 }];
                callback(data);
                console.error('Error fetching search results:');
            }
        }

        timeout = setTimeout(fake, 300);
    }


    const handleSearch = (val: any) => {
        fetch(val as string, (d: any[]) => (data.value = d));
    };

    const handleChange = async (val: any) => {
        console.log("handleChange");
        formData.agentId = val
    };


    const handleSubmit = async() => {
        if(action.value == "create"){
            const data = await createMember(formData);
            if(data.status == "success"){
                Alert('success','เพิ่มพนักงาน หรือ ผู้ดูเเลระบบเรียบร้อย.')
                props.closeModal()
                props.getMember();
            }else{
                Alert('error',data.message);
            }
        }else{
            const data = await editMember(formData);
            if(data.status == "success"){
                Alert('success','เเก้ไขพนักงาน หรือ ผู้ดูเเลระบบเรียบร้อย.')
                props.closeModal()
                props.getMember();
            }else{
                Alert('error',data.message);
            }
        }
    };

    onMounted(async () => {
      try {
        const data = await getDetailconfigMember();
        if (data.status === "success") {
            optionsBank.value = data.data.Bank
            optionsMarketing.value = data.data.Marketing
            data.data.MemberSetting.forEach((element :any) => {
                if(element.config_name == 'passwordCustomer'){
                    // formData.password = element.config_value
                    password.value = element.config_value
                }
            });
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
      }

    });

</script>
<style>
    .member-form .ant-form-item{
        margin-bottom: 0.5rem;
    }
</style>