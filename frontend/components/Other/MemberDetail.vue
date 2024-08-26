<template>
    <a-col :span="24" class="my-4">
        <h3 class="my-3">รหัสลูกค้า {{data.username_agent}}</h3>
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
    <a-row class="my-2">
        <a-col :span="24">
            <a-row justify="start">
                <span v-if="show_data == 1"><a-button type="primary" class="select-member-detail" @click="show_data = 1">ข้อมูลลูกค้า</a-button></span>
                <span v-else><a-button type="primary" class="select-member-detail" @click="show_data = 1" ghost>ข้อมูลลูกค้า</a-button></span>

                <span v-if="show_data == 2"><a-button type="primary" class="select-member-detail" @click="show_data = 2">เทิร์นการเล่น</a-button></span>
                <span v-else><a-button type="primary" class="select-member-detail" @click="show_data = 2" ghost>เทิร์นการเล่น</a-button></span>

                <span v-if="show_data == 3"><a-button type="primary" class="select-member-detail" @click="show_data = 3">รายการเครดิต</a-button></span>
                <span v-else><a-button type="primary" class="select-member-detail" @click="show_data = 3" ghost>รายการเครดิต</a-button></span>

                <span v-if="show_data == 4"><a-button type="primary" class="select-member-detail" @click="show_data = 4">ประวัติการทำรายการลูกค้า</a-button></span>
                <span v-else><a-button type="primary" class="select-member-detail" @click="show_data = 4" ghost>ประวัติการทำรายการลูกค้า</a-button></span>
            </a-row>
        </a-col>
    </a-row>
    <a-row v-if="show_data == 1">
        <a-col :span="24" :md="{span:24}">
            <h3>ข้อมูลลูกค้า</h3>
            <a-flex wrap="wrap">
                <a-col span="6">
                    <div class="p-1"><b>ชื่อ - สกุล :</b> {{data.firstname}} {{data.lastname}}</div>
                </a-col>
                <a-col span="6">
                    <div class="p-1"><b>รหัสลูกค้า :</b> {{data.username_agent}}</div>
                </a-col>
                <a-col span="6">
                    <div class="p-1"><b>ยูสเซอร์ :</b> {{data.username}}</div>
                </a-col>
                <a-col span="6">
                    <div class="p-1"><b>มือถือ :</b> {{data.username}}</div>
                </a-col>
                <a-col span="6">
                    <div class="p-1"><b>ไลน์ :</b> {{data.line_id}}</div>
                </a-col>
                <a-col span="6">
                    <div class="p-1"><b>จากช่องทาง :</b> {{data.marketing}}</div>
                </a-col>
            </a-flex>
        </a-col>
        <a-col :span="24" :md="{span:24}">
            <h3>สถานะลูกค้า</h3>
            <a-flex wrap="wrap">
                <a-col span="6">
                    <div class="p-1"><b>สถานะลูกค้า :</b>  
                        <span class="p-1" v-if="data.is_active"><a-tag color="green">เปิดใช้งาน</a-tag></span>
                        <span class="p-1" v-else><a-tag color="red">ปิดใช้งาน</a-tag></span>
                    </div>
                </a-col>
                <a-col span="6">
                    <div class="p-1"><b>เเนะนำเพื่อน :</b>  
                        <span class="p-1" v-if="!data.is_agent"><a-tag color="green">เปิดใช้งาน</a-tag></span>
                        <span class="p-1" v-else><a-tag color="red">ปิดใช้งาน</a-tag></span>
                    </div>
                </a-col>
                <a-col span="6">
                    <div class="p-1"><b>พันธมิตร :</b>  
                        <span class="p-1" v-if="data.is_agent"><a-tag color="green">เปิดใช้งาน</a-tag></span>
                        <span class="p-1" v-else><a-tag color="red">ปิดใช้งาน</a-tag></span>
                    </div>
                </a-col>
                <a-col span="6">
                    <div class="p-1"><b>มิจฉาชีพ :</b>  
                        <span class="p-1" v-if="data.is_block"><a-tag color="green">เปิดใช้งาน</a-tag></span>
                        <span class="p-1" v-else><a-tag color="red">ปิดใช้งาน</a-tag></span>
                    </div>
                </a-col>
                <a-col span="6">
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
            </a-flex>
        </a-col>
        <a-col :span="24" :md="{span:24}">
            <h3>ธนาคาร</h3>
            <a-flex wrap="wrap" :justify="'center'">
                <a-col span="24" :md="11" class="m-1">
                    <div class="bank-detail">
                        <a-flex :align="'center'">
                            <a-col span="8" class="center">
                                <a-image :src="data.bank_image" :alt="data.bank" width="60px" height="60px" :previewMask="false" :preview="false"/>
                            </a-col>
                            <a-col span="16">
                                <div>ธนาคาร : {{ data.bank }}</div>
                                <div class="bank-detail-name">ชื่อบัญชี : {{data.firstname}} {{data.lastname}}</div>
                                <div>เลขบัญชี : {{ data.bankNo }}</div>
                            </a-col>
                        </a-flex>
                    </div>
                </a-col>
                <a-col span="24" :md="11" class="m-1">
                    <div class="bank-detail">
                        <a-flex :align="'center'">
                            <a-col span="8" class="center">
                                <a-image :src="data.bank_true_image" alt="ธนาคารทรูมันนี่" width="60px" height="60px" :previewMask="false" :preview="false"/>
                            </a-col>
                            <a-col span="16">
                                <div>ธนาคาร : ทรูมันนี่วอเล็ต</div>
                                <div class="bank-detail-name">ชื่อบัญชี : {{data.firstname}} {{data.lastname}}</div>
                                <div>เลขบัญชี : {{ data.bank_true_no }}</div>
                            </a-col>
                        </a-flex>
                    </div>
                </a-col>
            </a-flex>
        </a-col>
        <a-col :span="24" :md="{span:24}">
            <h3>การใช้งาน</h3>
            <a-flex wrap="wrap">
                <a-col span="6">
                    <div class="p-1"><b>ที่อยู่ IP ล่าสุด :</b> {{data.last_ip_login}} </div>
                </a-col>
                <a-col span="6">
                    <div class="p-1"><b>สร้างเมื่อ :</b> {{ dayjs(data.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                </a-col>
                <a-col span="6">
                    <div class="p-1"><b>สร้างโดย :</b> {{data.created_by}}</div>
                </a-col>
                <a-col span="6">
                    <div class="p-1"><b>อัปเดตเมื่อ :</b> {{ dayjs(data.updated_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                </a-col>
                <a-col span="6">
                    <div class="p-1"><b>ชื่อผู้อัปเดต :</b> {{data.updated_by}}</div>
                </a-col>
            </a-flex>
        </a-col>
    </a-row>
    <a-row v-if="show_data == 2">
        <TableTablesTurnTable :id="data.id"/>
    </a-row>
    <a-row v-if="show_data == 3">
        <TableTablesMemberCreditTransaction :id="data.id"/>
    </a-row>
    <a-row v-if="show_data == 4">
        <TableTablesMemberPostListCredit :id="data.id"/>
    </a-row>
</template>
<script lang="ts" setup>
    import { defineProps, reactive, watch } from 'vue';
    import { getDetailMemberById } from '~/services/memberServices';
    import dayjs from 'dayjs';

    const show_data = ref(1);
    const props = defineProps<{
        memberDetailId: number
    }>();

    const data = reactive({
        id: 0,
        username_agent: '',
        username: '',
        firstname: '',
        lastname: '',
        marketing: '',
        is_active: true,
        is_agent: false,
        is_block: false,
        balance_event: 0,
        balance: 0,
        bank: '',
        bank_image: '',
        bankNo: '',
        bank_true_no: '',
        bank_true_image: '',
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
        const responseData = await getDetailMemberById(id);
        if (responseData.status === "success") {
            console.log(responseData.data);
            
            data.username_agent = responseData.data.username_agent
            data.username = responseData.data.username
            data.firstname = responseData.data.firstname
            data.lastname = responseData.data.lastname
            data.marketing = responseData.data.marketing.name
            data.balance_event = responseData.data.balance_event
            data.balance = responseData.data.balance
            data.bank_image = responseData.data.bank.image
            data.bank_true_image = responseData.data.bank_true.image
            data.bank = responseData.data.bank.name
            data.bankNo = responseData.data.bank_no
            data.bank_true_no = responseData.data.bank_true_no
            data.line_id = responseData.data.line_id
            data.agent_percent = responseData.data.agent_percent
            data.agent_company_percent = responseData.data.agent_company_percent
            data.refKey = responseData.data.key_ref
            data.is_active = responseData.data.is_active
            data.is_agent = responseData.data.is_agent
            data.is_block = responseData.data.is_block
            data.last_date_login = responseData.data.last_date_login
            data.last_ip_login = responseData.data.last_ip_login
            data.created_at = responseData.data.created_at
            data.created_by = responseData.data.created_by_search.name
            data.updated_at = responseData.data.updated_at
            data.updated_by = responseData.data.updated_by_search.name
        }
    };

    watch(() => props.memberDetailId, (newValue: number) => {
        if (newValue) {
            data.id = newValue;
            getMemberDetail(newValue);
        }
    }, { immediate: true });
    
</script>

<style>
.select-member-detail{
    margin: 0 0.20rem;
}
.bank-detail{
    background: linear-gradient(88deg, rgb(19, 180, 202), rgb(24, 202, 190));
    border-radius: 10px;
    padding: 10px 10px;
    color: whitesmoke;
}
.bank-detail-name{
    /* color: #ff9100; */
    font-size: 17px;
}
</style>