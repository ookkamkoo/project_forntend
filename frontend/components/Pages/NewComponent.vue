<template>
    <div>
      <a-modal v-model:open="open" width="900px" :title="active ? 'เพิ่มเเจ้งข่าวสาร' : 'แก้ไขเเจ้งข่าวสาร'" :closable="true">
         <FormNewForm :closeModal="closeModal" :newEdit="newEdit" :getNews="getNews"/>
         <template #footer></template>
      </a-modal>
    </div>
    <a-row class="p-2" justify="end">
      <a-col class="p-rl-1">
        <label><br></label>
        <a-button class="submit sky" type="primary"  @click="showModal"><PlusOutlined /> เพิ่ม</a-button>
      </a-col>
    </a-row>
    <a-table 
      :columns="dynamicColumns"
      :data-source="dataShow"
      bordered
      size="small"
      :scroll="{ x: 1500, y: 700 }"
      :pagination="{ pageSize: 10 }"
      :loading="loading"
    >
      <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'operation'">
            <a-flex gap="small" :justify="'center'" horizontal>
                <a-button class="warning" type="primary" @click="onEdit(record)"><FormOutlined /></a-button>
                <a-button class="danger" type="primary" @click="onDelete(record)"><DeleteOutlined /></a-button>
            </a-flex>
          </template>
          <template v-else-if="column.key === 'name'">
            <div>{{ record.name }}</div>
          </template>
          <template v-else-if="column.key === 'image'">
            <a-image
              width="100%"
              :src="config.public.serviceUrls +'/'+ record.image"
            />
          </template>
          <template v-else-if="column.key === 'date'">
            <div>{{ dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
          </template>
          <template v-else-if="column.key === 'is_active'">
            <a-switch v-model:checked="record.is_active" @change="updateStatus(record.name,record.is_active,record.id,index)"/>
          </template>
          <template v-else-if="column.key === 'CreatedBySearch'">
            <div>{{ record.created_by_name }}</div>
          </template>
      </template>
    </a-table>
  </template>
  <script lang="ts" setup>
  import type { TableColumnsType } from 'ant-design-vue';
  import { ref,createVNode } from 'vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { getNewServices,updateStatuNews,deleteNewServices } from '~/services/newServices';
  import { Alert } from '../Alert/alertComponent';
  const config = useRuntimeConfig()

  const open = ref<boolean>(false);
  const dataShow = ref<any[]>([]);
  const active = ref<boolean>(true);
  const allRecord = ref<number>(0);
  const loading = ref(true);
  
  const showModal = () => {
    open.value = true;
  };


const dynamicColumns = computed(() => {
  return [
    { 
      title: `ทั้งหมด ${allRecord.value} รายการ`, 
      children: [
        { title: 'ชื่อ', width: 100, dataIndex: 'name', key: 'name',  },
        { title: 'รูป', width: 70, dataIndex: 'image', key: 'image',  },
        { title: 'ลำดับ', width: 100, dataIndex: 'priority', key: 'priority',  },
        { title: 'สถานะ', width: 100, dataIndex: 'is_active', key: 'is_active',  },
        { title: 'วันที่', width: 100, dataIndex: 'date', key: 'date' },
        { title: 'สร้างโดย', width: 100, dataIndex: 'CreatedBySearch', key: 'CreatedBySearch',  },
        {
              title: 'แก้ไข/ลบ',
              key: 'operation',
              width: 100,
          }
      ] 
    },
  ];
});

const closeModal = () => {
  open.value = false;
};

const newEdit = ref<any>();


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
            loading.value = true;
            const data = await updateStatuNews(id, status);
            if (data.status == 'success') {
                Alert("success", "เปลี่ยนสถานะเรียบร้อย.");
                getNewServices();
            } else {
                getNewServices();
                Alert("error", data.message);
            }
            loading.value = false;
        },
        onCancel() {
          dataShow.value[index].is_active = !status;
          console.log('Cancel');
        },
        class: 'test',
    });
}


const onEdit = (data:any) => {
    active.value = false;
    newEdit.value = data
    showModal();
}

const onDelete = (record:any) => {
  Modal.confirm({
        title: 'คุณต้องลบโปรโมชั่น ใช่หรือไหม?',
        icon: createVNode(ExclamationCircleOutlined),
        content: `ลบโปรโมชั่น ชื่อ ${record.name}`,
        okText: 'OK',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            loading.value = true;
            const data = await deleteNewServices(record.id);
            if (data.status == 'success') {
                Alert("success", `ลบโปรโมชั่น ${record.name} เรียบร้อย.`);
                getNews();
            } else {
                Alert("error", data.message);
            }
            loading.value = false;
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

const getNews = async() =>{
  const data = await getNewServices();
  if (data.status === "success") {
      dataShow.value = data.data.data;
      allRecord.value = data.data.records_total;
  } else {
      Alert('error', data.message);
  }
  loading.value = false;
}

onMounted(() => {
  getNews();
});

</script>