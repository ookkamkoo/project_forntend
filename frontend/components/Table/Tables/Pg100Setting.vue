<template>
  <a-col :span="24">
    <a-row>
      <h2>ตั้งค่าเกมส์ PG ปรับเเตก</h2>
      <a-col :span="24" :md="24">
        <a-row class="my-0">
          <a-col :span="24">
            <h3>ข้อระวัง</h3>
            <p>
              1.ตั้งค่า default ระบบ คือ 40%
            </p>
            <p>
              2.เมื่อตั้งค่าเสร็จเเล้วลูกค้าต้องออกเกมส์เข้าใหม่ถึงจะเป็น setting ล่าสุด
            </p>
            <a-row justify="start">
                <span v-if="show_data == 1"><a-button type="primary" class="select-member-detail" @click="chang_show_data(1)">เเตก 20 %</a-button></span>
                <span v-else><a-button type="primary" class="select-member-detail" @click="chang_show_data(1)" ghost>เเตก 20 %</a-button></span>

                <span v-if="show_data == 2"><a-button type="primary" class="select-member-detail" @click="chang_show_data(2)">เเตก 40 % (เเนะนำ)</a-button></span>
                <span v-else><a-button type="primary" class="select-member-detail" @click="chang_show_data(2)" ghost>เเตก 40 % (เเนะนำ)</a-button></span>

                <span v-if="show_data == 3"><a-button type="primary" class="select-member-detail" @click="chang_show_data(3)">เเตก 50 % (เเนะนำ)</a-button></span>
                <span v-else><a-button type="primary" class="select-member-detail" @click="chang_show_data(3)" ghost>เเตก 50 % (เเนะนำ)</a-button></span>

                <span v-if="show_data == 4"><a-button type="primary" class="select-member-detail" @click="chang_show_data(4)">เเตก 60 % </a-button></span>
                <span v-else><a-button type="primary" class="select-member-detail" @click="chang_show_data(4)" ghost>เเตก 60 %</a-button></span>

                <span v-if="show_data == 5"><a-button type="primary" class="select-member-detail" @click="chang_show_data(5)">เเตก 80 %</a-button></span>
                <span v-else><a-button type="primary" class="select-member-detail" @click="chang_show_data(5)" ghost>เเตก 80 %</a-button></span>

                <span v-if="show_data == 6"><a-button type="primary" class="select-member-detail" @click="chang_show_data(6)">กำหนดเอง</a-button></span>
                <span v-else><a-button type="primary" class="select-member-detail" @click="chang_show_data(6)" ghost>กำหนดเอง</a-button></span>
            </a-row>
          </a-col>
      </a-row>
        <h2>setting</h2>
          <h3>Normal Spin</h3>
          <a-flex :wrap="'wrap'">
            <a-col :span="12" class="p-2">
              <label for="normal-spin"><b>normal-spin ( ไม่แตกเลย ) %</b></label>
              <a-form-item ref="normal-spin" name="normal-spin">
                  <a-input v-model:value="formData.settingPG.setting[0].percent" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
          </a-flex>
          <h3>Less Bet</h3>
          <a-flex :wrap="'wrap'">
            <a-col :span="12" class="p-2">
              <label for="less-bet"><b>less-bet ( ชนะแบบขาดทุน < 1 เท่า ) %</b></label>
              <a-form-item ref="less-bet" name="less-bet">
                  <a-input v-model:value="formData.settingPG.setting[1].percent" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
          </a-flex>
          <a-flex :wrap="'wrap'">
            <a-col :span="12" class="p-2">
              <label for="option-from"><b>option-from ( จำนวนเท่าที่ต้องการออกผลเริ่มต้น )</b></label>
              <a-form-item ref="option-from" name="option-from">
                  <a-input v-model:value="formData.settingPG.setting[1].option.from" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
            <a-col :span="12" class="p-2">
              <label for="option-to"><b>option-to ( จำนวนเท่าที่ต้องการออกผลถึง )</b></label>
              <a-form-item ref="option-to" name="option-to">
                  <a-input v-model:value="formData.settingPG.setting[1].option.to" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
          </a-flex>
          <h3>More Bet</h3>
          <a-flex :wrap="'wrap'">
            <a-col :span="12" class="p-2">
              <label for="more-bet"><b>more-bet ( ชนะมากกว่า 1 เท่าเป็นตันไป ) %</b></label>
              <a-form-item ref="more-bet" name="more-bet">
                  <a-input v-model:value="formData.settingPG.setting[2].percent" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
          </a-flex>
          <a-flex :wrap="'wrap'">
            <a-col :span="12" class="p-2">
              <label for="option-from"><b>option-from ( จำนวนเท่าที่ต้องการออกผลเริ่มต้น )</b></label>
              <a-form-item ref="option-from" name="option-from">
                  <a-input v-model:value="formData.settingPG.setting[2].option.from" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
            <a-col :span="12" class="p-2">
              <label for="option-to"><b>option-to ( จำนวนเท่าที่ต้องการออกผลถึง )</b></label>
              <a-form-item ref="option-to" name="option-to">
                  <a-input v-model:value="formData.settingPG.setting[2].option.to" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
          </a-flex>
          <h3>Freespin Less Bet</h3>
          <a-flex :wrap="'wrap'">
            <a-col :span="12" class="p-2">
              <label for="freespin-less-bet"><b>freespin-less-bet ( การตั้งค่า from - to ไม่ควรเกิน 0 - 0.5 ) % </b></label>
              <a-form-item ref="freespin-less-bet" name="freespin-less-bet">
                  <a-input v-model:value="formData.settingPG.setting[3].percent" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
          </a-flex>
          <a-flex :wrap="'wrap'">
            <a-col :span="12" class="p-2">
              <label for="option-from"><b>option-from ( จำนวนเท่าที่ต้องการออกผลเริ่มต้น )</b></label>
              <a-form-item ref="option-from" name="option-from">
                  <a-input v-model:value="formData.settingPG.setting[3].option.from" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
            <a-col :span="12" class="p-2">
              <label for="option-to"><b>option-to ( จำนวนเท่าที่ต้องการออกผลถึง )</b></label>
              <a-form-item ref="option-to" name="option-to">
                  <a-input v-model:value="formData.settingPG.setting[3].option.to" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
          </a-flex>
          <h3>Freespin More Bet</h3>
          <a-flex :wrap="'wrap'">
            <a-col :span="12" class="p-2">
              <label for="freespin-more-bet"><b>freespin-more-bet ( การตั้งค่า from - to ไม่ควรเกิน 0 - 5 เท่า )</b></label>
              <a-form-item ref="freespin-more-bet" name="freespin-more-bet">
                  <a-input v-model:value="formData.settingPG.setting[4].percent" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
          </a-flex>
          <a-flex :wrap="'wrap'">
            <a-col :span="12" class="p-2">
              <label for="option-from"><b>option-from ( จำนวนเท่าที่ต้องการออกผลเริ่มต้น )</b></label>
              <a-form-item ref="option-from" name="option-from">
                  <a-input v-model:value="formData.settingPG.setting[4].option.from" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
            <a-col :span="12" class="p-2">
              <label for="option-to"><b>option-to ( จำนวนเท่าที่ต้องการออกผลถึง )</b></label>
              <a-form-item ref="option-to" name="option-to">
                  <a-input v-model:value="formData.settingPG.setting[4].option.to" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
          </a-flex>
          <h2>buyFeatureSetting</h2>
          <h3>Buy Feature Less Bet</h3>
          <a-flex :wrap="'wrap'">
            <a-col :span="12" class="p-2">
              <label for="buy-feature-less-bet"><b>buy-feature-less-bet ( ให้ตั้งค่าเหมือนกับ freespin-less-bet )</b></label>
              <a-form-item ref="buy-feature-less-bet" name="buy-feature-less-bet">
                  <a-input v-model:value="formData.settingPG.buyFeatureSetting[0].percent" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
          </a-flex>
          <a-flex :wrap="'wrap'">
            <a-col :span="12" class="p-2">
              <label for="option-from"><b>option-from ( จำนวนเท่าที่ต้องการออกผลเริ่มต้น )</b></label>
              <a-form-item ref="option-from" name="option-from">
                  <a-input v-model:value="formData.settingPG.buyFeatureSetting[0].option.from" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
            <a-col :span="12" class="p-2">
              <label for="option-to"><b>option-to ( จำนวนเท่าที่ต้องการออกผลถึง )</b></label>
              <a-form-item ref="option-to" name="option-to">
                  <a-input v-model:value="formData.settingPG.buyFeatureSetting[0].option.to" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
          </a-flex>

          <h3>Freespin More Bet</h3>
          <a-flex :wrap="'wrap'">
            <a-col :span="12" class="p-2">
              <label for="freespin-more-bet"><b>freespin-more-bet ( ให้ตั้งค่าเหมือนกับ buy-feature-more-bet )</b></label>
              <a-form-item ref="freespin-more-bet" name="freespin-more-bet">
                  <a-input v-model:value="formData.settingPG.buyFeatureSetting[1].percent" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
          </a-flex>
          <a-flex :wrap="'wrap'">
            <a-col :span="12" class="p-2">
              <label for="option-from"><b>option-from ( จำนวนเท่าที่ต้องการออกผลเริ่มต้น )</b></label>
              <a-form-item ref="option-from" name="option-from">
                  <a-input v-model:value="formData.settingPG.buyFeatureSetting[1].option.from" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
            <a-col :span="12" class="p-2">
              <label for="option-to"><b>option-to ( จำนวนเท่าที่ต้องการออกผลถึง )</b></label>
              <a-form-item ref="option-to" name="option-to">
                  <a-input v-model:value="formData.settingPG.buyFeatureSetting[1].option.to" :disabled="show_data != 6"/>
              </a-form-item>
            </a-col>
          </a-flex>
          <br>
          <a-row justify="center">
            <a-button type="primary" class="sky" html-type="submit" @click="editSettingPG100ByUser()">บันทึก</a-button>
          </a-row>
        <br>
        <hr>
      </a-col>
    </a-row>
  </a-col>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { getGamePGSettingByUserServices,editSettingPG100ServicesByUser } from '~/services/settingGameService';
