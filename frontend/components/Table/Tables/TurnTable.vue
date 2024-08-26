<template>
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
                <div>{{ record.turn_play }} / {{ record.turn }}</div>
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
import { getTurnMemberServices } from '~/services/memberServices';

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

watch(() => props.id, (newValue: number) => {
    if (newValue) {
        getTurnMember(newValue);
    }
}, { immediate: true });

</script>