<template>
    <a-row class="p-2" >
      <a-col :span="11">
        <a-row >
            <a-col class="p-1" :span="15">
            <label>เริ่มต้นวันที่</label>
            <a-date-picker v-model:value="dateStart" />
            </a-col>
        </a-row>
      </a-col>
    </a-row>
    <!-- row 1 -->
    <a-flex class="report" wrap="wrap">
        <a-flex class="report-row" >
            <a-card  class="box-shadow card bg-green">
                <template #title>
                    <span class="white-text">ฝากเงิน</span>
                </template>
                <a-flex>
                    <div style="width: 70%;">
                        <p class="fs-5 bold white-text">100.00</p>
                    </div>
                    <div style="width: 30%;">
                        <DollarOutlined  class="white-text-logo"/>
                    </div>
                </a-flex>
                <div class="card-footer center">
                    <p class="white-text">16 รายการ</p>
                </div>
            </a-card>
            <a-card  class="box-shadow card bg-red">
                <template #title>
                    <span class="white-text">ยอดถอน</span>
                </template>
                <a-flex>
                    <div style="width: 70%;">
                        <p class="fs-5 bold white-text">100.00</p>
                    </div>
                    <div style="width: 30%;">
                        <AuditOutlined class="white-text-logo"/>
                    </div>
                </a-flex>
                <div class="card-footer center">
                    <p class="white-text">16 รายการ</p>
                </div>
            </a-card>
        </a-flex>
        <a-flex class="report-row" >
            <a-card  class="box-shadow card bg-blue" >
                <template #title>
                    <span class="white-text">โบนัส</span>
                </template>
                <a-flex>
                    <div style="width: 70%;">
                        <p class="fs-5 bold white-text">100.00</p>
                    </div>
                    <div style="width: 30%;">
                        <CrownOutlined class="white-text-logo"/>
                    </div>
                </a-flex>
                <div class="card-footer center">
                    <p class="white-text">16 รายการ</p>
                </div>
            </a-card>
            <a-card  class="box-shadow card bg-yellow">
                <template #title>
                    <span class="white-text">ลูกค้าใหม่</span>
                </template>
                <a-flex>
                    <div style="width: 70%;">
                        <p class="fs-5 bold white-text">100.00</p>
                    </div>
                    <div style="width: 30%;">
                        <UserAddOutlined class="white-text-logo"/>
                    </div>
                </a-flex>
                <div class="card-footer center">
                    <p class="white-text">16 รายการ</p>
                </div>
            </a-card>
        </a-flex>
    </a-flex>

    <!-- row 2  -->
    <a-flex class="report wap">
        <div class="repory-row-2">
            <a-card  class="box-shadow bg-green-oly-head" >
                <template #title>
                    <span class="white-text">ยอดเงินในธนาคาร</span>
                </template>
                <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :scroll="{ x: 250 }"/>
            </a-card>
            <a-card  class="box-shadow bg-green-oly-head"  >
                <template #title>
                    <span class="white-text">ยอดเงินในธนาคารบัญชีฝาก</span>
                </template>
                <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :scroll="{ x: 250 }"/>
            </a-card>
            <a-card  class="box-shadow bg-red-oly-head">
                <template #title>
                    <span class="white-text">ยอดเงินในธนาคารบัญชีถอน</span>
                </template>
                <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :scroll="{ x: 250 }"/>
            </a-card>
        </div>
        <div class="repory-row-2">
            <a-card  class="box-shadow bg-red-oly-head">
                <template #title>
                    <span class="white-text">รายการถอน</span>
                </template>
                <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :scroll="{ x: 250 }"/>
            </a-card>
        </div>
        <div class="repory-row-2">
            <a-card  class="box-shadow bg-blue-oly-head" >
                <template #title>
                    <span class="white-text">รายการโบนัส</span>
                </template>
                <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :scroll="{ x: 250 }"/>
            </a-card>
        </div>
        <div class="repory-row-2">
            <a-card  class="box-shadow bg-yellow-oly-head" >
                <template #title>
                    <span class="white-text">รายการยูสเซอร์</span>
                </template>
                <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :scroll="{ x: 250 }"/>
            </a-card>
        </div>
    </a-flex>
</template>
<script>
import { ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs'; // Import Dayjs and its type

export default {
  setup() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const dateStart = ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD'));

    return {
      dataSource: [
        {
          key: '1',
          name: 'TW_0641625823',
          age: '45',
        },
        {
          key: '2',
          name: 'SCB_8422536083',
          age: '3,663',
        },
      ],

      columns: [
        {
          title: 'ธนาคาร',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'คงเหลือ',
          dataIndex: 'age',
          key: 'age',
        },
      ],
    };
  },
};
</script>
<style>
.report{
    width: 100%;
}
.report .ant-card{
    margin: 0.5rem;
}
.card{
    width: 100%;
}
.report-row{
    width: 50%;
}
.report .anticon{
    font-size: 4rem;
    color: rgba(127, 127, 127, 0.467);
}
.report .ant-card-body{
    padding:24px 24px 0px 24px
}

.repory-row-2{
    width: 100%;
}
.bg-green,.bg-green-oly-head .ant-card-head{
    background: #00c292;
}
.bg-red,.bg-red-oly-head .ant-card-head{
    background: #fb9678;
}
.bg-blue,.bg-blue-oly-head .ant-card-head{
    background: #03a9f3;
}
.bg-yellow,.bg-yellow-oly-head .ant-card-head{
    background: #ffb463;
}


@media screen and (max-width: 1170px) {
    .report-row{
        width: 100%;
    }
    .ant-layout-content{
        padding: 0 !important;
        margin: 0 !important;
    }
    .wap{
        flex-wrap: wrap;
    }
    .report .ant-card{
    margin: 0;
}
}
</style>