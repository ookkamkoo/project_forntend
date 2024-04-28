<template>
  <a-flex gap="middle" vertical>
    <div className="login-container">
      <div class="form-login">
        <div class="login-set">
          <div class="login-set-detail" >
            <img src="https://betflix24hours.imember.cc/img/websetting/1680175806.png" alt="login logo" width="100%" height="auto">
            <div class="center">
              <h1 class="white-text"></h1>
            </div>
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
                  <a-checkbox v-model:checked="formState.remember" class="white-text">จดจำฉันไว้</a-checkbox>
                </a-form-item>
              </a-form-item>
        
              <a-form-item>
                <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button" size="large" >
                  เข้าสู่ระบบ
                </a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
    </div>
  </a-flex>
  </template>
  <script setup lang="ts">
  import { reactive, computed } from 'vue';
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
  import { login } from '~/services/authService';

  interface FormState {
    username: string;
    password: string;
    twofactor: string;
    remember: boolean;
  }
  const formState = reactive<FormState>({
    username: "programer",
    password: "aa123456789.",
    twofactor: "123456",
    remember: true,
  });
  
  // login
  const router = useRouter();
  const onFinish = async () => {
    try {
      const jwt_token = await login(formState.username, formState.password, formState.twofactor);
      if (jwt_token.token !== '') {
        console.log(jwt_token);
        console.log('Login successful');
        // Use router to navigate to dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
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
    height: 100vh;
  }
  .login-set img{
    margin: 0 auto;
    
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
  .login-form-button{
    background: #ffffff53;
    border: 2px solid #fff;
    box-shadow: 2px 2px 15px 2px #ffffff5b;
  }
  .login-form-button:hover{
    background: #1cb8bd !important;
  }
  .form-login{
    padding: 2rem;
    border-radius: 13px;
    margin: 0 auto;
    width: 640px;
    top: 5%;
    position: relative;
  }
  .icon-set{
    padding: 0 0.3rem;
  }
  .login-set{
    padding: 1rem;
    width: 500px;
    margin: 0 auto;
    background: linear-gradient(88deg,#13b4ca,#18cabe);
    border-radius: 15px;
    box-shadow: 5px 5px 15px 2px #6c6c6c;
  }
  .login-set-detail{
    width: 320px;
    margin: 0 auto;
  }

  @media screen and (max-width: 420px) {
    .login-form,.login-set{
      width: 100%;
    }
    .form-login,.login-set{
      padding: 0rem ;
    }
    .login-set-detail{
      padding: 10px;
      padding-bottom: 1rem;
    }
  }
  </style>