<template>
    <a-row class="p-2">
        <a-col :span="24" :md="10" :lg="11">
          <a-row >
              <a-col class="p-1" :span="15">
              <label>เริ่มต้นวันที่</label>
              <a-date-picker v-model:value="formData.dateStart" />
              </a-col>
              <a-col class="p-1" :span="9">
              <label><br></label>
              <a-time-picker v-model:value="formData.timeStart" format="HH:mm" />
              </a-col>
          </a-row>
        </a-col>
        <a-col :span="24" :md="10" :lg="11">
          <a-row>
              <a-col class="p-1" :span="15">
              <label>ถึงวันที่</label>
              <a-date-picker v-model:value="formData.dateEnd" />
              </a-col>
              <a-col class="p-1" :span="9">
              <label><br></label>
              <a-time-picker v-model:value="formData.timeEnd" format="HH:mm" />
              </a-col>
          </a-row>
        </a-col>
        <a-col class="p-1" :span="24" :md="4" :lg="2">
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
    <a-table 
            :columns="dynamicColumns"
            :data-source="dataShow"
            bordered
            size="small"
            :scroll="{ x: 1500, y: 700 }"
            :pagination="paginationConfig"
            :loading="loading"
            @change="handleTableChange"
        >
            <template #bodyCell="{ column, record,index }">
                <template v-if="column.key === 'id'">
                    <div>{{index + 1 }}</div>
                </template>
                <template v-if="column.key === 'bank_image'">
                    <a-image
                    width="35px"
                    :src="record.bank_image"
                    :preview="false"
                    />
                </template>
                <template v-if="column.key === 'bank_name_member'">
                    <div>{{ record.bank_name_member }}</div>
                </template>
                <template v-if="column.key === 'bank_no'">
                    <div>{{ record.bank_no }}</div>
                </template>
                <template v-if="column.key === 'bank_to_image'">
                    <a-image
                    width="35px"
                    :src="record.bank_to_image"
                    :preview="false"
                    />
                </template>
                <template v-if="column.key === 'bank_to_name_member'">
                    <div>{{ record.bank_to_name_member }}</div>
                </template>
                <template v-if="column.key === 'bank_to_no'">
                    <div>{{ record.bank_to_no }}</div>
                </template>
                <template v-if="column.key === 'total_amount'">
                    <div>{{ record.total_amount }}</div>
                </template>
                <template v-if="column.key === 'count'">
                    <div>{{ record.count }}</div>
                </template>
            </template>
            <template #summary>
                <tr class="center">
                    <td ><strong>ทั้งหมด</strong></td>
                    <td colspan="6"></td>
                    <td><strong>{{sumAmount}}</strong></td>
                    <td><strong>{{totalCount}}</strong></td>
                </tr>
            </template>
        </a-table>
  </template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { getTranferMoneySummaryServices } from '~/services/bankTranferAuto';

const dataShow = ref<any[]>([]);
const allRecord = ref<number>(0);
const sumAmount = ref<number>(0);
const totalCount = ref<number>(0);
const loading = ref(true);


const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

    let formData = reactive({
        timeStart:ref(dayjs('00:00:00', 'HH:mm:ss')),
        timeEnd:ref(dayjs('23:59:59', 'HH:mm:ss')),
        dateStart:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
        dateEnd:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
        dateSelect:ref<string>('Today'),
        page:ref<number>(1),
        pageSize:ref<number>(10),
    });

    const dynamicColumns = computed(() => {
        return [
        { title: `ทั้งหมด ${allRecord.value} รายการ`, children: [
            { title: 'No', width: 100, dataIndex: 'id', key: 'id',  },
            { title: 'ช้อมูลการโยกเงิน', children:[
                { title: 'บัญชีต้นทาง',children:[
                    { title: 'ธนาคาร', width: 100, dataIndex: 'bank_image', key: 'bank_image',  },
                    { title: 'ชื่อบัญชี', width: 100, dataIndex: 'bank_name_member', key: 'bank_name_member',  },
                    { title: 'เลขบัญชี', width: 100, dataIndex: 'bank_no', key: 'bank_no',  },
                ]  },
                { title: 'บัญชีปลายทาง',children:[
                    { title: 'ธนาคาร', width: 100, dataIndex: 'bank_to_image', key: 'bank_to_image',  },
                    { title: 'ชื่อบัญชี', width: 100, dataIndex: 'bank_to_name_member', key: 'bank_to_name_member',  },
                    { title: 'เลขบัญชี', width: 100, dataIndex: 'bank_to_no', key: 'bank_to_no',  },
                ]  },
            ]  },
            { title: 'ยอดเงิน', width: 100, dataIndex: 'total_amount', key: 'total_amount',  },
            { title: 'จำนวนรายการทั้งหมด', width: 100, dataIndex: 'count', key: 'count' },
            ] 
            },
        ];
    });
  
  const getTranferMoneySummary = async() => {
        loading.value = true;
        const data = await getTranferMoneySummaryServices(formData);
        if (data.status === "success") {
            dataShow.value = data.data.data;
            allRecord.value = data.data.recordsTotal;
            sumAmount.value = data.data.totalAmountSum;
            totalCount.value = data.data.totalCount;
        } else {
            console.log("error : "+ data.message);
        }
        loading.value = false;
    }

    onMounted(() => {
        getTranferMoneySummary();
    });

    const search = () =>{
        getTranferMoneySummary();
    }

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
        getTranferMoneySummary();
    };

    const paginationConfig = ref({
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: (total: number) => `ทั้งหมด ${total} รายการ`,
    });

    const handleTableChange = (pagination: any) => {
        formData.page = pagination.current
        getTranferMoneySummary();
        paginationConfig.value.current = pagination.current
        paginationConfig.value.pageSize = pagination.pageSize
    };
</script>