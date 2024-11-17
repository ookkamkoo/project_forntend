<template>
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
        <a-button class="submit sky" type="primary" @click="search"><SearchOutlined /> ค้นหา</a-button>
      </a-col>
    </a-row>
    <a-row class="p-2">
      <div>
        <a-radio-group v-model:value="formData.dateSelect" @change="handleDateSelectChange">
          <a-radio-button value="Today">วันนี้</a-radio-button>
          <a-radio-button value="Yesterday">เมื่อวาน</a-radio-button>
          <a-radio-button value="ThisMonth">เดือนนี้</a-radio-button>
          <a-radio-button value="LastMonth">เดือนที่เเล้ว</a-radio-button>
        </a-radio-group>
      </div>
    </a-row>
    <a-row>
        <a-col span="8" :xl="4">
            <div class="card deposit-background">
            <a-row :align="'middle'">
                <a-col span="16">
                <div class="label">ฝากเงิน</div>
                <div class="amount">{{ ((report.sum_deposit || 0) + (report.sum_edit_credit || 0)).toFixed(2) }}</div>
                </a-col>
                <a-col span="8" class="icon-wrapper">
                    <DollarOutlined :style="{ fontSize: '56px'}" />
                </a-col>
                <div class="transactions">ฝากเงิน {{report.sum_deposit_count || 0 + report.sum_edit_credit_count || 0}} รายการ</div>
            </a-row>
            </div>
        </a-col>
        <a-col span="8" :xl="4">
            <div class="card withdraw-background">
            <a-row :align="'middle'">
                <a-col span="16">
                <div class="label">ถอนเงิน</div>
                <div class="amount">{{(report.sum_withdraw || 0 ).toFixed(2)}}</div>
                </a-col>
                <a-col span="8" class="icon-wrapper">
                    <AuditOutlined :style="{ fontSize: '56px', color: 'color: whitesmoke;' }" />
                </a-col>
                <div class="transactions">ถอนเงิน {{report.sum_withdraw_count || 0}} รายการ</div>
            </a-row>
            </div>
        </a-col>
        <a-col span="8" :xl="4">
            <div class="card members-background">
            <a-row :align="'middle'">
                <a-col span="16">
                <div class="label">ลูกค้าใหม่</div>
                <div class="amount">{{ members.NewMembersCount || 0 }}</div>
                </a-col>
                <a-col span="8" class="icon-wrapper">
                    <UserAddOutlined :style="{ fontSize: '56px', color: 'color: whitesmoke;' }" />
                </a-col>
                <div class="transactions">สมาชิกทั้งหมด {{ members.TotalMembersCount || 0}} คน</div>
            </a-row>
            </div>
        </a-col>
        <a-col span="8" :xl="4">
            <div class="card bonus-background">
            <a-row :align="'middle'">
                <a-col span="16">
                <div class="label">โบนัส</div>
                <div class="amount">{{ (report.sum_deposit_bonus || 0 + report.sum_edit_bonus_credit || 0).toFixed(2) }}</div>
                </a-col>
                <a-col span="8" class="icon-wrapper">
                    <CrownOutlined :style="{ fontSize: '56px', color: 'color: whitesmoke;' }" />
                </a-col>
                <div class="transactions">โบนัส {{report.sum_deposit_bonus_count || 0 + report.sum_edit_credit_bonus_count || 0}} รายการ</div>
            </a-row>
            </div>
        </a-col>
        <a-col span="8" :xl="4">
            <div class="card amount-background">
            <a-row :align="'middle'">
                <a-col span="16">
                <div class="label">เงินในระบบ</div>
                <div class="amount">{{(balance.SumBalanceLoggedIn || 0).toFixed(2)}}</div>
                </a-col>
                <a-col span="8" class="icon-wrapper">
                    <CrownOutlined :style="{ fontSize: '56px', color: 'color: whitesmoke;' }" />
                </a-col>
                <div class="transactions">เงินในระบบทั้งหมด {{balance.SumBalanceAll || 0}}</div>
            </a-row>
            </div>
        </a-col>
    </a-row>
    <a-row class="p-2">
        <a-radio-group v-model:value="formData.dateSelectShow">
            <a-radio-button value="Profit">กำไรขาดทุน</a-radio-button>
            <a-radio-button value="Member">สมาชิก</a-radio-button>
        </a-radio-group>
    </a-row>
    <a-row class="my-2">
        <a-col span="24" :xl="16" v-if="formData.dateSelectShow=='Profit'">
            <LineChart :chart-data="chartData" :options="config.options" />
            <LineChart :chart-data="chartDataCount" :options="configCount.options" />
        </a-col>
        <a-col span="24" :xl="16" v-else-if="formData.dateSelectShow=='Member'">
            <a-col span="24"  class="p-2">
                <BarChart :chart-data="chart_member" :options="configMember.options" />
            </a-col>
            <a-row span="24" class="p-2">
                <a-col span="24" :xl="8">
                    <DoughnutChart :chart-data="chart_member_count_percent" :options="configMemberNew.options" />
                </a-col>
                <a-col span="24" :xl="16">
                    <BarChart :chart-data="chart_member_count" :options="configMemberCount.options" />
                </a-col>
            </a-row>
        </a-col>
        <a-col span="24" :xl="8">
            <h3>บัญชีที่เปิดใช้งาน</h3>
            <a-row class="account-list">
                <a-col class="account center" span="6" :xl="7" v-for="v in bankActive" :style="{ background: `${v.bank_color}` }">
                    <a-image
                        :preview="false"
                        :width="48"
                        :src="v.bank_image"
                    />
                    <div class="my-1">
                        <span v-if="v.type=='deposit'">บัญชีฝากเงิน</span>
                        <span v-else-if="v.type=='withdraw'">บัญชีถอนเงิน</span>
                        <span v-if="v.type=='SingleAccount'">บัญชีเดียว</span>
                    </div>
                    <div class="my-1">
                        <a-row :align="'middle'" :justify="'center'">
                            <div class="mx-1">{{ v.balance?.toFixed(2) }}</div> 
                            <!-- <a-spin :indicator="indicator"/> -->
                        </a-row>
                    </div>
                    <div>
                        {{ v.book_number }}
                    </div>
                    <div>
                        {{ v.name }}
                    </div>
                </a-col>
            </a-row>
            <h3>ยอดเงินในธนาคารบัญชีฝาก</h3>
            <a-row :align="'middle'" :justify="'center'">
                <a-table 
                    :columns="columnsDeposit"
                    :data-source="deposit"
                    bordered
                    size="small"
                    :scroll="{ x: 500}"

                >
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key == 'bank_image'">
                            <a-image
                                :preview="false"
                                :width="36"
                                :src="record.bank_image"
                            />
                        </template>
                        <template v-if="column.key == 'amount'">
                            {{record.amount.toFixed(2)}}
                        </template>
                    </template>
                </a-table>
                <!-- <a-table :dataSource="deposit" :columns="columnsDeposit" :pagination="false" :scroll="{ x: 500 }"/> -->
            </a-row>
            <h3>ยอดเงินในธนาคารบัญชีถอน</h3>
            <a-row :align="'middle'" :justify="'center'">
                <a-table 
                    :columns="columnsWithdraw"
                    :data-source="withdraw"
                    bordered
                    size="small"
                    :scroll="{ x: 500}"

                >
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key == 'bank_image'">
                            <a-image
                                :preview="false"
                                :width="36"
                                :src="record.bank_image"
                            />
                        </template>
                        <template v-if="column.key == 'amount'">
                            {{record.amount.toFixed(2)}}
                        </template>
                    </template>
                </a-table>
            </a-row>
        </a-col>
    </a-row>
  </template>
  
  <script lang="ts" setup>
    import { getReportMainService } from '~/services/reportMainServies';
    import { LoadingOutlined } from '@ant-design/icons-vue';
    import { h } from 'vue';
    import { LineChart,BarChart,DoughnutChart  } from 'vue-chart-3';
    import { Chart, registerables } from 'chart.js';
    // import type { ChartData } from 'chart.js';
    import dayjs, { Dayjs } from 'dayjs';
    const report = ref<any>({});
    const members = ref<any>({});
    const balance = ref<any>({});
    const bankActive = ref<any>({});
    const deposit = ref<any[]>([]);
    const withdraw = ref<any[]>([]);
    const chartData = ref<{ labels: string[]; datasets: any[] }>({ labels: [], datasets: [] });
    const chartDataCount = ref<{ labels: string[]; datasets: any[] }>({ labels: [], datasets: [] });
    const chart_member = ref<{ labels: string[]; datasets: any[] }>({ labels: [], datasets: [] });
    const chart_member_count_percent = ref<{ labels: string[]; datasets: any[] }>({ labels: [], datasets: [] });
    const chart_member_count = ref<{ labels: string[]; datasets: any[] }>({ labels: [], datasets: [] });

    const columnsDeposit  = computed(() => [
        {
            title: 'ธนาคาร',
            dataIndex: 'bank_image',
            key: 'bank_image',
        },
        {
            title: 'เลขบัญชี',
            dataIndex: 'bank_system_no',
            key: 'bank_system_no',
        },
        {
            title: 'เงินฝากเข้า',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'โยกเงิน',
            dataIndex: 'tranfer',
            key: 'tranfer',
        },
    ]);

    const columnsWithdraw  = computed(() => [
        {
            title: 'ธนาคาร',
            dataIndex: 'bank_image',
            key: 'bank_image',
        },
        {
            title: 'เลขบัญชี',
            dataIndex: 'bank_system_no',
            key: 'bank_system_no',
        },
        {
            title: 'เงินถอนออก',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'โยกเงิน',
            dataIndex: 'tranfer',
            key: 'tranfer',
        },
    ]);
    
    const indicator = h(LoadingOutlined, {
    style: {
        fontSize: '10x',
    },
    spin: true,
    });

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
        dateSelectShow:ref<string>('Profit'),
    });

    const handleDateSelectChange = () => {
    const currentDate = dayjs();  // Use dayjs for consistency
    const day = String(currentDate.date()).padStart(2, '0');
    const year = currentDate.year();
    const month = String(currentDate.month() + 1).padStart(2, '0');

    if (formData.dateSelect === "Today") {
        formData.dateStart = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
        formData.dateEnd = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    } else if (formData.dateSelect === "Yesterday") {
        const yesterday = currentDate.subtract(1, 'day');
        formData.dateStart = yesterday.startOf('day');
        formData.dateEnd = yesterday.endOf('day');
    } else if (formData.dateSelect === "ThisMonth") {
        const firstDay = dayjs(`${year}-${month}-01`, 'YYYY-MM-DD');
        const lastDay = firstDay.endOf('month');
        formData.dateStart = firstDay.startOf('day');
        formData.dateEnd = lastDay.endOf('day');
    } else if (formData.dateSelect === "LastMonth") {
        const firstDay = currentDate.subtract(1, 'month').startOf('month');
        const lastDay = firstDay.endOf('month');
        formData.dateStart = firstDay.startOf('day');
        formData.dateEnd = lastDay.endOf('day');
    }

    formData.timeStart = dayjs().startOf('day'); // 00:00
    formData.timeEnd = dayjs().endOf('day');     // 23:59

    getReportMain();
  };

    Chart.register(...registerables);


    const config = {
        type: 'line',
        chartData,
        options: {
            responsive: true,
            plugins: {
            title: {
                display: true,
                text: 'กราฟเเสดงรายการ ฝาก,ถอน เเละกำไรขาดทุน',
            },
            },
            interaction: {
            intersect: false,
            },
            scales: {
            x: {
                display: true,
                title: {
                display: true,
                text: 'เวลา (ชั่วโมง)'
                },
            },
            y: {
                display: true,
                title: {
                display: true,
                text: 'ข้อมูล',
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
            },
        },
    };

    const configCount = {
        type: 'line',
        chartData,
        options: {
            responsive: true,
            plugins: {
            title: {
                display: true,
                text: 'กราฟเเสดงจำนวนรายการ ฝาก,ถอน',
            },
            },
            interaction: {
            intersect: false,
            },
            scales: {
            x: {
                display: true,
                title: {
                display: true,
                text: 'เวลา (ชั่วโมง)'
                },
            },
            y: {
                display: true,
                title: {
                display: true,
                text: 'ข้อมูล',
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
            },
        },
    };

    const configMember = {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'กราฟเเสดงจำนวนสมาชิก', // Title remains the same
                },
            },
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'เวลา (ชั่วโมง)' // X-axis label
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'ข้อมูล', // Y-axis label
                    },
                    suggestedMin: 0,
                    suggestedMax: 10, // Adjust this if needed based on your data
                },
            },
        },
    };

    const configMemberNew = {
        type: 'doughnut',
        data: chart_member_count_percent,
        options: {
            responsive: true,
            plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'กราฟเเสดงจำนวนสมาชิกต่อการตลาด (เปอร์เซ็น)'
            }
            }
        },
    };

    const configMemberCount = {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'กราฟเเสดงจำนวนสมาชิกต่อการตลาด', // Title remains the same
                },
            },
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'การตลาด' // X-axis label
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'ข้อมูล', // Y-axis label
                    },
                    suggestedMin: 0,
                    suggestedMax: 10, // Adjust this if needed based on your data
                },
            },
        },
    };
        
    
    const getReportMain = async() => {
        const data = await getReportMainService(formData);
        if (data.status === "success") {
            report.value = data.data.data;
            members.value = data.data.member;
            balance.value = data.data.balance;
            bankActive.value = data.data.bankActive;
            deposit.value = data.data.deposit;
            withdraw.value = data.data.withdraw;
            chartData.value = {
                labels: data.data.chart.labels,
                datasets: data.data.chart.datasets
                };
            chartDataCount.value = {
                labels: data.data.chart_count.labels,
                datasets: data.data.chart_count.datasets
                };
            chart_member.value = {
                labels: data.data.chart_member.labels,
                datasets: data.data.chart_member.datasets
                };
            chart_member_count_percent.value = {
                labels: data.data.chart_member_count_percent.labels,
                datasets: data.data.chart_member_count_percent.datasets
                };
            chart_member_count.value = {
                labels: data.data.chart_member_count.labels,
                datasets: data.data.chart_member_count.datasets
                };
        } else {
            console.log("error : "+ data.message);
        }
    }
    
    const search = () =>{
        getReportMain();
    }

    onMounted(() => {
        getReportMain();
    });
  </script>
  <style scoped>
    .card {
        border-radius: 5px;
        box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3); /* Subtle shadow for depth */
        padding: 10px;
        color: whitesmoke;
        margin: 0.5rem !important;
    }
    .account{
        border-radius: 5px;
        box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
        /* background: linear-gradient(135deg, #f44336, #e57373); */
        padding: 20px 10px;
        margin: 5px;
        color: whitesmoke;
    }

    .account-list {
        overflow-x: auto; 
        padding: 10px 0; 
        /* display: flex; */
        /* flex-wrap: nowrap; */
    }
  
    .deposit-background {
        background: linear-gradient(135deg, #4caf50, #81c784);
    }

    .withdraw-background {
        background: linear-gradient(135deg, #f44336, #e57373);
    }

    .members-background {
        background: linear-gradient(135deg, #2196f3, #64b5f6);
    }

    .bonus-background {
        background: linear-gradient(135deg, #9c27b0, #ba68c8);
    }
    .amount-background {
        background: linear-gradient(135deg, #ffb74d, #ff9800);
    }
    
    .label {
        font-size: 16px;
        font-weight: 500;
        color: whitesmoke; /* Darker color for contrast */
    }
    
    .amount {
        font-size: 24px;
        font-weight: bold;
        color: whitesmoke; /* Black color to stand out */
        margin: 8px 0; /* Spacing around the amount */
    }
    
    .transactions {
        font-size: 12px;
        color: whitesmoke; /* Lighter color for less emphasis */
    }
    
    .icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 10px;
    }
  </style>