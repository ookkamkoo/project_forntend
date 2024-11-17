<template>
    <a-form
      :model="formData"
      name="basic"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      @submit.prevent="actionUser"
      class="member-form"
    >
        <a-row>
            <a-col class="p-1" :span="24" :md="24">
                <label>ชื่อ</label>
                <a-form-item
                    name="name"
                    :rules="[{ required: true, message: 'โปรดกรอกข้อมูล ชื่อ!' }]"
                >
                    <a-input v-model:value="formData.name" placeholder="ชื่อ"/>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="p-1" :span="24" :md="24">
                <label>ยูสเซอร์เนม</label>
                <a-form-item
                    name="username"
                    :rules="[{ required: true, message: 'โปรดกรอกข้อมูล ยูสเซอร์เนม!' }]"
                >
                <a-input v-model:value="formData.username" placeholder="ยูสเซอร์เนม"/>
                </a-form-item>
            </a-col>
            <a-col class="p-1" :span="24" :md="24">
                <label>พาสเวิร์ด</label>
                <a-form-item
                    name="password"
                    :rules="[{ required: role_req, message: 'โปรดกรอกข้อมูล พาสเวิร์ด!' }]"
                >
                    <a-input v-model:value="formData.password" placeholder="รหัสผ่าน"/>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="p-1" :span="24">
                <label>ตำเเหน่ง</label>
                <a-select
                ref="select"
                v-model:value="formData.roleId"
                style="width: 100%"
                >
                    <template v-if="formData.roleId=='1'">
                        <a-select-option key="1" value="1" >Programer</a-select-option>
                    </template>
                    <template v-else>
                        <a-select-option key="" value="" disabled>กรุณาเลือกตำเเหน่ง</a-select-option>
                        <a-select-option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</a-select-option>
                    </template>
                </a-select>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="24" :md="12">
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
            <a-col :span="24" :md="12">
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
            <a-col :span="24" :md="12">
                <div class="mx-1 my-1">
                    <label for="เวลาเปิด"><b>เวลาเปิด</b></label>
                    <a-time-picker v-model:value="formData.time.timeOpen" format="HH:mm" />
                </div>
            </a-col>
            <a-col :span="24" :md="12">
                <div class="mx-1 my-1">
                    <label for="เวลาเปิด"><b>เวลาปิด</b></label>
                    <a-time-picker v-model:value="formData.time.timeCloss" format="HH:mm" />
                </div>
            </a-col>
        </a-row>
        <!-- <a-row justify="center" v-if="load">
            <a-spin size="large" v-if="load"/>
        </a-row> -->
        <a-row justify="center">
            <a-button @click="props.closeModal()" class="m-1">Cancel</a-button>
            <a-button type="primary" html-type="submit" class="m-1 sky">เพิ่ม</a-button>
        </a-row>
        
    </a-form>
