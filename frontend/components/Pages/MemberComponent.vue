<template>
    <div>
        <a-modal v-model:open="open" :title="active ? 'สมัครสมาชิก' : 'แก้ไขสมาชิก'" :closable="true">
            <FormMemberForm value="create" :closeModal="closeModal" :getMember="getMember" :memberEdit="memberEdit" />
                <template #footer></template>
        </a-modal>
    </div>
    <div>
        <a-modal v-model:open="memberDetail" width="1200px" title="รายละเอียดลูกค้า">
            <OtherMemberDetail :memberDetailId="memberDetailId"/>
        </a-modal>
    </div>
    <a-row class="p-2">
        <a-col class="p-rl-1" :span="24" :md="8">
            <label>ประเภท</label>
            <a-select
                ref="select"
                v-model:value="sl_type"
                style="width: 100%"
                >
                <a-select-option value="all">ทั้งหมด</a-select-option>
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
                v-model:value="sl_search"
                style="width: 100%"
                >
                <a-select-option value="0">ยูสเซอร์เนม</a-select-option>
                <a-select-option value="1">เบอร์มือถือ</a-select-option>
                <a-select-option value="2">หมายเลขบัญชี</a-select-option>
                <a-select-option value="3">ชื่อ</a-select-option>
                <a-select-option value="4">นามสกุล</a-select-option>
            </a-select>
        </a-col>
        <a-col class="p-rl-1" :span="24" :md="8">
        <label>ข้อมูลที่ต้องการค้นหา</label>
        <a-input v-model:value="amount" />
        </a-col>
    </a-row>
    <a-row class="p-2">
        <a-col class="p-rl-1" :span="24" :md="8">
            <label>เลขบัญชีตามรายการที่ค้างหน้าหลัก</label>
            <a-input v-model:value="find_bank_no" />
        </a-col>
        <a-col class="p-rl-1" :span="24" :md="8">
        <label>ธนาคาร</label>
            <a-select
                ref="select"
                v-model:value="bank"
                style="width: 100%"
                placeholder="กรุณาเลือก"
                >
                <a-select-option value="0">ยูสเซอร์เนม</a-select-option>
                <a-select-option value="1">เบอร์มือถือ</a-select-option>
                <a-select-option value="2">หมายเลขบัญชี</a-select-option>
                <a-select-option value="3">ชื่อ</a-select-option>
                <a-select-option value="4">นามสกุล</a-select-option>
            </a-select>
        </a-col>
        <a-col class="p-rl-1" :span="24" :md="8">
        <label>ช่องทางเข้าการถึง</label>
            <a-select
                ref="select"
                v-model:value="bank"
                style="width: 100%"
                placeholder="กรุณาเลือก"
                >
                <a-select-option value="0">ยูสเซอร์เนม</a-select-option>
                <a-select-option value="1">เบอร์มือถือ</a-select-option>
                <a-select-option value="2">หมายเลขบัญชี</a-select-option>
                <a-select-option value="3">ชื่อ</a-select-option>
                <a-select-option value="4">นามสกุล</a-select-option>
            </a-select>
        </a-col>
    </a-row>
    <a-row class="p-2">
        <a-col :span="24" :md="11">
        <a-row >
            <a-col class="p-rl-1" :span="15" >
            <label>เริ่มต้นวันที่</label>
            <a-date-picker v-model:value="dateStart" />
            </a-col>
            <a-col class="p-rl-1" :span="8">
            <label><br></label>
            <a-time-picker v-model:value="timeStart" format="HH:mm" />
            </a-col>
        </a-row>
        </a-col>
        <a-col :span="24" :md="11">
        <a-row>
            <a-col class="p-rl-1" :span="15">
            <label>ถึงวันที่</label>
            <a-date-picker v-model:value="dateEnd" />
            </a-col>
            <a-col class="p-rl-1" :span="8">
            <label><br></label>
            <a-time-picker v-model:value="timeEnd" format="HH:mm" />
            </a-col>
        </a-row>
        </a-col>
        <a-col class="p-rl-1" :span="24" :md="2">
            <label><br></label>
            <a-button class="submit sky" type="primary"><SearchOutlined /> ค้นหา</a-button>
        </a-col>
    </a-row>
    <a-row class="p-2">
        <div>
        <a-radio-group v-model:value="dateSelect">
            <a-radio-button value="Today">วันนี้</a-radio-button>
            <a-radio-button value="Yesterday">เมื่อวาน</a-radio-button>
            <a-radio-button value="ThisMonth">เดือนนี้</a-radio-button>
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
        :columns="columns"
        :data-source="dataShow"
        bordered
        :scroll="{ x: 1500, y: 700 }"
        :pagination="{ pageSize: 10 }"
    >
        <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'operation'">
                <a-flex gap="small" :justify="'center'" horizontal>
                    <a-button v-if="column.key" class="warning" type="primary" @click="onEdit(record)" ><FormOutlined /></a-button>
                    <a-button class="danger" type="primary" @click="onDelete(record.id,record.username)"><LockOutlined /></a-button>
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
            <template v-else-if="column.key === 'marketing'">
                <div>{{ record.marketing.name }}</div>
            </template>
            <template v-else-if="column.key === 'promotion'">
                <div v-if="record.promotion_id"><a-tag color="red">ไม่รับโปร</a-tag></div>
                <div v-else="record.promotion_id"><a-tag color="green">รับโปร</a-tag></div>
            </template>
            <template v-else-if="column.key === 'is_active'">
                <a-switch v-model:checked="record.is_active" @change="update_status(record.id, record.is_active,record.username,index)"/>
            </template>
            
            <template v-else-if="column.key === 'date'">
                <div>{{ dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </template>
        </template>
    </a-table>
  </template>
  <script lang="ts" setup>
  import type { TableColumnsType } from 'ant-design-vue';
  import { ref,createVNode } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { getMembers,updateStatus,deleteMember } from '~/services/memberServices';
  import { Alert } from '../Alert/alertComponent';
  
  const open = ref<boolean>(false);
  const memberDetail = ref<boolean>(false);
  const memberDetailId = ref<number>(1);
  const active = ref<boolean>(true);
  const columns: TableColumnsType = [
    { title: 'ทั้งหมด 6 รายการ', children: [
      { title: 'ยูสเซอร์เนม', width: 100, dataIndex: 'UsernameAgent', key: 'UsernameAgent',  },
      { title: 'เบอร์โทร', width: 100, dataIndex: 'username', key: 'username',  },
      { title: 'ชื่อ - สกุล', width: 100, dataIndex: 'name', key: 'name',  },
      { title: 'ธนาคาร', width: 100, dataIndex: 'bank', key: 'bank',  },
      { title: 'เลขบัญชี', width: 100, dataIndex: 'bankNo', key: 'bankNo',  },
      { title: 'ช่องทาง', width: 100, dataIndex: 'marketing', key: 'marketing' },
      { title: 'สถานะโปรโมชั่น', width: 100, dataIndex: 'promotion', key: 'promotion' },
      { title: 'สถานะ', width: 100, dataIndex: 'is_active', key: 'is_active' },
    //   { title: 'รายละเอียด', width: 100, dataIndex: 'detail', key: 'detail' },
      { title: 'วันที่', width: 100, dataIndex: 'date', key: 'date' },
      {
            title: 'แก้ไข/ลบ',
            key: 'operation',
            fixed: 'right',
            width: 100,
        }
    ]},
  ];

const dataShow = ref<any[]>([]);

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

const timeStart = ref(dayjs('00:00', 'HH:mm'));
const timeEnd= ref(dayjs('23:59', 'HH:mm'));
const dateStart = ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD'));
const dateEnd = ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD'));
const sl_type = ref<string>('all');
const sl_search = ref<string>('0');
const find_bank_no = ref<string>('');
const bank = ref<string>('');
const amount = ref<string>('');
const dateSelect = ref<string>('Today');
const memberEdit = ref<any>();


const showModal = () => {
  open.value = true;
};

const showMemberDetailModal = (data: number) => {
    memberDetailId.value=data;
    memberDetail.value = true;
};

const onCreate = () => {
  active.value = true;
  memberEdit.value = {};
  showModal()
};

const closeModal = () => {
  open.value = false;
};

const onEdit = (data:any) => {
    active.value = false;
    memberEdit.value = data
        
    // memberEdit.id
    showModal();
}

const onDelete = (id: number, name: string) => {
    Modal.confirm({
        title: 'คุณต้องเปลี่ยนรหัสผ่านลูกค้า ใช่หรือไหม?',
        icon: createVNode(ExclamationCircleOutlined),
        content: `เปลี่ยนรหัสผ่านลูกค้า ${name} เป็น asdf123456`,
        okText: 'OK',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            const data = await deleteMember(id);
            if (data.status == 'success') {
                Alert("success", `เปลี่ยนรหัสผ่าน ${name} เรียบร้อย.`);
                getMember();
            } else {
                Alert("error", data.message);
            }
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
            const data = await updateStatus(id, status);
            if (data.status == 'success') {
                Alert("success", "เปลี่ยนสถานะเรียบร้อย.");
                getMember();
            } else {
                getMember();
                Alert("error", data.message);
            }
        },
        onCancel() {
            console.log('Cancel');
        },
        class: 'test',
    });
};

const getMember= async() =>{
    const data = await getMembers();
    if (data.status === "success") {
        dataShow.value = data.data;
    } else {
        Alert('error', data.message);
    }
}

onMounted(() => {
    getMember();
});

</script>