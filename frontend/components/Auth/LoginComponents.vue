<template>
  <a-flex gap="middle" vertical>
    <div className="login-container">
      <div class="form-login">
        <a-flex gap="middle" horizontal>
          <div class="login-set-image">
            <a-carousel autoplay>
              <div>
                <img src="https://demos.transloadit.com/49/ea88592a2c40d89be6268b2f047b49/desert.jpg" alt="Desert" style="width: 100%">
              </div>
              <div>
                <img src="https://demos.transloadit.com/49/ea88592a2c40d89be6268b2f047b49/desert.jpg" alt="Desert" style="width: 100%">
              </div>
              <div>
                <img src="https://demos.transloadit.com/49/ea88592a2c40d89be6268b2f047b49/desert.jpg" alt="Desert" style="width: 100%">
              </div>
            </a-carousel>
          </div>
          <div class="login-set">
            <div class="login-set-detail" >
              <div class="login-set-detail-image" >
                <img src="https://betflix24hours.imember.cc/img/websetting/1680175806.png" alt="login logo" width="80%" height="auto">
              </div>
              <div class="center">
                <h1 class="white-text"></h1>
              </div>
              <a-form
                :model="formState"
                name="normal_login"
                class="login-form"
                @finish="onFinish"
              >
                <a-form-item
                  name="username"
                  placeholder="Username"
                  class="input-login"
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
                  class="input-login"
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
                  class="input-login"
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
                    <a-checkbox v-model:checked="formState.remember" class="white-text input-login">จดจำฉันไว้</a-checkbox>
                  </a-form-item>
                </a-form-item>
          
                <a-form-item>
                  <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button" size="large" >
                    เข้าสู่ระบบ
                  </a-button>
                </a-form-item>
                <p class="white-text center">ในกรณีลูกค้าลืมรหัสผ่านหรือไม่สามารถเข้าสู่ระบบได้ให้ติดต่อพนักงาน</p>
              </a-form>
            </div>
          </div>
        </a-flex>
      </div>
    </div>
      <a-modal v-model:open="open" title="Verify QR Code" @ok="handleOk">
      <div class="">
        <a-qrcode :value="text" :size="256"/>
      </div>
    </a-modal>
  </a-flex>
  </template>
  <script setup lang="ts">
  import { reactive, computed } from 'vue';
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
  import { login } from '~/services/authService';
  import { setToken,setName,setUsername,setPermission } from '~/auth/authToken';
  // import { connectWebSocket, sendMessage } from '~/services/socketService';

  // import { connectWebSocket } from '~/services/socketService';
  // emitEvent('aa', 'logn');
  // connectWebSocket();
  const open = ref<boolean>(false);
  const text = ref('');

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
  
  const router = useRouter();

  // login
  const onFinish = async () => {
    // try {
      const data = await login(formState.username, formState.password, formState.twofactor);
      if(data.token != undefined){
        // connectWebSocket();
        setToken(data.token);
        setName(data.name);
        setUsername(data.username);
        setPermission(data.permission);

        router.push('/dashboard');
      }else{
        if(data.message == "authen"){
          text.value = `otpauth://totp/${data.data.name}:${data.data.name}?secret=${data.data.refkey}&issuer=${data.data.name}`
          showModal();
        }else{
          Modal.error({
            title: 'เกิดข้อผิดพลาด',
            content: data.error,
          });
        }
      }
  }

  const showModal = () => {
    open.value = !open.value;
  };
  const handleOk = (e: MouseEvent) => {
    open.value = false;
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
    top: 5%;
    position: relative;
  }
  .icon-set{
    padding: 0 0.3rem;
  }
  .login-set{
    padding: 1rem;
    width: 400px;
    margin: 0 auto;
    background: linear-gradient(88deg,#13b4ca,#18cabe);
    border-radius: 15px;
    box-shadow: 5px 5px 15px 2px #6c6c6c;
  }
  .login-set-image{
    width: 750px;
    padding: 1rem;
    background: linear-gradient(88deg,#13b4ca,#18cabe);
    border-radius: 15px;
    box-shadow: 5px 5px 15px 2px #6c6c6c;
  }
  .login-set-detail{
    width: 320px;
    margin: 0 auto;
  }
  .white-text{
    color: whitesmoke;
  }
  .center{
    text-align: center;
  }

  :deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
  }
  :deep(.slick-slide h3) {
    color: #fff;
  }

  .login-set-image img {
    border-radius: 15px;
  }
  .login-set-detail-image{
    text-align: center;
  }
  .ant-qrcode{
    margin: 0 auto;
  }

  @media screen and (max-width: 1200px) {
    .login-set-image{
      display: none;
    }
    .login-set{
      width: 480px;
    }
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