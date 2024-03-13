<template>
    <a-form
      :model="formData"
      name="basic"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      @submit.prevent="handleSubmit"
      class="member-form"
    >
        <a-row>
            <a-col class="p-1" :span="24" :md="12">
                <label>เบอร์โทรศัพท์</label>
                <a-form-item
                    name="username"
                    :rules="[{ required: true, message: 'โปรดกรอกข้อมูล เบอร์โทรศัพท์!' }]"
                >
                <a-input v-model:value="formData.username" placeholder="เบอร์โทรศัพท์"/>
                </a-form-item>
            </a-col>
            <a-col class="p-1" :span="24" :md="12">
                <label>พาสเวิร์ด</label>
                <a-form-item
                    name="password"
                    :rules="[{ required: true, message: 'โปรดกรอกข้อมูล พาสเวิร์ด!' }]"
                >
                    <a-input v-model:value="formData.password" placeholder="รหัสผ่าน"/>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="p-1" :span="24" :md="12">
                <label>ชื่อ</label>
                <a-form-item
                    name="name"
                    :rules="[{ required: true, message: 'โปรดกรอกข้อมูล ชื่อ!' }]"
                >
                <a-input v-model:value="formData.username" placeholder="ชื่อ"/>
                </a-form-item>
            </a-col>
            <a-col class="p-1" :span="24" :md="12">
                <label>นามสกุล</label>
                <a-form-item
                    name="lastname"
                    placeholder="นามสกุล"
                    :rules="[{ required: true, message: 'โปรดกรอกข้อมูล นามสกุล!' }]"
                >
                    <a-input v-model:value="formData.password" placeholder="นามสกุล"/>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="p-1" :span="24">
                <label>ช่องทางเข้าการถึง</label>
                <a-select
                ref="select"
                v-model:value="formData.bank"
                style="width: 100%"
                >
                <a-select-option value="">เลือกธนาคาร</a-select-option>
                <a-select-option value="1">มียอดฝาก</a-select-option>
                <a-select-option value="2">ไม่มียอดฝาก</a-select-option>
                <a-select-option value="3">พันธมิตร</a-select-option>
                <a-select-option value="4">กำลังใช้งาน</a-select-option>
                </a-select>
            </a-col>
            <a-col class="p-1" :span="24">
                <label>ไลน์ไอดี</label>
                <a-form-item
                    name="password"
                >
                    <a-input v-model:value="formData.password" placeholder="ไลน์ไอดี"/>
                </a-form-item>
            </a-col>
            <a-col class="p-1" :span="24">
                <label>ธนาคาร</label>
                <a-select
                ref="select"
                v-model:value="formData.bank"
                style="width: 100%"
                >
                <a-select-option value="">เลือกธนาคาร</a-select-option>
                <a-select-option value="1">มียอดฝาก</a-select-option>
                <a-select-option value="2">ไม่มียอดฝาก</a-select-option>
                <a-select-option value="3">พันธมิตร</a-select-option>
                <a-select-option value="4">กำลังใช้งาน</a-select-option>
                </a-select>
            </a-col>
            <a-col class="p-1" :span="24">
                <label>เลขบัญชี</label>
                <a-form-item
                    name="password"
                    :rules="[{ required: true, message: 'โปรดกรอกข้อมูล เลขบัญชี!' }]"
                >
                    <a-input v-model:value="formData.password" placeholder="เลขบัญชี"/>
                </a-form-item>
            </a-col>
            <a-col class="p-1" :span="24">
                <label>เลขบัญชี</label>
                <a-form-item
                    name="password"
                    :rules="[{ required: true, message: 'โปรดกรอกข้อมูล เลขบัญชี!' }]"
                >
                    <a-input v-model:value="formData.password" placeholder="เลขบัญชี"/>
                </a-form-item>
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

    const props = defineProps<{
        value: string,
        closeModal:Function
    }>();

    let formData: any = {};

    if (props.value === 'create') {
        formData = {
            username: '',
            password: '',
            name: '',
            lastname: '',
            lineId: '',
            bank: '',
            accountNumber: ''
        };   
    }

    const load = ref(false);


    const handleSubmit = () => {
      console.log('Form submitted!');

      load.value = true;

      setTimeout(() => {
        load.value = false;
        console.log('Process finalized!');
      }, 2000);
    };

</script>
<style>
    .member-form .ant-form-item{
        margin-bottom: 0.5rem;
    }
</style>