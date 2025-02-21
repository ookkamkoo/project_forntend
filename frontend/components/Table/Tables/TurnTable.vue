<template>
    <a-flex :justify="'space-between'" style="width: 100%;">
        <h3>
            เทิร์นการเล่น
        </h3>
        <a-button type="primary" danger ghost @click="clearTurnMember(id)">เคลียร์เทิร์น</a-button>
    </a-flex>
    <a-table 
        :columns="columns"
        :data-source="dataShow"
        bordered
        :scroll="{ x: 800, y: 700 }"
        :pagination="{ pageSize: 20 }"
        :loading="loading"
    >
        <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'type'">
                <div>{{ record.type }}</div>
            </template>
            <template v-else-if="column.key === 'turn'">
                <div>{{ record.turn }} / {{ record.turn_play }}</div>
            </template>
            <template v-else-if="column.key === 'trunAfter'">
                <div>0</div>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { TableColumnsType } from 'ant-design-vue';
import { getTurnMemberServices,clearTurnMemberServices } from '~/services/memberServices';
import { createVNode } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

interface TurnMember {
    type: string;
    turn_play: number;
    turn: number;
    // Add other fields as necessary
}

const dataShow = ref<TurnMember[]>([]);
const loading = ref(true);

const columns: TableColumnsType = [
  { title: 'ประเภท', width: 100, dataIndex: 'type', key: 'type' },
  { title: 'เทิร์นปัจจุบัน', dataIndex: 'turn', key: 'turn', width: 100 },
  { title: 'เดิมพันค้าง', dataIndex: 'trunAfter', key: 'trunAfter', width: 100 },
];

const props = defineProps<{
    id: number;
}>();

const getTurnMember = async (id: number) => {
    loading.value = true;
    const responseData = await getTurnMemberServices(id);
    if (responseData.status === "success") {
        dataShow.value = responseData.data;
        loading.value = false;
    }
};

const clearTurnMember = (id: number) => {
  Modal.confirm({
    title: 'คุณต้องการเคลียร์การเล่นของลูกค้าใช่ไหม?',
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode('div', { style: 'color:red;' }, 'เคลียร์การเล่นของลูกค้า'),
    class: 'test',
    async onOk() {
      try {
        // เริ่มโหลดงาน
        loading.value = true;

        const responseData = await clearTurnMemberServices(id);

        if (responseData.status === 'success') {
            loading.value = false;
            getTurnMember(id);
        }
      } catch (error) {
        console.error('Error:', error);
      } 
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

watch(() => props.id, (newValue: number) => {
    if (newValue) {
        getTurnMember(newValue);
    }
}, { immediate: true });

</script>