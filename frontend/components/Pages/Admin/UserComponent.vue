<template>
    <div>
        <a-modal v-model:open="openPermission" width="1000px" title="อัปเดตสิทธิ์เข้าถึง" @ok="">
            <OtherPermission :closePermission="closePermission" :permissionId="permissionId"/>
            <template #footer>
              </template>
        </a-modal>
    </div>
    <div>
        <a-modal v-model:open="open" :title="active ? 'เพิ่มพนักงาน' : 'แก้ไขพนักงาน'" :closable="true">
            <FormUserForm :closeModal="closeModal" :getUsers="getUsers" :editData="editData"/>
              <template #footer>
              </template>
        </a-modal>
    </div>
    <a-row class="p-2" justify="end">
      <a-col class="p-rl-1">
        <a-button class="submit sky" type="primary"  @click="onCreate"><PlusOutlined /> เพิ่ม</a-button>
      </a-col>
    </a-row>
    <a-table 
    :columns="dynamicColumns" 
    :data-source="dataForm" 
    :scroll="{ x: 1500, y: 700 }"
    bordered
    :pagination="{ pageSize: 10 }"
    :loading="loading"
    >
      <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'operation'">
            <a-flex gap="small" :justify="'center'" horizontal>
                <a-button v-if="column.key" class="warning" type="primary" @click="onEdit(record)"><FormOutlined /></a-button>
                <a-button class="danger" type="primary" @click="onDelete(record.id,record.name)"><DeleteOutlined /></a-button>
            </a-flex>
          </template>
          <template v-else-if="column.key === 'key2'">
            <a-flex gap="small" :justify="'center'" horizontal>
                <a-button v-if="column.key" class="edit2pass" @click="reset2Pass(record.id,record.name)">รีเซ็ต</a-button>
            </a-flex>
          </template>
          <template v-else-if="column.key === 'id'">
              <div>{{ index + 1 }}</div>
          </template>
          <template v-else-if="column.key === 'status'">
            <div>
                <a-switch v-model:checked="record.is_active" @change="update_status(record.id, record.is_active,record.name)"/>
            </div>
          </template>
          <template v-else-if="column.key === 'name'">
              <div>{{ record.name }}</div>
          </template>
          <template v-else-if="column.key === 'username'">
            <div>{{ record.username }}</div>
          </template>
          <template v-else-if="column.key === 'role'">
            <div>{{ record.role.name }}</div>
          </template>
          <template v-else-if="column.key === 'last_date_login'">
            <div v-if="record.last_date_login == '0001-01-01T07:00:00+07:00'"><a-tag color="green"> - </a-tag></div>
            <div v-else><a-tag color="green">{{ dayjs(record.last_date_login).format('YYYY-MM-DD HH:mm:ss') }}</a-tag></div>
          </template>
          <template v-else-if="column.key === 'last_active'">
            <div v-if="record.last_active == '0001-01-01T07:00:00+07:00'"> <a-tag color="green"> - </a-tag> </div>
            <div v-else><a-tag color="green"> {{ dayjs(record.last_active).format('YYYY-MM-DD HH:mm:ss') }}</a-tag></div>
          </template>
          <template v-else-if="column.key === 'last_ip_login'">
            <div v-if="record.last_ip_login == ''"> <a-tag color="green"> - </a-tag> </div>
            <div v-else><a-tag color="green">{{record.last_ip_login}}</a-tag></div>
          </template>
          <template v-else-if="column.key === 'role-permission'">
            <a-button danger @click="showPermission(record.id)">สิทธ์เข้าถึง</a-button>
          </template>
          <template v-else-if="column.key === 'last_active'">
              <div v-if="record.last_active == '0001-01-01T07:00:00+07:00'"> <a-tag color="green"> - </a-tag> </div>
              <div v-else><a-tag color="green"> {{record.last_active}} </a-tag></div>
          </template>
          <template v-else>
            <div v-if="record.is_auth"> <a-tag color="green">เปิดใช้งาน</a-tag> </div>
            <div v-else><a-tag color="red">ยังไม่ได้ยืนยัน</a-tag></div>
          </template>
      </template>
    </a-table>
  </template>
  
<script lang="ts" setup>
import { ref,createVNode  } from 'vue';
import dayjs from 'dayjs';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { getUser,updateStatus,deleteUser,reset2PassUser } from '~/services/userServices';
import { Alert } from '../../Alert/alertComponent';