import { Alert } from '@/components/Alert/alertComponent';

const loading = ref(true);
const show_data = ref(1);

interface SettingPG {
  gameCode: string;
  username: string;
  isPlayerSetting: boolean;
  setting: {
    name: string;
    output: string;
    percent: number;
    option: {
      from: number;
      to: number;
    };
  }[];
  buyFeatureSetting: {
    name: string;
    output: string;
    percent: number;
    option: {
      from: number;
      to: number;
    };
  }[];
}

const settingPG20:SettingPG  = {
gameCode: "fortune-ox",
username: "testuser",
isPlayerSetting: true,
setting: [
  {
    name: "normal-spin",
    output: "normal-spin",
    percent: 80,
    option: {
      from: 0,
      to: 0,
    },
  },
  {
    name: "less-bet",
    output: "less-bet",
    percent: 15.14,
    option: {
      from: 0,
      to: 1,
    },
  },
  {
    name: "more-bet",
    output: "more-bet",
    percent: 4.61,
    option: {
      from: 0,
      to: 8,
    },
  },
  {
    name: "freespin-less-bet",
    output: "freespin-less-bet",
    percent: 0.21,
    option: {
      from: 0,
      to: 0.5,
    },
  },
  {
    name: "freespin-more-bet",
    output: "freespin-more-bet",
    percent: 0.04,
    option: {
      from: 0,
      to: 8,
    },
  },
],
buyFeatureSetting: [
  {
    name: "buy-feature-less-bet",
    output: "freespin-less-bet",
    percent: 90,
    option: {
      from: 0,
      to: 0.5,
    },
  },
  {
    name: "buy-feature-more-bet",
    output: "freespin-more-bet",
    percent: 10,
    option: {
      from: 0,
      to: 10,
    },
  },
],
};

