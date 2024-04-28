<template>
    <a-row class="my-4">
        <a-col :span="24">
            <a-row justify="center">
                <span v-if="show_data == 1"><a-button type="primary" class="m-1" @click="show_data = 1">ข้อมูลลูกค้า</a-button></span>
                <span v-else><a-button type="primary" class="m-1" @click="show_data = 1" ghost>ข้อมูลลูกค้า</a-button></span>

                <span v-if="show_data == 2"><a-button type="primary" class="m-1" @click="show_data = 2">เทิร์นการเล่น</a-button></span>
                <span v-else><a-button type="primary" class="m-1" @click="show_data = 2" ghost>เทิร์นการเล่น</a-button></span>

                <span v-if="show_data == 3"><a-button type="primary" class="m-1" @click="show_data = 3">ประวัติการฝาก</a-button></span>
                <span v-else><a-button type="primary" class="m-1" @click="show_data = 3" ghost>ประวัติการฝาก</a-button></span>

                <span v-if="show_data == 4"><a-button type="primary" class="m-1" @click="show_data = 4">ประวัติการถอน</a-button></span>
                <span v-else><a-button type="primary" class="m-1" @click="show_data = 4" ghost>ประวัติการถอน</a-button></span>

                <span v-if="show_data == 5"><a-button type="primary" class="m-1" @click="show_data = 5">ประวัติการทำรายการลูกค้า</a-button></span>
                <span v-else><a-button type="primary" class="m-1" @click="show_data = 5" ghost>ประวัติการทำรายการลูกค้า</a-button></span>
            </a-row>
        </a-col>
    </a-row>
    <a-col :span="24" class="my-5">
        <a-row>
            <a-col :span="4">
                <b>ชื่อ - สกุล</b>
            </a-col>
            <a-col :span="4">
                <b>ยอดคงเหลือ</b>
            </a-col>
            <a-col :span="4">
                <b>เหรียญกิจกรรม</b>
            </a-col>
            <a-col :span="3">
                <b>ยอดฝากรวม</b>
            </a-col>
            <a-col :span="3">
                <b>ยอดถอนรวม</b>
            </a-col>
            <a-col :span="6">
                <b>Ref.</b>
            </a-col>
        </a-row>
        <a-row class="my-2">
            <a-col :span="4">
                {{data.firstname}} {{data.lastname}}
            </a-col>
            <a-col :span="4">
                {{data.balance}}
            </a-col>
            <a-col :span="4">
                {{data.balance_event}}
            </a-col>
            <a-col :span="3">
                {{data.balance_event}}
            </a-col>
            <a-col :span="3">
                {{data.balance_event}}
            </a-col>
            <a-col :span="6">
                {{data.refKey}}
            </a-col>
        </a-row>
    </a-col>

    <a-row v-if="show_data == 1">
        <a-col :span="24" :md="{span:6}">
            <div class="p-1"><b>ชื่อ - สกุล :</b> {{data.firstname}} {{data.lastname}}</div>
            <div class="p-1"><b>ยูสเซอร์ :</b> {{data.username_agent}}</div>
            <div class="p-1"><b>พาสเวิร์ด :</b> ********* </div>
            <div class="p-1"><b>มือถือ :</b> {{data.username}}</div>
            <div class="p-1"><b>ไลน์ :</b> {{data.line_id}}</div>
            <div class="p-1"><b>สถานะลูกค้า :</b>  
                <span class="p-1" v-if="data.is_active"><a-tag color="green">เปิดใช้งาน</a-tag></span>
                <span class="p-1" v-else><a-tag color="red">ปิดใช้งาน</a-tag></span>
            </div>
        </a-col>
        <a-col :span="24" :md="{span:6}">
            <div class="p-1"><b>เเนะนำเพื่อน :</b>  
                <span class="p-1" v-if="!data.is_agent"><a-tag color="green">เปิดใช้งาน</a-tag></span>
                <span class="p-1" v-else><a-tag color="red">ปิดใช้งาน</a-tag></span>
            </div>
            <div class="p-1"><b>พันธมิตร :</b>  
                <span class="p-1" v-if="data.is_agent"><a-tag color="green">เปิดใช้งาน</a-tag></span>
                <span class="p-1" v-else><a-tag color="red">ปิดใช้งาน</a-tag></span>
            </div>
            <div class="p-1" v-if="data.is_agent"><b>รายละเอียด :</b>  
                <a-row>
                    <a-col :span="24" :md="{span:12}">
                        <span class="p-1">ค่าคอมมิชชั่น ( % ) : {{data.agent_percent}}</span>
                    </a-col>
                    <a-col :span="24" :md="{span:12}">
                        <span class="p-1">ค่าส่งบริษัท ( % ) : {{data.agent_company_percent}}</span>
                    </a-col>
                </a-row>
            </div>
        </a-col>
        <a-col :span="24" :md="{span:6}">
            <div class="p-1"><b>ธนาคาร :</b> {{data.bank}}</div>
            <div class="p-1"><b>เลขบัญชี :</b> {{data.bankNo}}</div>
            <div class="p-1"><b>ธนาคารทรูมันนี่ :</b>  {{data.bank}}</div>
            <div class="p-1"><b>เลขบัญชีทรูมันนี่ :</b> {{data.bankNo}}</div>
        </a-col>
        <a-col :span="24" :md="{span:6}">
            <div class="p-1"><b>เข้าสู่ระบบครั้งสุดท้าย :</b> 
                <span v-if="data.last_date_login == '0001-01-01T07:00:00+07:00'">  </span> 
                <span v-else> {{ dayjs(data.last_date_login).format('YYYY-MM-DD HH:mm:ss')}} </span>
            </div>
            <div class="p-1"><b>ที่อยู่ IP ล่าสุด :</b> {{data.last_ip_login}} </div>
            <div class="p-1"><b>สร้างเมื่อ :</b> {{ dayjs(data.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
            <div class="p-1"><b>สร้างโดย :</b> {{data.created_by}}</div>
            <div class="p-1"><b>อัปเดตเมื่อ :</b> {{ dayjs(data.updated_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
            <div class="p-1"><b>ชื่อผู้อัปเดต :</b> {{data.updated_by}}</div>
        </a-col>
    </a-row>
    <a-row v-if="show_data == 2">
        <TableTablesTurnTable/>
    </a-row>
    <a-row v-if="show_data == 3">
        <TableTablesDepositTable/>
    </a-row>
</template>
<script lang="ts" setup>
    import { defineProps, reactive, watch } from 'vue';
    import { getDetailMember } from '~/services/memberServices';
    import dayjs, { Dayjs } from 'dayjs';

    const show_data = ref(2);
    const props = defineProps<{
        memberDetailId: number
    }>();

    const data = reactive({
        id: 0,
        username_agent: '',
        username: '',
        firstname: '',
        lastname: '',
        is_active: true,
        is_agent: false,
        balance_event: 0,
        balance: 0,
        bank: '',
        bankImage: '',
        bankNo: '',
        agent_percent: 0,
        agent_company_percent: 0,
        refKey: '',
        line_id: '',
        last_date_login: '',
        last_ip_login: '',
        created_at: '',
        created_by: '',
        updated_at: '',
        updated_by: '',
    });

    const getMemberDetail = async (id: number) => {
        const responseData = await getDetailMember(id);
        if (responseData.status === "success") {
            console.log(responseData.data);
            
            data.username_agent = responseData.data.username_agent
            data.username = responseData.data.username
            data.firstname = responseData.data.firstname
            data.lastname = responseData.data.lastname
            data.balance_event = responseData.data.balance_event
            data.balance = responseData.data.balance
            data.bankImage = responseData.data.bank.image
            data.bank = responseData.data.bank.name
            data.bankNo = responseData.data.bank_no
            data.line_id = responseData.data.line_id
            data.agent_percent = responseData.data.agent_percent
            data.agent_company_percent = responseData.data.agent_company_percent
            data.refKey = responseData.data.key_ref
            data.is_active = responseData.data.is_active
            data.is_agent = responseData.data.is_agent
            data.last_date_login = responseData.data.last_date_login
            data.last_ip_login = responseData.data.last_ip_login
            data.created_at = responseData.data.created_at
            data.created_by = responseData.data.created_by_search.username
            data.updated_at = responseData.data.updated_at
            data.updated_by = responseData.data.updated_by_search.username
        }
    };

    watch(() => props.memberDetailId, (newValue: number) => {
        if (newValue) {
            data.id = newValue;
            getMemberDetail(newValue);
        }
    }, { immediate: true });
    
</script>