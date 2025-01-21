<template>
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="กงล้อ">
      </a-tab-pane>
    </a-tabs>
    <div>
        <h4>จำนวนเหรียญที่ใช้งาน</h4>
        <a-col :span="5" :md="5" class="m-1">
            <a-input v-model:value="formData.coin" placeholder="ผลรางวัล" />
        </a-col>
    </div>
    <br>
    <div>
        <h4>รายละเอียดกงล้อ</h4>
        <a-row :justify="'center'">
            <a-col :span="3" :md="1" class="m-1 center">
                <b>ลำดับที่</b>
            </a-col>
            <a-col :span="6" :md="4" class="m-1 center">
                <b>ชื่อผลรางวัล</b>
            </a-col>
            <a-col :span="4" :md="4" class="m-1 center">
                <b>สีกงล้อ</b>
            </a-col>
            <a-col :span="4" :md="4" class="m-1 center">
                <b>ผลรางวัล</b>
            </a-col>
            <a-col :span="4" :md="4" class="m-1 center">
                <b>เปอร์เซ็นต์</b>
            </a-col>
        </a-row>
        <a-row :justify="'center'" v-for="(data, index) in formData.spinWheel" class="m-1">
            <a-col :span="3" :md="1"  class="m-1 center">
                {{index+1}}
            </a-col>
            <a-col :span="4" :md="4" class="m-1 center">
                <a-input v-model:value="data.rewards" placeholder="ผลรางวัล" />
            </a-col>
            <a-col :span="4" :md="4" class="m-1 center">
                <a-input v-model:value="data.bgColor" type="color" class="input-color"/>
            </a-col>
            <a-col :span="4" :md="4" class="m-1 center">
                <a-input v-model:value="data.amount" placeholder="ผลรางวัล" />
            </a-col>
            <a-col :span="4" :md="4" class="m-1 center">
                <a-input-number v-model:value="data.percent" placeholder="เปอร์เซ็นต์" />
            </a-col>
        </a-row>
        <a-row justify="center">
            <a-button  @click="removeColumnScale" class="m-1" danger>ลบ</a-button>
            <a-button  @click="addColumnScale" type="primary" class="m-1 sky" ghost>เพิ่ม</a-button>
        </a-row>
    </div>
    <a-row justify="end">
        <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame">บันทึก</a-button>
    </a-row>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { getSettingSpinWheelServices,saveSettingSpinWheelServices } from '~/services/miniGameService';
  import { Alert } from '../../Alert/alertComponent';
  const activeKey = ref('1');
  let formData = reactive({
    coin:0,
    spinWheel:[{ rewards: "รางวัลที่ 1",bgColor:"#F7F7F7",amount:10,percent:1 }],
    });

    const getSettingGame = async () =>{
        const data = await getSettingSpinWheelServices();
        if (data.status === "success") {
            formData.coin = data.data.game_coin
            formData.spinWheel = data.data.config_value
        }
    }

    const saveSettingGame = async () =>{
        const data = await saveSettingSpinWheelServices(formData);
        if (data.status === "success") {
            Alert('success','เเก้ไขกงล้อเรียบร้อย.')
        }
    }

    const addColumnScale = () => {
        formData.spinWheel.push({ rewards: "", bgColor: "#000000", amount: 0, percent: 0 });
    };

    const removeColumnScale = () => {
        formData.spinWheel.pop();
    };

    onMounted(() => {
        getSettingGame();
    });
    
</script>
<style scoped>
.center{
    text-align: center;
}
.input-color{
    cursor: pointer;
}
</style>
<style>
.select-member-detail{
    margin: 0.20rem;
}
</style>