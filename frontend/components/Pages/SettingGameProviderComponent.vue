<template>
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="ตั้งค่าค่ายเกมส์">
        <a-row>
          <h2>ตั้งค่าเมนู</h2>
          <a-col :span="24" :md="24">
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
                <a-button type="primary" class="sky" html-type="submit">บันทึก</a-button>
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
  import { getSettingGameServices,updateGameMenuServices,updateGameServices } from '~/services/settingGameService';
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

  const updateStatusGame = async(name: string,status: boolean,id: number) =>{
  let is_active = ''; 
    if (status) {
        is_active = 'เปิดใช้งาน';
    } else {
        is_active = 'ปิดใช้งาน';
    }

    Modal.confirm({
        title: 'คุณต้องการที่จะเปลี่ยนสถานะใช่ไหม?',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', { key: 'content' }, [`เปลี่ยนสถานะของ ${name} เป็น${is_active}`]),
        async onOk() {
            const data = await updateGameServices(id, status);
            if (data.status == 'success') {
                Alert("success", "เปลี่ยนสถานะเรียบร้อย.");
            } else {
                Alert("error", data.message);
            }
        },
        onCancel() {
          getSettingGame();
          console.log('Cancel');
        },
        class: 'test',
    });
}

  onMounted(() => {
    getSettingGame();
    });
    
  </script>