<template>
    <div>
        <a-modal v-model:open="open" :title="active ? 'สมัครสมาชิก' : 'แก้ไขสมาชิก'" :closable="true">
            <FormMemberForm value="create" :closeModal="closeModal" :getMember="getMember" :memberEdit="formData.memberEdit" />
                <template #footer></template>
        </a-modal>
    </div>
    <div>
        <a-modal v-model:open="memberDetail" width="1200px" title="รายละเอียดลูกค้า">
            <OtherMemberDetail :memberDetailId="memberDetailId"/>
            <template #footer>
                <a-row justify="end">
                    <a-button @click="memberDetail=false" class="m-1">Cancel</a-button>
                </a-row>
            </template>
        </a-modal>
    </div>
    <a-row class="p-2">
        <a-col class="p-rl-1" :span="24" :md="8">
            <label>ประเภท</label>
            <a-select
                ref="select"
                v-model:value="formData.sl_type"
                style="width: 100%"
                >
                <a-select-option value="0">ทั้งหมด</a-select-option>
                <a-select-option value="1">มียอดฝาก</a-select-option>
                <a-select-option value="2">ไม่มียอดฝาก</a-select-option>
                <a-select-option value="3">พันธมิตร</a-select-option>
                <a-select-option value="4">กำลังใช้งาน</a-select-option>
            </a-select>
        </a-col>
        <a-col class="p-rl-1" :span="24" :md="8">
        <label>ค้นหาด้วย</label>
        <a-select
                ref="select"
                v-model:value="formData.sl_search"
                style="width: 100%"
                >
                <a-select-option value="1">ยูสเซอร์เนม</a-select-option>
                <a-select-option value="2">เบอร์มือถือ</a-select-option>
                <a-select-option value="3">เลขบัญชี</a-select-option>
                <a-select-option value="4">เลขบัญชีทรู</a-select-option>
                <a-select-option value="5">ชื่อ</a-select-option>
                <a-select-option value="6">นามสกุล</a-select-option>
            </a-select>
        </a-col>
        <a-col class="p-rl-1" :span="24" :md="8">
        <label>ข้อมูลที่ต้องการค้นหา</label>
        <a-input v-model:value="formData.data_search" />
        </a-col>
    </a-row>
    <a-row class="p-2">
        <a-col class="p-rl-1" :span="24" :md="8">
            <label>เลขบัญชีรายการค้างทำรายการ</label>
            <a-input v-model:value="formData.find_bank_no" />
        </a-col>
        <a-col class="p-rl-1" :span="24" :md="8">
        <label>ธนาคาร</label>
            <a-select ref="select" v-model:value="formData.bank" style="width: 100%">
                <a-select-option :value="0" >เลือกธนาคาร</a-select-option>
                <template v-for="option in formData.bank_list" :key="option.id">
                <a-select-option :value="option.id" v-if="option.id">
                    <template #default>
                        <a-image :src="option.image" :alt="option.name" width="20px" height="20px" :preview="false"/>
                        {{ option.name }}
                    </template>
                </a-select-option>
                </template>
            </a-select>
        </a-col>
        <a-col class="p-rl-1" :span="24" :md="8">
        <label>ช่องทางเข้าการถึง</label>
            <a-select ref="select" v-model:value="formData.market" style="width: 100%">
                <a-select-option :value="0" >เลือกช่องทางเข้าการถึง</a-select-option>
                <template v-for="option in formData.market_list" :key="option.id">
                <a-select-option :value="option.id" v-if="option.id">
                    <template #default>
                        {{ option.name }}
                    </template>
                </a-select-option>
                </template>
            </a-select>
        </a-col>
    </a-row>
    <a-row class="p-2">
        <a-col :span="24" :md="11">
        <a-row >
            <a-col class="p-rl-1" :span="15" >
            <label>เริ่มต้นวันที่</label>
            <a-date-picker v-model:value="formData.dateStart" />
            </a-col>
            <a-col class="p-rl-1" :span="8">
            <label><br></label>
            <a-time-picker v-model:value="formData.timeStart" format="HH:mm" />
            </a-col>
        </a-row>
        </a-col>
        <a-col :span="24" :md="11">
        <a-row>
            <a-col class="p-rl-1" :span="15">
            <label>ถึงวันที่</label>
            <a-date-picker v-model:value="formData.dateEnd" />
            </a-col>
            <a-col class="p-rl-1" :span="8">
            <label><br></label>
            <a-time-picker v-model:value="formData.timeEnd" format="HH:mm" />
            </a-col>
        </a-row>
        </a-col>
        <a-col class="p-rl-1" :span="24" :md="2">
            <label><br></label>
            <a-button class="submit sky" type="primary" @click="search"><SearchOutlined /> ค้นหา</a-button>
        </a-col>
    </a-row>
    <a-row class="p-2">
        <div>
            <a-radio-group v-model:value="formData.dateSelect" @change="handleDateSelectChange">
                <a-radio-button value="Today">วันนี้</a-radio-button>
                <a-radio-button value="Yesterday">เมื่อวาน</a-radio-button>
                <a-radio-button value="ThisMonth">เดือนนี้</a-radio-button>
                <a-radio-button value="all">ทั้งหมด</a-radio-button>
            </a-radio-group>
        </div>
    </a-row>
    <a-row class="p-2" justify="end">
      <a-col class="p-rl-1">
        <label><br></label>
        <a-button class="submit sky" type="primary"  @click="onCreate"><PlusOutlined /> เพิ่ม</a-button>
      </a-col>
    </a-row>
    <a-table 
        :columns="dynamicColumns"
        :data-source="dataShow"
        bordered
        :scroll="{ x: 1500, y: 700 }"
        :pagination="paginationConfig"
        :loading="loading"
        @change="handleTableChange"
    >
        <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'operation'">
                <a-flex gap="small" :justify="'center'" horizontal>
                    <a-button class="sky" type="primary" @click="resetPassword(record.id,record.username)"><LockOutlined /></a-button>
                    <a-button v-if="column.key" class="warning" type="primary" @click="onEdit(record)" ><FormOutlined /></a-button>
                </a-flex>
            </template>
            <template v-else-if="column.key === 'UsernameAgent'">
                <div @click="showMemberDetailModal(record.id)">{{ record.username_agent }}</div>
            </template>
            <template v-else-if="column.key === 'username'">
                <div>{{ record.username }}</div>
            </template>
            <template v-else-if="column.key === 'name'">
                <div>{{ record.firstname+" "+record.lastname }}</div>
            </template>
            <template v-else-if="column.key === 'bank'">
                <div><a-image :src="record.bank.image" :alt="record.bank.name" width="32px" height="32px" :previewMask="false" :preview="false"/></div>
            </template>
            <template v-else-if="column.key === 'bankNo'">
                <div>{{ record.bank_no }}</div>
            </template>
            <template v-else-if="column.key === 'bankTrue'">
                <div><a-image :src="record.bank_true.image" :alt="record.bank_true.name" width="32px" height="32px" :previewMask="false" :preview="false"/></div>
            </template>
            <template v-else-if="column.key === 'bankTrueNo'">
                <div>{{ record.bank_true_no }}</div>
            </template>
            <template v-else-if="column.key === 'marketing'">
                <div>{{ record.marketing.name }}</div>
            </template>
            <template v-else-if="column.key === 'promotion'">
                <div v-if="record.promotion_id == 0"><a-tag color="red">ไม่รับโปร</a-tag></div>
                <div v-else="record.promotion_id"><a-tag color="green">รับโปร</a-tag></div>
            </template>
            <template v-else-if="column.key === 'is_active'">
                <a-switch v-model:checked="record.is_active" @change="update_status(record.id, record.is_active,record.username,index)"/>
            </template>
            <template v-else-if="column.key === 'date'">
                <div>{{ dayjs(record.created_at).format('YYYY-MM-DD') }}</div>
                <div>{{ dayjs(record.created_at).format('HH:mm:ss') }}</div>
            </template>
        </template>
    </a-table>
  </template>
  <script lang="ts" setup>
  import { ref,createVNode } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { getMembers,updateStatus,resetPasswordMemberServices } from '~/services/memberServices';
  import { Alert } from '../Alert/alertComponent';
  import { getDetailconfigMember } from '~/services/memberServices';
  import type { Bank,Market } from '~/services/memberServices';
  
  const open = ref<boolean>(false);
  const memberDetail = ref<boolean>(true);
  const memberDetailId = ref<number>(1);
  const active = ref<boolean>(true);
  const allRecord = ref<number>(0);
  const loading = ref(true);



  const getMember= async() =>{
        loading.value = true;
        const data = await getMembers(formData);
        if (data.status === "success") {
            dataShow.value = data.data.data;
            allRecord.value = data.data.recordsTotal;
        } else {
            console.log("error : "+ data.message);
        }
        loading.value = false;
    }

  const dynamicColumns = computed(() => {
  return [
  { title: `ทั้งหมด ${allRecord.value} รายการ`, children: [
      { title: 'ยูสเซอร์เนม', width: 80, dataIndex: 'UsernameAgent', key: 'UsernameAgent',  },
      { title: 'เบอร์โทร', width: 80, dataIndex: 'username', key: 'username',  },
      { title: 'ชื่อ - สกุล', width: 100, dataIndex: 'name', key: 'name',  },
      { title: 'ธนาคาร', width: 50, dataIndex: 'bank', key: 'bank',  },
      { title: 'เลขบัญชี', width: 80, dataIndex: 'bankNo', key: 'bankNo',  },
      { title: 'ทรูวอเล็ต', width: 50, dataIndex: 'bankTrue', key: 'bankTrue',  },
      { title: 'เลขทรูวอเล็ต', width: 80, dataIndex: 'bankTrueNo', key: 'bankTrueNo',  },
    //   { title: 'ช่องทาง', width: 100, dataIndex: 'marketing', key: 'marketing' },
      { title: 'สถานะโปรโมชั่น', width: 80, dataIndex: 'promotion', key: 'promotion' },
      { title: 'สถานะ', width: 80, dataIndex: 'is_active', key: 'is_active' },
    //   { title: 'รายละเอียด', width: 100, dataIndex: 'detail', key: 'detail' },
      { title: 'วันที่', width: 80, dataIndex: 'date', key: 'date' },
      {
            title: 'รีเซตรหัสผ่าน/แก้ไข',
            key: 'operation',
            width: 100,
        }
    ]},
  ];
});


