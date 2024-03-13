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
                    <label>ยูสเซอร์เนม :</label>
                    <a-form-item
                        name="username"
                        :rules="[{ required: true, message: 'Please input your username!' }]"
                    >
                        <a-input v-model:value="formState.username" />
                    </a-form-item>
                    
                    <label>รหัสผ่านเดิม :</label>
                    <a-form-item
                        name="password"
                        :rules="[{ required: true, message: 'Please input your password!' }]"
                    >
                        <a-input-password v-model:value="formState.password" />
                    </a-form-item>

                    <label>รหัสผ่านใหม่ :</label>
                    <a-form-item
                        name="password"
                        :rules="[{ required: true, message: 'Please input your password!' }]"
                    >
                        <a-input-password v-model:value="formState.password" />
                    </a-form-item>

                    <label>ยืนยันรหัสผ่านใหม่ :</label>
                    <a-form-item
                        name="password"
                        :rules="[{ required: true, message: 'Please input your password!' }]"
                    >
                        <a-input-password v-model:value="formState.password" />
                    </a-form-item>
                
                    <a-form-item class="profile-submit">
                        <a-button type="primary" html-type="submit">บันทึก</a-button>
                    </a-form-item>
                </a-form>
            </a-card>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';

    interface FormState {
    username: string;
    password: string;
    remember: boolean;
    }

    const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
    });
    const onFinish = (values: any) => {
    console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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