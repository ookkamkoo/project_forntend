<template>
    <a-tabs v-model:activeKey="activeKey" type="card" @change="changeTab">
        <a-tab-pane key="1" tab="กงล้อ">
        </a-tab-pane>
        <a-tab-pane key="2" tab="เปิดไพ่">
        </a-tab-pane>
        <a-tab-pane key="3" tab="ล็อกอินรายวัน">
        </a-tab-pane>
    </a-tabs>
    <div v-if="activeKey=='1'">
        <div>
            <h4>เปิด-ปิด การใช้งานกงล้อ</h4>
        </div>
        <a-switch v-model:checked="formData.spinStatus" />
        <div>
            <h4>จำนวนเหรียญที่ใช้งาน</h4>
            <a-col :span="5" :md="5" class="m-1">
                <a-input v-model:value="formData.coin" placeholder="ผลรางวัล" />
            </a-col>
        </div>
        <br>
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

        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(1)">บันทึก</a-button>
        </a-row>
    </div>
    <div v-if="activeKey=='2'">
        <div>
            <h4>เปิด-ปิด การใช้งานเปิดไพ่</h4>
        </div>
        <a-switch v-model:checked="formData.cardStatus" />
        <div>
            <h4>จำนวนเหรียญที่ใช้งาน</h4>
            <a-col :span="5" :md="5" class="m-1">
                <a-input v-model:value="formData.coinOpenCard" placeholder="ผลรางวัล" />
            </a-col>
        </div>
        <br>
        <h4>รายละเอียดเปิดไพ่</h4>
        <a-row :justify="'center'">
            <a-col :span="3" :md="1" class="m-1 center">
                <b>ลำดับที่</b>
            </a-col>
            <a-col :span="6" :md="4" class="m-1 center">
                <b>ชื่อผลรางวัล</b>
            </a-col>
            <a-col :span="4" :md="4" class="m-1 center">
                <b>ผลรางวัล</b>
            </a-col>
            <a-col :span="4" :md="4" class="m-1 center">
                <b>เปอร์เซ็นต์</b>
            </a-col>
        </a-row>
        <a-row :justify="'center'" v-for="(data, index) in formData.cardList" class="m-1">
            <a-col :span="3" :md="1"  class="m-1 center">
                {{index+1}}
            </a-col>
            <a-col :span="4" :md="4" class="m-1 center">
                <a-input v-model:value="data.rewards" placeholder="ผลรางวัล" />
            </a-col>
            <a-col :span="4" :md="4" class="m-1 center">
                <a-input v-model:value="data.amount" placeholder="ผลรางวัล" />
            </a-col>
            <a-col :span="4" :md="4" class="m-1 center">
                <a-input-number v-model:value="data.percent" placeholder="เปอร์เซ็นต์" />
            </a-col>
        </a-row>
        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(2)">บันทึก</a-button>
        </a-row>
    </div>
    <div v-if="activeKey=='3'">
        <div>
            <h4>เปิด-ปิด การใช้งานล็อกอินรายวัน</h4>
        </div>
        <a-switch v-model:checked="formData.dailyLoginStatus" />
        <br>
        <h4>รายละเอียดล็อกอินรายวัน</h4>
        <a-row :justify="'center'">
            <a-col :span="6">
                <div class="m-1">
                    <label for="ประเภทการล็อกอิน">ประเภทการล็อกอิน</label>
                    <a-select
                        ref="select"
                        v-model:value="formData.dailyList.dailyLogin"
                        style="width: 100%"
                        >
                        <a-select-option value="login">ล็อกอิน</a-select-option>
                        <a-select-option value="loginContinua">ล็อกอินติดต่อกัน</a-select-option>
                    </a-select>
                </div>
            </a-col>
        </a-row>
        <a-row :justify="'center'">
            <a-col :span="6">
                <div class="m-1">
                    <label for="ประเภทการล็อกอิน">วิธีการล็อกอิน</label>
                    <a-select
                        ref="select"
                        v-model:value="formData.dailyList.loginMethod"
                        style="width: 100%"
                        >
                        <a-select-option value="login">ล็อกอินปกติ</a-select-option>
                        <a-select-option value="deposit">เติมเงิน</a-select-option>
                    </a-select>
                </div>
            </a-col>
            <a-col :span="6" v-if="formData.dailyList.loginMethod =='deposit'">
                <div class="m-1">
                    <label for="จำนวนเงิน">จำนวนเงิน</label>
                    <a-input-number id="inputNumber" v-model:value="formData.dailyList.loginAmount" :min="1"/>
                </div>
            </a-col>
        </a-row>
        
        <a-row :justify="'center'">
            <a-col :span="6">
                <div class="m-1">
                    <label for="จำนวนวันที่ต้องล็อกอิน">จำนวนวันที่ต้องล็อกอิน</label>
                    <a-input-number id="inputNumber" v-model:value="formData.dailyList.dayLogin" :min="1"/>
                </div>
            </a-col>
            <a-col :span="6">
                <div class="m-1">
                    <label for="ล็อกอินภายในกี่วัน">ล็อกอินภายในกี่วัน</label>
                    <a-input-number id="inputNumber" v-model:value="formData.dailyList.dayExpires" :min="1"/>
                </div>
            </a-col>
        </a-row>
        <a-row :justify="'center'">
            <a-col :span="6">
                <div class="m-1">
                    <label for="เลือกรางวัล">เลือกรางวัล</label>
                    <a-select
                        ref="select"
                        v-model:value="formData.dailyList.prizeType"
                        style="width: 100%"
                        >
                        <a-select-option value="coin">เหรียญ</a-select-option>
                        <a-select-option value="credit">เครดิต</a-select-option>
                    </a-select>
                </div>
            </a-col>
            <a-col :span="6">
                <div class="m-1">
                    <label for="ผลรางวัล">ผลรางวัล</label>
                    <a-input-number id="inputNumber" v-model:value="formData.dailyList.prizeResult " :min="1"/>
                </div>
            </a-col>
        </a-row>

        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(3)">บันทึก</a-button>
        </a-row>
    </div>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { getSettingSpinWheelServices,saveSettingSpinWheelServices,saveSettingCardServices,getSettingCardServices,getSettingDailyDayServices,saveSettingDailyLoginServices } from '~/services/miniGameService';
  import { Alert } from '../../Alert/alertComponent';
  const activeKey = ref('1');
  let formData = reactive({
        spinStatus:true,
        coin:0,
        spinWheel:[{ rewards: "รางวัลที่ 1",bgColor:"#F7F7F7",amount:10,percent:1 }],
        cardStatus:true,
        coinOpenCard:0,
        cardList:[{ rewards: "รางวัลที่ 1",amount:10,percent:90 },],
        dailyLoginStatus:true,
        dailyList:{dailyLogin:"login",loginMethod:"login",loginAmount:100,dayLogin:3,dayExpires:7,prizeType:"coin",prizeResult:50,}
    });

    const getSettingGame = async () =>{
        const data = await getSettingSpinWheelServices();
        if (data.status === "success") {
            formData.coin = data.data.game_coin
            formData.spinStatus = data.data.status
            formData.spinWheel = data.data.config_value
        }
    }
    const getSettingCardGame = async () =>{
        const data = await getSettingCardServices();
        if (data.status === "success") {
            formData.coinOpenCard = data.data.game_coin
            formData.cardStatus = data.data.status
            formData.cardList = data.data.config_value
        }
    }
    const getSettingDailyDayLogin = async () =>{
        const data = await getSettingDailyDayServices();
        if (data.status === "success") {
            formData.dailyLoginStatus = data.data.status
            formData.dailyList = data.data.config_value
        }
    }

    const saveSettingGame = async (id:number) =>{
        if(id == 1){
            const data = await saveSettingSpinWheelServices(formData);
            if (data.status === "success") {
                Alert('success','เเก้ไขกงล้อเรียบร้อย.')
            }
        }else if(id == 2){
            const data = await saveSettingCardServices(formData);
            if (data.status === "success") {
                Alert('success','เเก้ไขกงล้อเรียบร้อย.')
            }
        }else if(id == 3){
            const data = await saveSettingDailyLoginServices(formData);
            if (data.status === "success") {
                Alert('success','เเก้ไขกงล้อเรียบร้อย.')
            }
        }
    }

    const changeTab = () =>{
        if(activeKey.value == '1'){
            getSettingGame();
        }else if(activeKey.value == '2'){
            getSettingCardGame();
        }else if(activeKey.value == '3'){
            getSettingDailyDayLogin();
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
        // getSettingCardGame();
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