const dataShow = ref<any[]>([]);

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

let formData = reactive({
    timeStart:ref(dayjs('00:00:00', 'HH:mm:ss')),
    timeEnd:ref(dayjs('23:59:59', 'HH:mm:ss')),
    dateStart:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
    dateEnd:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
    sl_type:ref<string>('0'),
    sl_search:ref<string>('1'),
    find_bank_no:ref<string>(''),
    bank_list:ref<Bank[]>([]),
    bank:ref<number>(0),
    market_list:ref<Market[]>([]),
    market:ref<number>(0),
    data_search:ref<string>(''),
    dateSelect:ref<string>('Today'),
    page:ref<number>(1),
    pageSize:ref<number>(10),
    memberEdit:ref<any>(),
  });



const showModal = () => {
  open.value = true;
};

const showMemberDetailModal = (data: number) => {
    memberDetailId.value=data;
    memberDetail.value = true;
};

const onCreate = () => {
  active.value = true;
  formData.memberEdit = {};
  showModal()
};

const closeModal = () => {
  open.value = false;
};

const onEdit = (data:any) => {
    
    active.value = false;
    formData.memberEdit = data
        
    // // memberEdit.id
    showModal();
}

const resetPassword = (id: number, name: string) => {
    Modal.confirm({
        title: 'คุณต้องรีเซตรหัสผ่านลูกค้า ใช่หรือไหม?',
        icon: createVNode(ExclamationCircleOutlined),
        content: `รีเซตรหัสผ่านลูกค้า ${name} เป็น asdf123456`,
        okText: 'OK',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            loading.value = true;
            const data = await resetPasswordMemberServices(id);
            if (data.status == 'success') {
                Alert("success", `รีเซตรหัสผ่าน ${name} เรียบร้อย.`);
                getMember();
            }
            loading.value = false;
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};

const update_status = async (id: number, status: boolean, name: string,index: number) => {
    let is_active = ''; 
    if (status) {
        is_active = 'ใช้งาน';
    } else {
        is_active = 'บล็อค';
    }
    Modal.confirm({
        title: 'คุณต้องการที่จะเปลี่ยนสถานะใช่ไหม?',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', { key: 'content' }, [`เปลี่ยนสถานะของ ${name} เป็น ${is_active}`]),
        async onOk() {
            loading.value = true;
            const data = await updateStatus(id, status);
            if (data.status == 'success') {
                Alert("success", "เปลี่ยนสถานะเรียบร้อย.");
                getMember();
            } else {
                getMember();
                Alert("error", data.message);
            }
            loading.value = false;
        },
        onCancel() {
            console.log('Cancel');
        },
        class: 'test',
    });
};


const handleDateSelectChange = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    if(formData.dateSelect === "Today"){
      formData.dateStart = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
      formData.dateEnd = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    } else if(formData.dateSelect === "Yesterday"){
      const yesterday = new Date(currentDate);
      yesterday.setDate(currentDate.getDate() - 1);
      const day = String(yesterday.getDate()).padStart(2, '0');
      formData.dateStart = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
      formData.dateEnd = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    } else if(formData.dateSelect === "ThisMonth"){
      const firstDay = dayjs(`${year}-${month}-01`, 'YYYY-MM-DD');
      const lastDay = dayjs(firstDay).endOf('month');
      formData.dateStart = firstDay;
      formData.dateEnd = lastDay;
    }else if(formData.dateSelect === "all"){
      const firstDay = dayjs(`1999-01-01`, 'YYYY-MM-DD');
      const lastDay = dayjs(`9999-12-31`, 'YYYY-MM-DD');
      formData.dateStart = firstDay;
      formData.dateEnd = lastDay;
    }

    formData.timeStart = dayjs('00:00', 'HH:mm');
    formData.timeEnd = dayjs('23:59', 'HH:mm');
    getMember();
};

const paginationConfig = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `ทั้งหมด ${total} รายการ`,
});

const handleTableChange = (pagination: any) => {
  formData.page = pagination.current
  getMember();
  paginationConfig.value.current = pagination.current
  paginationConfig.value.pageSize = pagination.pageSize
};

const getConfigServices = async() => {
    try {
        const data = await getDetailconfigMember();
        if (data.status === "success") {
            formData.bank_list = data.data.Bank as Bank[];
            formData.market_list = data.data.Marketing as Market[];
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
      }
}

onMounted(() => {
    getMember();
    getConfigServices();
});

const search = () =>{
    getMember();
}

</script>