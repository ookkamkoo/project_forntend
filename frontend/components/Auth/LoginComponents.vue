<template>
    <div className="login-container">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="username"
          placeholder="Username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" placeholder="ชื่อผู้ใช้งาน" size="large">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
  
        <a-form-item
          name="password"
          placeholder="Password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" placeholder="รหัสผ่าน" size="large">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
  
        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">จดจำฉันไว้</a-checkbox>
          </a-form-item>
        </a-form-item>
  
        <a-form-item>
          <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button" size="large">
            เข้าสู่ระบบ {{$config.VARIABLE_NAME}}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </template>
  <script setup lang="ts">
  import { reactive, computed } from 'vue';
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
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
  const disabled = computed(() => {
    return !(formState.username && formState.password);
  });
  </script>
  <style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .login-form {
    width: 400px;
  }
  .login-container .login-form {
    max-width: 400px;
  }
  .login-container .login-form-button {
    width: 100%;
  }
  </style>