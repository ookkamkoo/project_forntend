<template>
    <div className="login-container">
      <div class="form-login">
        <img src="https://betflix24hours.imember.cc/img/websetting/1680175806.png" alt="login logo" width="100%" height="auto">
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
                <UserOutlined class="site-form-item-icon icon-set" />
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
                <LockOutlined class="site-form-item-icon icon-set" />
              </template>
            </a-input-password>
          </a-form-item>
          
          <a-form-item
            name="twofactor"
            placeholder="twofactor"
            :rules="[{ required: true, message: 'Please input your twofactor!' }]"
          >
            <a-input v-model:value="formState.twofactor" placeholder="รหัสสองชั้น" size="large" :maxlength="6">
              <template #prefix>
                <LockOutlined class="site-form-item-icon icon-set" />
              </template>
            </a-input>
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
    </div>
  </template>
  <script setup lang="ts">
  import { reactive, computed } from 'vue';
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
  interface FormState {
    username: string;
    password: string;
    twofactor: string;
    remember: boolean;
  }
  const formState = reactive<FormState>({
    username: '',
    password: '',
    twofactor: '',
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
    /* align-items: center; */
    height: 100vh;
  }
  
  .login-form {
    width: 100%;
  }
  .login-container .login-form {
    max-width: 100%;
  }
  .login-container .login-form-button {
    width: 100%;
  }
  .form-login{
    padding: 2rem;
    border-radius: 13px;
    margin: 0 auto;
    width: 420px;
  }
  .icon-set{
    padding: 0 0.3rem;
  }
  @media screen and (max-width: 420px) {
    .login-form {
      width: 100%;
    }
    .form-login{
      padding: 0rem ;
    }
  }
  </style>