const open = ref<boolean>(false);
const openPermission = ref<boolean>(false);
const active = ref<boolean>(true);
const dataForm = ref<any[]>([]);
const editData = ref<any>();
const permissionId = ref<number>(0);
const loading = ref(true);
const allRecord = ref<number>(0);

const dynamicColumns = computed(() => {
  return [
    { 
      title: `ทั้งหมด ${allRecord.value} รายการ`, 
      children: [
        { title: 'ID', width: 80, dataIndex: 'id', key: 'id' },
        { title: 'ชื่อ', width: 80, dataIndex: 'name', key: 'name' },
        { title: 'ชื่อผู้ใช้งาน', width: 80, dataIndex: 'username', key: 'username' },
        { title: 'ตำเเหน่ง', width: 80, dataIndex: 'role', key: 'role' },
        { title: 'เข้าสู่ระบบล่าสุด', width: 100, dataIndex: 'last_date_login', key: 'last_date_login' },
        { title: 'ใช้งานล่าสุด', width: 120, dataIndex: 'last_active', key: 'last_active' },
        { title: 'IP ที่ใช้งานล่าสุด', width: 120, dataIndex: 'last_ip_login', key: 'last_ip_login' },
        { title: 'สถานะ', width: 80, dataIndex: 'is_active', key: 'status'},
        { title: 'สิทธิ์ใช้งาน', width: 80, dataIndex: 'role-permission', key: 'role-permission' },
        { title: 'ยืนยันตัวตน', width: 80, dataIndex: 'is_auth', key: 'is_auth' },
        { title: 'รหัสสองชั้น', width: 80, key: 'key2' },
        { title: 'แก้ไข/ลบ', key: 'operation', fixed: 'right', width: 80 }
        ] 
    },
  ];
});

const showModal = () => {
    open.value = true;
};

const showPermission = (id:number) => {
    openPermission.value = true;
    permissionId.value = id
};
const closePermission = () => {
    openPermission.value = false;
};

const onCreate = () => {
  active.value = true;
  editData.value = {};
  showModal()
};

const closeModal = () => {
    open.value = false;
};

const onEdit = (data :any) => {
    active.value = false;
    editData.value = {
        id: data.id,
        name: data.name,
        username: data.username,
        roleId: data.role.id,
        time_open_close: data.time_open_close,
        time_open: data.time_open,
        time_close: data.time_close,
        type_open: data.type_open,
        open_data: data.open_data,
    };
    console.log(editData);
    
    showModal();
};

const onDelete = (id: number, name: string) => {
    Modal.confirm({
        title: 'คุณต้องการลบพนักงานใช่หรือไหม?',
        icon: createVNode(ExclamationCircleOutlined),
        content: `คุณต้องการลบพนักงาน ${name}`,
        okText: 'OK',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            const data = await deleteUser(id);
            loading.value = true;
            if (data.status == 'success') {
                getUsers();
                Alert("success", `ลบพนักงาน ${name} เรียบร้อย.`);
            } else {
                Alert("error", data.message);
            }
            loading.value = false;
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};

const reset2Pass = (id: number, name: string) => {
    Modal.confirm({
        title: 'คุณต้องการรีเซตรหัสยืนยันตัวตนของพนักงานใช่หรือไหม?',
        icon: createVNode(ExclamationCircleOutlined),
        content: `คุณต้องการรีเซตรหัสยืนยันตัวตนของพนักงาน ${name}`,
        okText: 'OK',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            const data = await reset2PassUser(id);
            loading.value = true;
            if (data.status == 'success') {
                getUsers();
                Alert("success", `รีเซตรหัสยืนยันตัวตน ${name} เรียบร้อย.`);
            } else {
                Alert("error", data.message);
            }
            loading.value = false;
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};

const update_status = async (id: number, status: boolean, name: string) => {
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
            loading.value = true;
            if (data.status == 'success') {
                Alert("success", "เปลี่ยนสถานะเรียบร้อย.");
            } else {
                getUsers();
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

const getUsers = async () => {
    const data = await getUser();
    loading.value = true;
    if (data.status === "success") {
        dataForm.value = data.data.data;
        allRecord.value = data.data.recordsTotal;
    } else {
        Alert('error', data.message);
    }
    loading.value = false;
};

onMounted(() => {
    getUsers();
});
</script>