const settingPG40:SettingPG  = {
gameCode: "fortune-ox",
username: "testuser",
isPlayerSetting: true,
setting: [
  {
    name: "normal-spin",
    output: "normal-spin",
    percent: 60,
    option: {
      from: 0,
      to: 0,
    },
  },
  {
    name: "less-bet",
    output: "less-bet",
    percent: 30,
    option: {
      from: 0,
      to: 1,
    },
  },
  {
    name: "more-bet",
    output: "more-bet",
    percent: 9.5,
    option: {
      from: 0,
      to: 8,
    },
  },
  {
    name: "freespin-less-bet",
    output: "freespin-less-bet",
    percent: 0.4,
    option: {
      from: 0,
      to: 0.5,
    },
  },
  {
    name: "freespin-more-bet",
    output: "freespin-more-bet",
    percent: 0.1,
    option: {
      from: 0,
      to: 8,
    },
  },
],
buyFeatureSetting: [
  {
    name: "buy-feature-less-bet",
    output: "freespin-less-bet",
    percent: 80,
    option: {
      from: 0,
      to: 0.5,
    },
  },
  {
    name: "buy-feature-more-bet",
    output: "freespin-more-bet",
    percent: 20,
    option: {
      from: 0,
      to: 10,
    },
  },
],
};

