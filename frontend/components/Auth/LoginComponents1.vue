<template>
  <a-flex gap="middle" vertical>
    <div className="login-container">
      <div class="form-login">
        <div class="login-set">
          <div class="login-set-detail" >
            <div class="login-set-detail-image py-1" style="margin-bottom: 24px;text-align: center;">
                <a-image
                  width="140px"
                  :preview="false"
                  :src="store.setting.imageLogoWebsite"
                />
                <!-- <img src="https://cdn.zabbet.com/NRM9/lobby_settings/625f5901-0f8d-4f0f-b959-431179967df9.png" alt="login logo" width="80%" height="auto"> -->
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
                :rules="[{ required: true, message: 'Please input your username!' }]"
                style="margin-bottom: 24px;"
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
                style="margin-bottom: 24px;"
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
                style="margin-bottom: 24px;"
              >
                <a-input v-model:value="formState.twofactor" placeholder="รหัสสองชั้น" size="large" :maxlength="6">
                  <template #prefix>
                    <LockOutlined class="site-form-item-icon icon-set" />
                  </template>
                </a-input>
              </a-form-item>
        
              <a-form-item style="margin-bottom: 24px;">
                <a-form-item name="remember" no-style >
                  <a-checkbox v-model:checked="formState.remember" class="white-text">จดจำฉันไว้</a-checkbox>
                </a-form-item>
              </a-form-item>
        
              <a-form-item style="margin-bottom: 24px;">
                <a-button :disabled="disabled" :loading="loading" type="primary" html-type="submit" class="login-form-button" size="large" >
                  เข้าสู่ระบบ
                </a-button>
              </a-form-item>
              <p class="white-text center">ในกรณีลูกค้าลืมรหัสผ่านหรือไม่สามารถเข้าสู่ระบบได้ให้ติดต่อพนักงาน</p>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <a-modal v-model:open="open" title="Verify QR Code" @ok="handleOk">
      <div class="">
        <a-qrcode :value="text" :size="256"/>
        <p>1.หากเพิ่ม Qrcode เเล้วให้กดยืนยัน</p>
        <p>2.ให้กด OK เพื่อทำรายการ Login ด้วยรหัสสองชั้น</p>
        <a-checkbox v-model:checked="checked">ยืนยันการเพิ่ม Qrcode เเล้ว</a-checkbox>
      </div>
    </a-modal>
    <a-modal v-model:open="openPin" title="กรอกข้อมูลใช้งาน pin ครั้งเเรก" @ok="handleOkPin" width="400px">
      <div class="center">
        <a-input v-model:value="valuePin" placeholder="Input Pin" :maxlength="6" @input="validatePin"/>
      </div>
    </a-modal>
  </a-flex>
  </template>
  <script setup lang="ts">
  import { reactive, computed } from 'vue';
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
  import { login,setPinUser } from '~/services/authService';
  import { setToken,setName,setUsername,setPermission } from '~/auth/authToken';
  import { Alert } from '../Alert/alertComponent';
  import { notifyStore } from '~/store/index';
  
  const config = useRuntimeConfig()
  const store = notifyStore();
  const open = ref<boolean>(false);
  const openPin = ref<boolean>(false);
  const text = ref('');
  const valuePin = ref('');
  const refKey = ref<string>('');
  const checked = ref(false);
  const loading = ref<boolean>(false);

  interface FormState {
    username: string;
    password: string;
    twofactor: string;
    remember: boolean;
  }
  const formState = reactive<FormState>({
    username: "",
    password: "",
    twofactor: "",
    remember: true,
  });
  
  const router = useRouter();

  // login
  const onFinish = async () => {
      loading.value = true;
      const data = await login(formState.username, formState.password, formState.twofactor);
      console.log(data);
      
      if(data.token != undefined){
        // connectWebSocket();
        setToken(data.token);
        setName(data.name);
        setUsername(data.username);
        setPermission(data.permission);

        router.push('/dashboard');
      }else{
        if(data.message == "authen"){
          refKey.value = data.data.refkey
          text.value = `otpauth://totp/${data.data.name}:${data.data.name}?secret=${data.data.refkey}&issuer=${data.data.name}`
          // text.value = `otpauth://totp/Programer_Name:Programer_Name?secret=OSCHPWSIHZTMFFYFYO7BXI43UA======&issuer=Programer_Name`
          // console.log(text.value);
          showModal();
        }else if(data.message == "authen_pin"){
          refKey.value = data.data.refkey
          showModalPin();
        }else{
          Modal.error({
            title: 'เกิดข้อผิดพลาด',
            content: data.error,
          });
        }
      }
      loading.value = false;
  }

  const validatePin = () => { 
    valuePin.value = valuePin.value.replace(/\D/g, '');
    if (valuePin.value.length > 6) {
      valuePin.value = valuePin.value.slice(0, 6);
    }
  }
  const showModal = () => {
    open.value = !open.value;
  };

  const showModalPin = () => {
    openPin.value = !openPin.value;
  };

  const handleOk = async(e: MouseEvent) => {
    console.log("2222222222222");
    console.log(checked.value);
    
    if(checked.value){
      const data = await setPinUser(refKey.value,"");
      if(data.status == "success"){
          Alert('success','เพิ่ม google authenticator เรียบร้อยเเล้ว.')
      }else{
          Alert('error',data.message);
      }
      open.value = false;
    }else{
      Alert('error',"กรุณากดยืนยัน Qrcode");
    }
  };

  const handleOkPin = async() => {
    const data = await setPinUser(refKey.value,valuePin.value);
    if(data.status == "success"){
        Alert('success','เพิ่ม pin เรียบร้อยเเล้ว.')
    }else{
        Alert('error',data.message);
    }

    openPin.value = false;
  };
  
  const disabled = computed(() => {
    return !(formState.username && formState.password);
  });

</script>

<style scoped>
  .white-text{
    color: whitesmoke;
  }
  .center{
    text-align: center;
  }
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
  .py-1{
    padding: 1rem 0 !important; 
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