<template>
    <a-table 
    :columns="columns"
    :data-source="dataShow"
    bordered
    :scroll="{ x: 800, y: 700 }"
    :pagination="{ pageSize: 10 }"
>
    <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'UsernameAgent'">
            <div>{{ record.username_agent }}</div>
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
    </template>
</a-table>
</template>
<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue';
//   import dayjs, { Dayjs } from 'dayjs';
const dataShow = ref<any[]>([]);

const columns: TableColumnsType = [
  { title: 'ประเภท', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'ยอดเล่น', dataIndex: 'address', key: '1', width: 100 },
  { title: 'ยอดเล่นจริง', dataIndex: 'address', key: '1', width: 100 },
  { title: 'ยอดได้เสีย', dataIndex: 'address', key: '1', width: 100 },
  { title: 'เทิร์นปัจจุบัน', dataIndex: 'address', key: '1', width: 100 },
  { title: 'เดิมพันค้าง', dataIndex: 'address', key: '2', width: 100 },
];

//   const getMember= async() =>{
//     const data = await getMembers();
//     if (data.status === "success") {
//         dataShow.value = data.data;
//     } else {
//         Alert('error', data.message);
//     }
// }

// onMounted(() => {
//     getMember();
// });
</script>