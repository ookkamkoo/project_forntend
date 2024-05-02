<template>
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="ตั้งค่าค่ายเกมส์">
        <a-row>
          <h2>ตั้งค่าเมนู</h2>
          <a-col :span="24" :md="24">
            <a-form
            :model="formData"
            name="basic"
            :wrapper-col="{ span: 24 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
            >
              <a-row justify="center">
                <a-col :xs="8" :md="4" :lg="2" class="p-1" v-for="game in formData.game">
                  <div class="center">
                    <a-image
                      width="100%"
                      :src="game.image"
                      :preview="false"
                    />
                    <h3>{{game.name}}</h3>
                    <a-switch v-model:checked="game.is_active" />
                    <div class="p-2">
                      <a-input-number id="inputNumber" v-model:value="game.priority" :min="1"/>
                    </div>
                  </div>
                </a-col>
              </a-row>
              <br>
              <a-row justify="end">
                <a-button type="primary" class="sky" html-type="submit">บันทึก</a-button>
              </a-row>
            </a-form>
              <br>
              <hr>
          </a-col>
          <br>
          <h2>ตั้งค่าเกมส์</h2>
          <a-col :span="24" :md="24" v-for="game in formData.game">
            <h3>{{game.name}}</h3>
            <a-row>
              <a-col :span="8" :md="4" :lg="2" class="p-1" v-for="gameDetail in game.settingGame" >
                <div class="center">
                  <a-image
                    width="100%"
                    :src="gameDetail.image"
                    :preview="false"
                  />
                  <p class="long-text">{{gameDetail.name}}</p>
                  <a-switch v-model:checked="gameDetail.is_active"/>
                  <div class="p-2">
                    <a-input-number id="inputNumber" v-model:value="gameDetail.priority" :min="1"/>
                  </div>
                </div>
              </a-col>
            </a-row>
            <br>
            <a-row justify="end">
                <a-button type="primary" class="sky" @click="editSettingGame(game.name)" >บันทึก</a-button>
            </a-row>
            <br>
            <hr>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
  </template>
  <script lang="ts" setup>
  import { ref,createVNode } from 'vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  // import * as Constants from '../Constants/Constants';
  import { getSettingGameServices,setSettingGameMenu,setSettingGame } from '~/services/settingGameService';
  import { Alert } from '../Alert/alertComponent';

  const activeKey = ref('1');

  let formData = reactive({
    casinoStatus: true,
    game: [] as any,
  })
  const getSettingGame = async () =>{
    const data = await getSettingGameServices();
    if (data.status === "success") {
      formData.game = data.data
    }
  }

  const onFinish = async() => {
        const data = await setSettingGameMenu(formData);
        if(data.status == "success"){
            Alert('success','เเก้ไขการตั้งค่า เรียบร้อย.')
        }else{
            Alert('error',data.message);
        }
    }

  const onFinishFailed = (errorInfo: any) => {
      Alert("error","กรุณากรอกข้อมูลให้ครบ!!")
  };
  
  const editSettingGame = async(typeGame:string) => {
    const data = await setSettingGame(formData,typeGame);
        if(data.status == "success"){
            Alert('success','เเก้ไขการตั้งค่า เรียบร้อย.')
        }else{
            Alert('error',data.message);
        }
  };




  onMounted(() => {
    getSettingGame();
    });
    
  </script>