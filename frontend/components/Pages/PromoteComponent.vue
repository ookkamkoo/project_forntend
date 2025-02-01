<template>
    <div>
      <a-modal v-model:open="open" width="900px" :title="active ? 'เพิ่มโปรโมชั่น' : 'แก้ไขโปรโมชั่น'" :closable="true">
         <FormPromoteForm :closeModal="closeModal" :promotionEdit="promotionEdit" :getPromotions="getPromotions"/>
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
          <template v-else-if="column.key === 'image'">
            <a-image
              width="100%"
              :src="record.image"
            />
          </template>
          <template v-else-if="column.key === 'name'">
            <div>{{ record.name }}</div>
          </template>
          <template v-else-if="column.key === 'type'">
            <div>{{ Constants.optionsType[record.type-1].label }}</div>
          </template>
          <template v-else-if="column.key === 'bonus_type'">
            <div>{{ Constants.optionsTypeBonus[record.type-1].label }}</div>
          </template>
          <template v-else-if="column.key === 'type_open'">
            <div>{{ Constants.optionsDayOpen[record.type-1].label }}</div>
            <div v-if="Constants.optionsDayOpen[record.type-1].value == '2'">{{ record.open_data }}</div>
          </template>
          <template v-else-if="column.key === 'date'">
            <div>{{ dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
          </template>
          <template v-else-if="column.key === 'is_active'">
            <a-switch v-model:checked="record.is_active" @change="updateStatus(record.name,record.is_active,record.id,index)"/>
          </template>
          <template v-else-if="column.key === 'CreatedBySearch'">
            <div>{{ record.CreatedBySearch.name }}</div>
          </template>
      </template>
    </a-table>
  </template>
  <script lang="ts" setup>
  import type { TableColumnsType } from 'ant-design-vue';
  import { ref,createVNode } from 'vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { deletePromotion, getPromotion,updateStatuPromotion } from '~/services/promotionServices';
  import { Alert } from '../Alert/alertComponent';
  import * as Constants from '../Constants/Constants';
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
        { title: 'ประเภท', width: 100, dataIndex: 'type', key: 'type',  },
        { title: 'ประเภทโบนัส', width: 100, dataIndex: 'bonus_type', key: 'bonus_type' },
        { title: 'วันเปิดรับ', width: 100, dataIndex: 'type_open', key: 'type_open' },
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

const promotionEdit = ref<any>();


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
            const data = await updateStatuPromotion(id, status);
            if (data.status == 'success') {
                Alert("success", "เปลี่ยนสถานะเรียบร้อย.");
                getPromotions();
            } else {
                getPromotions();
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
    promotionEdit.value = data
        
    showModal();
}

const onDelete = (record:any) => {
  Modal.confirm({
        title: 'คุณต้องการลบโปรโมชั่น ใช่หรือไหม?',
        icon: createVNode(ExclamationCircleOutlined),
        content: `ลบโปรโมชั่น ชื่อ ${record.name}`,
        okText: 'OK',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            loading.value = true;
            const data = await deletePromotion(record.id);
            if (data.status == 'success') {
                Alert("success", `ลบโปรโมชั่น ${record.name} เรียบร้อย.`);
                getPromotions();
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

const getPromotions = async() =>{
  const data = await getPromotion();
  if (data.status === "success") {
      dataShow.value = data.data.data;
      allRecord.value = data.data.records_total;
  } else {
      Alert('error', data.message);
  }
  loading.value = false;
}

onMounted(() => {
  getPromotions();
});

</script>