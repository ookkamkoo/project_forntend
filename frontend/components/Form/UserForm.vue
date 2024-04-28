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

    const action = ref("create")
    const role_req = ref(true)
    const props = defineProps<{
        closeModal:Function
        getUsers:Function
        editData:{
            id: number;
            username: string;
            name: string;
            roleId: string;
        }
    }>();

    let formData = reactive({
            id: 0,
            name: '',
            username: '',
            password: '',
            roleId: "3"
    });  
    
    watch(() => props.editData, (newValue) => {
        if (newValue) {
            if(newValue.id == undefined){
                role_req.value = true
                action.value = "create";
                formData.name = 'admin2';
                formData.username = 'admin2';
                formData.password = 'aa123456789.';
                formData.roleId = '3';
            }else{
                role_req.value = false
                action.value = "edit";
                formData.id = newValue.id;
                formData.name = newValue.name;
                formData.username = newValue.username;
                formData.password = ''; // Reset password field
                formData.roleId = newValue.roleId || '3'; // Set roleId or default to '3'
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

    
    const actionUser = async () => {
        if(action.value == "create"){
            const dataForm = {
                "username":formData.username,
                "password":formData.password,
                "name":formData.name,
                "roleId":parseInt(formData.roleId, 10)
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
                "roleId":parseInt(formData.roleId, 10)
            }
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