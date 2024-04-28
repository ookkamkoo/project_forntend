<template>
    <a-row :gutter="16">
        <a-col :span="24" :md="24">
            <a-row :gutter="16">
                <a-col :span="24" :md="8">
                    <b>เเอดมิน</b>
                </a-col>
                <a-col :span="24" :md="8">
                    <b>โปรโมชั่น</b>
                </a-col>
                <a-col :span="24" :md="8">
                    <b>ประวัติ</b>
                </a-col>
            </a-row>
        </a-col>
        <a-col :span="24" :md="8">
            <div v-for="permission in dataPermission?.admin" :key="permission.id">
                <a-switch v-model:checked.sync="permission.is_active" size="small" /> <span>{{ permission.auth_permission.name }}</span>
            </div>
        </a-col>
        <a-col :span="24" :md="8">
            <div v-for="permission in dataPermission?.promotion" :key="permission.id">
                <a-switch v-model:checked.sync="permission.is_active" size="small" /> <span>{{ permission.auth_permission.name }}</span>
            </div>
        </a-col>
        <a-col :span="24" :md="8">
            <div v-for="permission in dataPermission?.histoty" :key="permission.id">
                <a-switch v-model:checked.sync="permission.is_active" size="small" /> <span>{{ permission.auth_permission.name }}</span>
            </div>
        </a-col>
    </a-row>
    <br>
    <a-row :gutter="16" clas="m-1">
        <a-col :span="24" :md="24">
            <a-row :gutter="16">
                <a-col :span="24" :md="8">
                    <b>ลูกค้า</b>
                </a-col>
                <a-col :span="24" :md="8">
                    <b>พันธมิตร</b>
                </a-col>
                <a-col :span="24" :md="8">
                    <b>สรุปยอด</b>
                </a-col>
            </a-row>
        </a-col>
        <a-col :span="24" :md="8">
            <div v-for="permission in dataPermission?.member" :key="permission.id">
                <a-switch v-model:checked.sync="permission.is_active" size="small" /> <span>{{ permission.auth_permission.name }}</span>
            </div>
        </a-col>
        <a-col :span="24" :md="8">
            <div v-for="permission in dataPermission?.agent" :key="permission.id">
                <a-switch v-model:checked.sync="permission.is_active" size="small" /> <span>{{ permission.auth_permission.name }}</span>
            </div>
        </a-col>
        <a-col :span="24" :md="8">
            <div v-for="permission in dataPermission?.summary" :key="permission.id">
                <a-switch v-model:checked.sync="permission.is_active" size="small" /> <span>{{ permission.auth_permission.name }}</span>
            </div>
        </a-col>
    </a-row>
    <br>
    <a-row :gutter="16" clas="m-1">
        <a-col :span="24" :md="24">
            <a-row :gutter="16">
                <a-col :span="24" :md="8">
                    <b>ตั้งค่า</b>
                </a-col>
                <a-col :span="24" :md="8">
                    <b>จัดการธนาคาร</b>
                </a-col>
                <a-col :span="24" :md="8">
                    <b>ธนาคาร</b>
                </a-col>
            </a-row>
        </a-col>
        <a-col :span="24" :md="8">
            <div v-for="permission in dataPermission?.setting" :key="permission.id">
                <a-switch v-model:checked.sync="permission.is_active" size="small" /> <span>{{ permission.auth_permission.name }}</span>
            </div>
        </a-col>
        <a-col :span="24" :md="8">
            <div v-for="permission in dataPermission?.bankAction" :key="permission.id">
                <a-switch v-model:checked.sync="permission.is_active" size="small" /> <span>{{ permission.auth_permission.name }}</span>
            </div>
        </a-col>
        <a-col :span="24" :md="8">
            <div v-for="permission in dataPermission?.bank" :key="permission.id">
                <a-switch v-model:checked.sync="permission.is_active" size="small" /> <span>{{ permission.auth_permission.name }}</span>
            </div>
        </a-col>
    </a-row>
    <br>
    <a-row :gutter="16" clas="m-1">
        <a-col :span="24" :md="24">
            <a-row :gutter="16">
                <a-col :span="24" :md="8">
                    <b>โบนัส</b>
                </a-col>
                <a-col :span="24" :md="8">
                    <b>ข้อมูลส่วนตัว</b>
                </a-col>
            </a-row>
        </a-col>
        <a-col :span="24" :md="8">
            <div v-for="permission in dataPermission?.bonus" :key="permission.id">
                <a-switch v-model:checked.sync="permission.is_active" size="small" /> <span>{{ permission.auth_permission.name }}</span>
            </div>
        </a-col>
        <a-col :span="24" :md="8">
            <div v-for="permission in dataPermission?.profile" :key="permission.id">
                <a-switch v-model:checked.sync="permission.is_active" size="small" /> <span>{{ permission.auth_permission.name }}</span>
            </div>
        </a-col>
    </a-row>
    <a-row :gutter="16" v-for="permission in dataPermission?.prmotion" :key="permission.id">
        <a-col :span="24" :md="8" >
            <div>
            <a-switch v-model:checked.sync="permission.is_active" size="small" /> <span>{{ permission.auth_permission.name }}</span>
            </div>
        </a-col>
    </a-row>
    <br>
    <a-row justify="center">
        <a-button @click="props.closePermission()" class="m-1">ยกเลิก</a-button>
        <a-button @click="updatePermission" type="primary" html-type="submit" class="m-1 sky" :disabled="dataTure">บันทึก</a-button>
    </a-row>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineProps, watch, onMounted } from 'vue';
  import { Alert } from '../Alert/alertComponent';
  import { getPermisionByIdServices,updatePermissionParent } from '~/services/userServices';
  
  // Define the function before using it
  const getPermisionById = async () => {
        const data = await getPermisionByIdServices(id.value);
        if (data.status === 'success') {
            dataPermission.value = data.data;
            dataTure.value = false
        } else {
            Alert('error', data.message);
        }
    };
  
  const id = ref(0);
  const dataTure = ref(true);
  const dataPermission = ref<any>();
  
  const props = defineProps<{
      closePermission: Function;
      permissionId: number;
  }>();
  
  // Use the watch hook after defining the function
  watch(() => props.permissionId, (newValue) => {    
      if (newValue) {
          id.value = newValue;
          getPermisionById(); // Call the function here
      }
  }, { immediate: true });
  
  // Use the onMounted hook after defining the function
//   onMounted(() => {
//       getPermisionById(); // Call the function here
//   });
  
  const updatePermission = async () =>{
    const data = await updatePermissionParent(id.value,dataPermission.value);
    if(data.status == "success"){
        Alert("success",data.message);
        props.closePermission()
    }else{
        Alert("error",data.message);
    }
  }

  </script>