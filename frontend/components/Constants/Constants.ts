const optionsType = [
    {
        value: '1',
        label: 'ทั้งหมด',
    },
    {
        value: '2',
        label: 'สมาชิกใหม่',
    },
    {
        value: '3',
        label: 'สมาชิกเก่า',
    }
];

const optionsListType = [
    {
        value: '1',
        label: 'ปกติ',
    },
    {
        value: '2',
        label: 'fix',
    },
    {
        value: '3',
        label: 'scale',
    }
];

const optionsMaxWithdrow = [
    {
        value: '1',
        label: 'จำนวนเงิน',
    },
    {
        value: '2',
        label: 'จำนวนเท่า ยอดฝาก',
    },
    {
        value: '3',
        label: 'จำนวนเท่า ยอดฝาก + โบนัส',
    },
];

const optionsTypeBonus = [
    {
        value: '1',
        label: 'เปอร์เซ็น',
    },
    {
        value: '2',
        label: 'จำนวนเงิน',
    }
];

const optionWeek = [
    { label: 'อาทิตย์', value: 'อา' },
    { label: 'จันทร์', value: 'จ' },
    { label: 'อังคาร', value: 'อ' },
    { label: 'พุธ', value: 'พ' },
    { label: 'พฤหัสบดี', value: 'พฤ' },
    { label: 'ศุกร์', value: 'ศ' },
    { label: 'เสาร์', value: 'ส' },

];

const optionDay = Array.from({ length: 31 }, (_, index) => ({ label: `${index + 1}`, value: `${index + 1}` }));

const optionsBonusWithdrow = [
    {
        value: '1',
        label: 'ถอนได้',
    },
    {
        value: '2',
        label: 'ไม่สามารถถอนได้',
    }
];

const optionsDayOpen = [
    {
        value: '1',
        label: 'ทุกวัน',
    },
    {
        value: '2',
        label: 'รายสัปดาห์',
    },
    {
        value: '3',
        label: 'รายวันที่',
    }
];

const optionsTimeOpen = [
    {
        value: '1',
        label: 'ตลอดเวลา',
    },
    {
        value: '2',
        label: 'กำหนดเอง',
    }
];

