<template>
    <div class="view">
        <div class="profile-set">
            <a-card  class="profile-form box-shadow">
                <a-form
                :model="formState"
                name="basic"
                :wrapper-col="{ span: 24 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
                >   
                    <div class="my-1">
                        <label><b>ชื่อ</b></label>
                        <a-form-item
                            name="name"
                        >
                            <a-input v-model:value="formState.name" :disabled="true"/>
                        </a-form-item>
                    </div>
                    <div class="my-1">
                        <label><b>ยูสเซอร์เนม</b></label>
                        <a-form-item
                            name="username"
                            :rules="[{ required: true, message: 'Please input your username!' }]"
                        >
                            <a-input v-model:value="formState.username" />
                        </a-form-item>
                    </div>
                    <div class="my-1">
                        <label><b>รหัสผ่านเดิม</b></label>
                        <a-form-item
                            name="passwordOld"
                            :rules="[{ required: true, message: 'Please input your old password!' }]"
                        >
                            <a-input-password v-model:value="formState.passwordOld" />
                        </a-form-item>
                    </div>

                    <div class="my-1">
                        <label><b>รหัสผ่านใหม่</b></label>
                        <a-form-item
                            name="password"
                            :rules="[{ required: true, message: 'Please input your new password!' }]"
                        >
                            <a-input-password v-model:value="formState.password" />
                        </a-form-item>
                    </div>

                    <div class="my-1">
                        <label><b>ยืนยันรหัสผ่านใหม่</b></label>
                        <a-form-item
                            name="passwordAgain"
                            :rules="[{ required: true, message: 'Please input your new password again!' }]"
                        >
                            <a-input-password v-model:value="formState.passwordAgain" />
                        </a-form-item>
                    </div>
                    <br>
                    <div class="my-1">
                        <a-form-item class="profile-submit">
                            <a-button type="primary" html-type="submit">บันทึก</a-button>
                        </a-form-item>
                    </div>
                </a-form>
            </a-card>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { getName,getUsername } from '~/auth/authToken';
import { Alert } from '../Alert/alertComponent';
import { updateProfile } from '~/services/userServices';

    interface FormState {
        name: string;
        username: string;
        passwordOld: string;
        password: string;
        passwordAgain: string;
    }

    const formState = reactive<FormState>({
    name:  getName() || '',
    username: getUsername() || '',
    passwordOld: '',
    password: '',
    passwordAgain: '',
    });

    const onFinish = async(values: any) => {
        if(formState.password == formState.passwordAgain){
            const data = await updateProfile(formState);
            if(data.status == "success"){
                Alert('success','เเก้ไขข้อมูลโปรไฟล์เรียบร้อย.')
            }else{
                Alert('error',data.message);
            }
        }else{
            Alert("error","รหัสผ่านไม่ตรงกัน!!")
        }
    // console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        Alert("error","กรุณากรอกข้อมูลให้ครบ!!")
    };
</script>
<style>
    .profile-set{
        width: 100%;
    }
    .profile-form{
        width: 640px;
        margin: 0 auto;
    }
    .profile-submit{
        text-align: center;
    }
    .view{
        width: 100%;
        height: 80vh;
    }
    @media screen and (max-width: 952px) {
        /* Styles for desktop */
        .profile-form{
        width: 100% !important;
        }
    }
</style>