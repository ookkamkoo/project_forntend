<template>
    <a-row>
        <a-col class="p-1" :span="24">
            <label><b>ข้อมูลลูกค้า</b></label>
            <a-select
                v-model:value="formData.memberId"
                show-search
                placeholder="Member ที่ต้องการหา"
                style="width: 100%"
                :default-active-first-option="false"
                :show-arrow="false"
                :filter-option="false"
                :not-found-content="null"
                :options="data"
                @search="handleSearch"
                @change="handleChange"
            >
            </a-select>
        </a-col>
        <a-col class="p-1" :span="24">
            <label><b>เเทนที่ข้อมูล</b></label>
            <a-col class="p-1" :span="24">
                <a-checkbox v-model:checked="formData.cheangeData">เเทนที่ข้อมูลลูกค้าด้วยข้อมูลใหม่</a-checkbox>
            </a-col>
        </a-col>
    </a-row>
    <a-row justify="center">
        <a-button @click="props.closeModal()" class="m-1">Cancel</a-button>
        <a-button type="primary" class="m-1 sky" @click="addDataDeposit()">เพิ่มข้อมูล</a-button>
    </a-row>
</template>

<script lang="ts" setup>
    import { getMemberSearchServices } from '~/services/memberServices';
    import { addMemberToList } from '~/services/postCreditService';
    import { Alert } from '../Alert/alertComponent';
    const data = ref<any[]>([{}]);

    const props = defineProps<{
        closeModal:Function,
        getList:Function,
        addData:number,
    }>();

    let formData = reactive({
        id:0,
        memberId: '',
        cheangeData:false
    });

    let timeout: any;
    let currentValue = '';

    function fetch(value: string, callback: any) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        async function fake() {
            try {
                const response = await getMemberSearchServices(formData.id,value);
                if (currentValue === value) {
                    if(response.data != ''){
                        const result = response.data;
                        const data: { label: string; value: number; }[] = [];
                        result.forEach((r: any) => {
                            data.push({
                                label: `${r.username_agent}  ${r.agent_name} `,
                                value: r.id,
                            });
                        });
                        console.log(data);
                        callback(data);
                    }
                }
            } catch (error) {
                const data: { label: string; value: number; }[] = [];
                callback(data);
                console.error('Error fetching search results:');
            }
        }
        timeout = setTimeout(fake, 300);
    }

    const handleSearch = (val: any) => {
        fetch(val as string, (d: any[]) => (data.value = d));
    };

    const handleChange = async (val: any) => {
        console.log("handleChange");
        formData.memberId = val
    };

    const addDataDeposit = async() => {
        const data = await addMemberToList(formData,props.addData);
            if(data.status == "success"){
                Alert('success','เพิ่มพนักงาน หรือ ผู้ดูเเลระบบเรียบร้อย.')
                props.closeModal()
                props.getList();
            }else{
                Alert('error',data.message);
            }
    }
</script>