const optionsBankType = [
    {
        value: 1,
        label: 'ฝากเงิน',
        labelEN: 'deposit',
        bank:[
            {
                value: 1,
                short: 'SCB',
                name: 'ธนาคารไทยพาณิชย์',
                image: 'https://cdn-fastplay.sgp1.cdn.digitaloceanspaces.com/banks/SCB.svg',
                bankConnect:[{
                    value: 1,
                    label: 'เชื่อมเอง',
                },
                {
                    value: 2,
                    label: 'เชื่อมออโต้',
                }],
                action:[
                    {value:1,name:'api',show:1,bankNo:1,pin:1,deviceId:1,keyID:0,UnP:0},
                    {value:2,name:'line-connect',show:1,bankNo:1,pin:0,deviceId:0,keyID:0,UnP:0}
                ]
            },
            {
                value: 2,
                short: 'KBANK',
                name: 'ธนาคารกสิกรไทย',
                image: 'https://cdn-fastplay.sgp1.cdn.digitaloceanspaces.com/banks/KBANK.svg',
                bankConnect:[{
                    value: 1,
                    label: 'เชื่อมเอง',
                }],
                action:[
                    {value:1,name:'website',show:1,bankNo:1,pin:0,deviceId:0,keyID:0,UnP:1}
                ]
            },
            {
                value: 3,
                short: 'TRUE',
                name: 'ทรูมันนี่วอลเล็ท',
                image: 'https://cdn-fastplay.sgp1.cdn.digitaloceanspaces.com/banks/TRUEMONEY.png',
                bankConnect:[{
                    value: 1,
                    label: 'เชื่อมเอง',
                }],
                action:[
                    {value:1,name:'api',show:1,bankNo:0,pin:1,deviceId:1,keyID:1,UnP:0}
                ]
            }
        ]
    },
    {
        value: 2,
        label: 'ถอนเงิน',
        labelEN: 'withdraw',
        bank:[
            {
                value: 1,
                short: 'SCB',
                name: 'ธนาคารไทยพาณิชย์',
                image: 'https://cdn-fastplay.sgp1.cdn.digitaloceanspaces.com/banks/SCB.svg',
                bankConnect:[{
                    value: 1,
                    label: 'เชื่อมเอง',
                },
                {
                    value: 2,
                    label: 'เชื่อมออโต้',
                }],
                action:[
                    {value:1,name:'api',show:1,bankNo:1,pin:1,deviceId:1,keyID:0,UnP:0},
                    {value:2,name:'line-connect',show:0,bankNo:1,pin:0,deviceId:0,keyID:0,UnP:0}
                ]
            },
            {
                value: 2,
                short: 'GSB',
                name: 'ธนาคารออมสิน',
                image: 'https://cdn-fastplay.sgp1.cdn.digitaloceanspaces.com/banks/GSB.svg',
                bankConnect:[{
                    value: 1,
                    label: 'เชื่อมเอง',
                }],
                action:[
                    {value:1,name:'api',show:1,bankNo:1,pin:1,deviceId:1,keyID:0,UnP:0},
                ]
            },
            {
                value: 3,
                short: 'TRUE',
                name: 'ทรูมันนี่วอลเล็ท',
                image: 'https://cdn-fastplay.sgp1.cdn.digitaloceanspaces.com/banks/TRUEMONEY.png',
                bankConnect:[{
                    value: 1,
                    label: 'เชื่อมเอง',
                }],
                action:[
                    {value:1,name:'api',show:1,bankNo:0,pin:1,deviceId:1,keyID:1,UnP:0}
                ]
            }
        ]
    },
    {
        value: 3,
        label: 'บัญชีเดียว',
        labelEN: 'SingleAccount',
        bank:[
            {
                value: 1,
                short: 'SCB',
                name: 'ธนาคารไทยพาณิชย์',
                image: 'https://cdn-fastplay.sgp1.cdn.digitaloceanspaces.com/banks/SCB.svg',
                bankConnect:[{
                    value: 1,
                    label: 'เชื่อมเอง',
                },
                {
                    value: 2,
                    label: 'เชื่อมออโต้',
                }],
                action:[
                    {value:1,name:'api',show:1,bankNo:1,pin:1,deviceId:1,keyID:0,UnP:0},
                    {value:2,name:'line-connect',show:0,bankNo:1,pin:0,deviceId:0,keyID:0,UnP:0}
                ]
            },
            {
                value: 2,
                short: 'TRUE',
                name: 'ทรูมันนี่วอลเล็ท',
                image: 'https://cdn-fastplay.sgp1.cdn.digitaloceanspaces.com/banks/TRUEMONEY.png',
                bankConnect:[{
                    value: 1,
                    label: 'เชื่อมเอง',
                }],
                action:[
                    {value:1,name:'api',show:1,bankNo:0,pin:1,deviceId:1,keyID:1,UnP:0}
                ]
            }
        ]
    },
    {
        value: 4,
        label: 'บัญชีพักเงิน',
        labelEN: 'ParkingAccount',
        bank:[]
    }
];

const optionsBlacklist = [
    {
        value: 1,
        label: 'ยูสเซอร์เนม',
        name: 'username_agent',
    },
    {
        value: 2,
        label: 'เบอร์มือถือ',
        name: 'username',
    },
    {
        value: 3,
        label: 'ชื่อ',
        name: 'firstname',
    },
    {
        value: 4,
        label: 'นามสกุล',
        name: 'lastname',
    },
    {
        value: 5,
        label: 'เลขบัญชี',
        name: 'bank_no',
    },
];

const optionsProduct = [
    {
        value: 1,
        label: 'AMBKING',
    },
];

const optionsLose = [
    {
        value: 1,
        label: 'ยอดเสีย',
    },
    {
        value: 2,
        label: 'เทิร์การเล่น',
    },
];

const optionsLoseTypeMember = [
    {
        value: 1,
        label: 'รับอัตโนมัติ',
    },
    {
        value: 2,
        label: 'ลูกค้าล็อกอินแล้วกดรับเอง',
    },
];

export {optionsType,
    optionsListType,
    optionsMaxWithdrow,
    optionsTypeBonus,
    optionWeek,
    optionDay,
    optionsBonusWithdrow,
    optionsDayOpen,
    optionsTimeOpen,
    optionsBankType,
    optionsBlacklist,
    optionsProduct,
    optionsLose,
    optionsLoseTypeMember
}