</template>
<script lang="ts" setup>
    import { ref,onMounted,reactive } from 'vue';
    import { getRoleUserServices,createUser,editUser } from '~/services/userServices';
    import { Alert } from '../Alert/alertComponent';
    import * as Constants from '../Constants/Constants';
    import dayjs from 'dayjs';
    import utc from 'dayjs/plugin/utc';
    import timezone from 'dayjs/plugin/timezone';

    const action = ref("create")
    const role_req = ref(true)
    const open = ref<boolean>(true);
    const all = ref(false);
    const props = defineProps<{
        closeModal:Function
        getUsers:Function
        editData:{
            id: number;
            username: string;
            name: string;
            roleId: string;
            time_open_close: string;
            time_open: string;
            time_close: string;
            type_open: number;
            open_data: string[];
        }
    }>();

    let formData = reactive({
            id: 0,
            name: '',
            username: '',
            password: '',
            roleId: "3",
            dayOpen:'1',
            timeOpen:'1',
            time:{
                timeOpen:dayjs('00:00', 'HH:mm'),
                timeCloss:dayjs('23:59', 'HH:mm'),
            },
            day:[] as string[],
            week:[] as string[],
    });  
    
    watch(() => props.editData, (newValue) => {
        console.log(newValue);
        
        if (newValue) {
            if(newValue.id == undefined){
                role_req.value = true
                action.value = "create";
                formData.name = 'admin2';
                formData.username = 'admin2';
                formData.password = 'aa123456789.';
                formData.roleId = '3';
                formData.dayOpen = '1';
                formData.timeOpen = '1';
                formData.time = {
                    timeOpen:dayjs('00:00', 'HH:mm'),
                    timeCloss:dayjs('23:59', 'HH:mm'),
                };
                formData.day = [] as string[]
                formData.week = [] as string[];
            }else{
                role_req.value = false
                action.value = "edit";
                formData.id = newValue.id;
                formData.name = newValue.name;
                formData.username = newValue.username;
                formData.password = ''; // Reset password field
                formData.roleId = newValue.roleId || '3'; // Set roleId or default to '3'
                formData.dayOpen = newValue.type_open.toString();
                formData.timeOpen = newValue.time_open_close.toString();
                
                // if (newValue.time_open === "2024-11-03T00:00:00+07:00") {
                //     console.log(newValue.time_open);
                //     formData.time.timeOpen = dayjs("00:00", 'HH:mm');
                // }else{
                //     formData.time.timeOpen = dayjs(newValue.time_open,'HH:mm');
                // }
                
                // if (newValue.time_close === "2024-11-03T23:59:00+07:00") {
                //     console.log(newValue.time_close);
                //     formData.time.timeCloss = dayjs("23:59", 'HH:mm');
                // } else {
                //     formData.time.timeCloss = dayjs(newValue.time_close,'HH:mm');
                // }

                dayjs.extend(utc);
                dayjs.extend(timezone);

                const timeOpen = dayjs(newValue.time_open).tz('Asia/Bangkok').format('HH:mm');
                const timeClose = dayjs(newValue.time_close).tz('Asia/Bangkok').format('HH:mm');

                formData.time = {
                    timeOpen: dayjs(timeOpen, 'HH:mm'),
                    timeCloss: dayjs(timeClose, 'HH:mm'),
                };

                if(newValue.type_open == 2){
                    formData.week = newValue.open_data
                }else if(newValue.type_open == 3){
                    formData.day = newValue.open_data
                }
            }
        } 
    }, { immediate: true });

    interface Option {
        value: string;
        label: string;
    }

    const load = ref(false);

    const options = ref<Option[]>([]);

    onMounted(async () => {
      try {
        const data = await getRoleUserServices();
        if (data.status === "success") {
            options.value = data.data.map(role => ({
                value: role.id.toString(),
                label: role.name
            }));
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
      }
    });

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

    const actionUser = async () => {
        if(action.value == "create"){
            const dataForm = {
                "username":formData.username,
                "password":formData.password,
                "name":formData.name,
                "roleId":parseInt(formData.roleId, 10),
                "dayOpen":formData.dayOpen,
                "day":formData.day,
                "week":formData.week,
                "timeOpen":formData.timeOpen,
                "time":formData.time,
            }
            
            const data = await createUser(dataForm);
            if(data.status == "success"){
                Alert('success','เพิ่มพนักงาน หรือ ผู้ดูเเลระบบเรียบร้อย.')
                props.closeModal()
                props.getUsers()
            }else{
                Alert('error',data.message);
            }
        }else{
            const dataForm = {
                "id":formData.id,
                "username":formData.username,
                "password":formData.password,
                "name":formData.name,
                "roleId":parseInt(formData.roleId, 10),
                "dayOpen":formData.dayOpen,
                "day":formData.day,
                "week":formData.week,
                "timeOpen":formData.timeOpen,
                "time":formData.time,
            }
            console.log("aaaaaaaaaaaa");
            console.log(dataForm);
            
            const data = await editUser(dataForm);
            if(data.status == "success"){
                Alert('success','เเก้ไขพนักงาน หรือ ผู้ดูเเลระบบเรียบร้อย.')
                props.closeModal()
                props.getUsers()
            }else{
                Alert('error',data.message);
            }
        }
    };

</script>
<style>
    .member-form .ant-form-item{
        margin-bottom: 0.5rem;
    }
</style>../Alert/alertComponent