const settingPG50:SettingPG  = {
  gameCode: "fortune-ox",
  username: "testuser",
  isPlayerSetting: true,
  setting: [
    {
      name: "normal-spin",
      output: "normal-spin",
      percent: 50,
      option: {
        from: 0,
        to: 0,
      },
    },
    {
      name: "less-bet",
      output: "less-bet",
      percent: 37.15,
      option: {
        from: 0,
        to: 1,
      },
    },
    {
      name: "more-bet",
      output: "more-bet",
      percent: 12.19,
      option: {
        from: 0,
        to: 8,
      },
    },
    {
      name: "freespin-less-bet",
      output: "freespin-less-bet",
      percent: 0.53,
      option: {
        from: 0,
        to: 0.5,
      },
    },
    {
      name: "freespin-more-bet",
      output: "freespin-more-bet",
      percent: 0.13,
      option: {
        from: 0,
        to: 8,
      },
    },
  ],
  buyFeatureSetting: [
    {
      name: "buy-feature-less-bet",
      output: "freespin-less-bet",
      percent: 75,
      option: {
        from: 0,
        to: 0.8,
      },
    },
    {
      name: "buy-feature-more-bet",
      output: "freespin-more-bet",
      percent: 25,
      option: {
        from: 0,
        to: 10,
      },
    },
  ],
};

const settingPG60:SettingPG  = {
  gameCode: "fortune-ox",
  username: "testuser",
  isPlayerSetting: true,
  setting: [
    {
      name: "normal-spin",
      output: "normal-spin",
      percent: 40,
      option: {
        from: 0,
        to: 0,
      },
    },
    {
      name: "less-bet",
      output: "less-bet",
      percent: 45.17,
      option: {
        from: 0,
        to: 1,
      },
    },
    {
      name: "more-bet",
      output: "more-bet",
      percent: 14.08,
      option: {
        from: 0,
        to: 8,
      },
    },
    {
      name: "freespin-less-bet",
      output: "freespin-less-bet",
      percent: 0.60,
      option: {
        from: 0,
        to: 0.5,
      },
    },
    {
      name: "freespin-more-bet",
      output: "freespin-more-bet",
      percent: 0.15,
      option: {
        from: 0,
        to: 8,
      },
    },
  ],
  buyFeatureSetting: [
    {
      name: "buy-feature-less-bet",
      output: "freespin-less-bet",
      percent: 70,
      option: {
        from: 0,
        to: 0.8,
      },
    },
    {
      name: "buy-feature-more-bet",
      output: "freespin-more-bet",
      percent: 30,
      option: {
        from: 0,
        to: 10,
      },
    },
  ],
};

const settingPG80:SettingPG  = {
  gameCode: "fortune-ox",
  username: "testuser",
  isPlayerSetting: true,
  setting: [
    {
      name: "normal-spin",
      output: "normal-spin",
      percent: 20,
      option: {
        from: 0,
        to: 0,
      },
    },
    {
      name: "less-bet",
      output: "less-bet",
      percent: 60,
      option: {
        from: 0,
        to: 1,
      },
    },
    {
      name: "more-bet",
      output: "more-bet",
      percent: 19.00,
      option: {
        from: 0,
        to: 8,
      },
    },
    {
      name: "freespin-less-bet",
      output: "freespin-less-bet",
      percent: 0.78,
      option: {
        from: 0,
        to: 0.5,
      },
    },
    {
      name: "freespin-more-bet",
      output: "freespin-more-bet",
      percent: 0.22,
      option: {
        from: 0,
        to: 8,
      },
    },
  ],
  buyFeatureSetting: [
    {
      name: "buy-feature-less-bet",
      output: "freespin-less-bet",
      percent: 60,
      option: {
        from: 0,
        to: 0.8,
      },
    },
    {
      name: "buy-feature-more-bet",
      output: "freespin-more-bet",
      percent: 40,
      option: {
        from: 0,
        to: 10,
      },
    },
  ],
};

