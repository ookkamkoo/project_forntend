<template>
    <div>
        <a-modal v-model:open="open" :title="active ? 'เพิ่มบัญชีโยกเงินออโต้' : 'แก้ไขบัญชีโยกเงินออโต้'" :closable="true">
            <FormTranferAutoForm :closeModal="closeModal" :tranferAutoEdit="tranferAutoEdit" :getTranferAuto="getTranferAuto" :active="active"/>
                <template #footer></template>
        </a-modal>
    </div>
    <a-row class="p-2">
        <a-col :span="11">
        <a-row >
            <a-col class="p-1" :span="15">
            <label>เริ่มต้นวันที่</label>
            <a-date-picker v-model:value="formData.dateStart" />
            </a-col>
            <a-col class="p-1" :span="8">
            <label><br></label>
            <a-time-picker v-model:value="formData.timeStart" format="HH:mm" />
            </a-col>
        </a-row>
        </a-col>
        <a-col :span="11">
        <a-row>
            <a-col class="p-1" :span="15">
            <label>ถึงวันที่</label>
            <a-date-picker v-model:value="formData.dateEnd" />
            </a-col>
            <a-col class="p-1" :span="8">
            <label><br></label>
            <a-time-picker v-model:value="formData.timeEnd" format="HH:mm" />
            </a-col>
        </a-row>
        </a-col>
        <a-col class="p-1" :span="2">
            <label><br></label>
            <a-button class="submit sky" type="primary"><SearchOutlined /> ค้นหา</a-button>
        </a-col>
    </a-row>
    <a-row class="p-2" justify="end">
        <div class="action m-2">
            <a-button class="submit sky" type="primary" @click="create"><PlusOutlined /> เพิ่ม</a-button>
        </div>
        <a-table 
            :columns="dynamicColumns"
            :data-source="dataShow"
            bordered
            size="small"
            :scroll="{ x: 1500, y: 700 }"
            :pagination="{ pageSize: 10 }"
        >
            <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'id'">
                <div>{{ record.id }}</div>
            </template>
            <template v-if="column.key === 'bank'">
                <a-image
                width="35px"
                :src="record.bank.bank.image"
                :preview="false"
                />
            </template>
            <template v-if="column.key === 'bank_name'">
                <div>{{ record.bank.name }}</div>
            </template>
            <template v-if="column.key === 'bank_no'">
                <div>{{ record.bank.book_number }}</div>
            </template>
            <template v-if="column.key === 'bank_to'">
                <a-image
                width="35px"
                :src="record.bank_to.bank.image"
                :preview="false"
                />
            </template>
            <template v-if="column.key === 'bank_name_to'">
                <div>{{ record.bank_to.name }}</div>
            </template>
            <template v-if="column.key === 'bank_no_to'">
                <div>{{ record.bank_to.book_number }}</div>
            </template>
            <template v-if="column.key === 'amount'">
                <div>{{ record.amount_more }}</div>
            </template>
            <template v-if="column.key === 'amount_to'">
                <div>{{ record.amount }}</div>
            </template>
            <template v-if="column.key === 'remark'">
                <div>{{ record.remark }}</div>
            </template>
            <template v-if="column.key === 'created_by'">
                <div>{{ record.CreatedBySearch.username }}</div>
            </template>
            <template v-else-if="column.key === 'created_at'">
                <div>{{ dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </template>
            <template v-else-if="column.key === 'status'">
                <!-- <a-tag color="green" v-if="record.status == 1">ปิดใช้งาน</a-tag>
                <a-tag color="red" v-else-if="record.status == 2">ปิดใช้งาน</a-tag> -->
                <a-switch v-model:checked="record.status" @change="updateStatus(record.bank.name,record.status,record.id,index)"/>
            </template>
            <template v-if="column.key === 'operation'">
                <a-flex gap="small" horizontal :justify="'center'">
                    <a-button v-if="column.key" class="warning" type="primary" @click="onEdit(record)"><FormOutlined /></a-button>
                    <a-button type="primary" class="danger" danger ghost @click="onDelete(record)"><CloseOutlined /></a-button>
                </a-flex>
            </template>
            </template>
        </a-table>
    </a-row>
  </template>
<script lang="ts" setup>
import { ref, computed, onMounted,createVNode } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { getTranferAutoServices,updateStatuTranfreServices,deleteTranferAutoServices } from '~/services/tranferAutoServices';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Alert } from '../Alert/alertComponent';

const dataShow = ref<any[]>([]);
const allRecord = ref<number>(0);
const open = ref<boolean>(false);
const active = ref<boolean>(true);
const tranferAutoEdit = ref<any>();


const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

    let formData = reactive({
        timeStart:ref(dayjs('00:00:00', 'HH:mm:ss')),
        timeEnd:ref(dayjs('23:59:59', 'HH:mm:ss')),
        dateStart:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
        dateEnd:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
        username:ref<string>(''),
        adminName:ref<string>(''),
        amount:ref<string>(''),
        dateSelect:ref<string>('Today'),
    });

    const dynamicColumns = computed(() => {
        return [
    { title: `ทั้งหมด ${allRecord.value} รายการ`, children: [
        { title: 'No', width: 100, dataIndex: 'id', key: 'id',  },
        { title: 'ช้อมูลการโยกเงิน', children:[
            { title: 'บัญชีต้นทาง',children:[
                { title: 'ธนาคาร', width: 80, dataIndex: 'bank', key: 'bank',  },
                { title: 'ชื่อบัญชี', width: 150, dataIndex: 'bank_name', key: 'bank_name',  },
                { title: 'เลขบัญชี', width: 100, dataIndex: 'bank_no', key: 'bank_no',  },
            ]  },
            { title: 'บัญชีปลายทาง',children:[
                { title: 'ธนาคาร', width: 80, dataIndex: 'bank_to', key: 'bank_to',  },
                { title: 'ชื่อบัญชี', width: 150, dataIndex: 'bank_name_to', key: 'bank_name_to',  },
                { title: 'เลขบัญชี', width: 100, dataIndex: 'bank_no_to', key: 'bank_no_to',  },
            ]  },
        ]  },
        { title: 'เมื่อเงินมีมากกว่า', width: 100, dataIndex: 'amount', key: 'amount',  },
        { title: 'โยกเป็นจำนวนเงิน', width: 100, dataIndex: 'amount_to', key: 'amount_to' },
        { title: 'สถานะ', dataIndex: 'status', key: 'status', width: 150 },
        {
            title: 'แก้ไข/ลบ',
            key: 'operation',
            width: 100,
        }
        ] 
        },
    ];
    });
  
  const getTranferAuto = async() => {
            const data = await getTranferAutoServices();
            if (data.status === "success") {
            allRecord.value = data.data.recordsTotal;
            dataShow.value = data.data.data;
        }
    }

    onMounted(() => {
        getTranferAuto();
    });

    const create = () =>{
        active.value = true;
        tranferAutoEdit.value = {} 
        showModal();
    }
    const showModal = () => {
        open.value = true;
    };

    const closeModal = () => {
        open.value = false
    }

    const onEdit = (data:any) => {
        active.value = false;
        tranferAutoEdit.value = data 
        showModal();
    }

    const updateStatus = async(name: string,status: boolean,id: number,index: number) =>{
    let is_active = ''; 
        if (status) {
            is_active = 'เปิดใช้งาน';
        } else {
            is_active = 'ปิดใช้งาน';
        }

        Modal.confirm({
            title: 'คุณต้องการที่จะเปลี่ยนสถานะใช่ไหม?',
            icon: createVNode(ExclamationCircleOutlined),
            content: createVNode('div', { key: 'content' }, [`เปลี่ยนสถานะของ ${name} เป็น ${is_active}`]),
            async onOk() {
                const data = await updateStatuTranfreServices(id, status);
                if (data.status == 'success') {
                    Alert("success", "เปลี่ยนสถานะเรียบร้อย.");
                    getTranferAuto();
                } else {
                    getTranferAuto();
                    Alert("error", data.message);
                }
            },
            onCancel() {
                dataShow.value[index].status = !status;
                console.log('Cancel');
            },
            class: 'test',
        });
}

const onDelete = (record:any) => {
  Modal.confirm({
        title: 'คุณต้องลบตั้งค่าการโยกเงิน ใช่หรือไหม?',
        icon: createVNode(ExclamationCircleOutlined),
        content: `ลบตั้งค่าการโยกเงิน ชื่อ ${record.bank.name}`,
        okText: 'OK',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            const data = await deleteTranferAutoServices(record.id);
            if (data.status == 'success') {
                Alert("success", `ลบตั้งค่าการโยกเงิน ${record.bank.name} เรียบร้อย.`);
                getTranferAuto();
            } else {
                Alert("error", data.message);
            }
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

</script>