let formData = reactive({
casinoStatus: true,
game: [] as any,
page: ref<number>(1),
pageSize: ref<number>(10),
settingPGSet: ref<number>(2),
settingPG: {
  gameCode: "fortune-ox",
  username: "testuser",
  isPlayerSetting: true,
  setting: [
    {
      name: "normal-spin",
      output: "normal-spin",
      percent: 60,
      option: {
        from: 0,
        to: 0,
      },
    },
    {
      name: "less-bet",
      output: "less-bet",
      percent: 30,
      option: {
        from: 0,
        to: 1,
      },
    },
    {
      name: "more-bet",
      output: "more-bet",
      percent: 9.5,
      option: {
        from: 0,
        to: 8,
      },
    },
    {
      name: "freespin-less-bet",
      output: "freespin-less-bet",
      percent: 0.4,
      option: {
        from: 0,
        to: 0.5,
      },
    },
    {
      name: "freespin-more-bet",
      output: "freespin-more-bet",
      percent: 0.1,
      option: {
        from: 0,
        to: 8,
      },
    },
  ],
  buyFeatureSetting: [
    {
      name: "buy-feature-less-bet",
      output: "freespin-less-bet",
      percent: 80,
      option: {
        from: 0,
        to: 0.8,
      },
    },
    {
      name: "buy-feature-more-bet",
      output: "freespin-more-bet",
      percent: 20,
      option: {
        from: 0,
        to: 10,
      },
    },
  ],
},
settingPGdefault: {
  gameCode: "fortune-ox",
  username: "testuser",
  isPlayerSetting: true,
  setting: [
    {
      name: "normal-spin",
      output: "normal-spin",
      percent: 60,
      option: {
        from: 0,
        to: 0,
      },
    },
    {
      name: "less-bet",
      output: "less-bet",
      percent: 30,
      option: {
        from: 0,
        to: 1,
      },
    },
    {
      name: "more-bet",
      output: "more-bet",
      percent: 9.5,
      option: {
        from: 0,
        to: 8,
      },
    },
    {
      name: "freespin-less-bet",
      output: "freespin-less-bet",
      percent: 0.4,
      option: {
        from: 0,
        to: 0.5,
      },
    },
    {
      name: "freespin-more-bet",
      output: "freespin-more-bet",
      percent: 0.1,
      option: {
        from: 0,
        to: 8,
      },
    },
  ],
  buyFeatureSetting: [
    {
      name: "buy-feature-less-bet",
      output: "freespin-less-bet",
      percent: 80,
      option: {
        from: 0,
        to: 0.8,
      },
    },
    {
      name: "buy-feature-more-bet",
      output: "freespin-more-bet",
      percent: 20,
      option: {
        from: 0,
        to: 10,
      },
    },
  ],
},
});

const props = defineProps<{
    id: number,
}>();

const getGamePGSetting = async () =>{
  if(props.id == 0){
    Alert('error',"ไม่พบข้อมูลลูกค้า กรุณากรอกข้อมูลให้ถูกต้อง");
  }else{
    const data = await getGamePGSettingByUserServices(props.id);
    if (data.status === "success") {
      formData.settingPG = data.data.detail
      formData.settingPGdefault = data.data.detail
      formData.settingPGSet = data.data.set
      show_data.value = data.data.set
      console.log(data.data.set);
    }
  }
}

const editSettingPG100ByUser = async() => {
      const data = await editSettingPG100ServicesByUser(formData.settingPG,formData.settingPGSet,props.id);
      if(data.status == "success"){
          Alert('success','เเก้ไขการตั้งค่า เรียบร้อย.')
          getGamePGSetting();
      }else{
          Alert('error',data.message);
      }
  }

onMounted(() => {
  getGamePGSetting();
});

const chang_show_data = (value :number) => {
show_data.value = value
switch (value) {
  case 1:
    formData.settingPG = settingPG20;
    formData.settingPGSet = 1;
    break;
  case 2:
    formData.settingPG = settingPG40;
    formData.settingPGSet = 2;
    break;
  case 3:
    formData.settingPG = settingPG50;
    formData.settingPGSet = 3;
    break;
  case 4:
    formData.settingPG = settingPG60;
    formData.settingPGSet = 4;
    break;
  case 5:
    formData.settingPG = settingPG80;
    formData.settingPGSet = 5;
    break;
  case 6:
    formData.settingPGSet = 6;
    formData.settingPG = formData.settingPGdefault;
    break;
};
}

</script>
<style>
.select-member-detail{
  margin: 0.20rem;
}
</style>