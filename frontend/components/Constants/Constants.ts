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
                // {
                //     value: 2,
                //     label: 'เชื่อมออโต้',
                // }
            ],
                action:[
                    {value:1,name:'api',show:1,bankNo:1,pin:1,deviceId:1,keyID:0,UnP:0,ApiKey:0,SecretKey:0,ClientId:0,Merchant:0,status:1,api:1,sms:1},
                    // {value:2,name:'line-connect',show:1,bankNo:1,pin:0,deviceId:0,keyID:0,UnP:0}
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
                    {value:1,name:'website',show:1,bankNo:1,pin:0,deviceId:0,keyID:0,UnP:1,ApiKey:0,SecretKey:0,ClientId:0,Merchant:0,status:1,api:1,sms:0}
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
                    {value:1,name:'api',show:1,bankNo:0,pin:1,deviceId:1,keyID:1,UnP:0,ApiKey:0,SecretKey:0,ClientId:0,Merchant:0,status:1,api:1,sms:0}
                ]
            }
        ]
    },
    {
        value: 2,
        label: 'ถอนเงิน',
        labelEN: 'withdraw',
        bank:[
            // {
            //     value: 1,
            //     short: 'SCB',
            //     name: 'ธนาคารไทยพาณิชย์',
            //     image: 'https://cdn-fastplay.sgp1.cdn.digitaloceanspaces.com/banks/SCB.svg',
            //     bankConnect:[{
            //         value: 1,
            //         label: 'เชื่อมเอง',
            //     },
            //     // {
            //     //     value: 2,
            //     //     label: 'เชื่อมออโต้',
            //     // }
            //     ],
            //     action:[
            //         {value:1,name:'api',show:1,bankNo:1,pin:1,deviceId:1,keyID:0,UnP:0,status:1,api:1,sms:0},
            //         {value:2,name:'line-connect',show:0,bankNo:1,pin:0,deviceId:0,keyID:0,UnP:0,status:1,api:1,sms:0}
            //     ]
            // },
            {
                value: 1,
                short: 'FPM',
                name: 'Flash Payment',
                image: 'https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/banks/FPM.png',
                bankConnect:[{
                    value: 1,
                    label: 'เชื่อมเอง',
                }],
                action:[
                    {value:1,name:'api',show:1,bankNo:1,pin:0,deviceId:0,keyID:0,UnP:0,ApiKey:1,SecretKey:1,ClientId:1,Merchant:1,status:1,api:1,sms:0},
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
                    {value:1,name:'api',show:1,bankNo:1,pin:1,deviceId:1,keyID:0,UnP:0,ApiKey:0,SecretKey:0,ClientId:0,Merchant:0,status:1,api:1,sms:0},
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
                    {value:1,name:'api',show:1,bankNo:0,pin:1,deviceId:1,keyID:1,UnP:0,ApiKey:0,SecretKey:0,ClientId:0,Merchant:0,status:1,api:1,sms:0}
                ]
            }
        ]
    },
    {
        value: 3,
        label: 'บัญชีเดียว',
        labelEN: 'SingleAccount',
        bank:[
            // {
            //     value: 1,
            //     short: 'SCB',
            //     name: 'ธนาคารไทยพาณิชย์',
            //     image: 'https://cdn-fastplay.sgp1.cdn.digitaloceanspaces.com/banks/SCB.svg',
            //     bankConnect:[{
            //         value: 1,
            //         label: 'เชื่อมเอง',
            //     },
            //     {
            //         value: 2,
            //         label: 'เชื่อมออโต้',
            //     }],
            //     action:[
            //         {value:1,name:'api',show:1,bankNo:1,pin:1,deviceId:1,keyID:0,UnP:0,ApiKey:0,SecretKey:0,ClientId:0,Merchant:0,status:1,api:1,sms:1},
            //         // {value:2,name:'line-connect',show:0,bankNo:1,pin:0,deviceId:0,keyID:0,UnP:0}
            //     ]
            // },
            {
                value: 1,
                short: 'FPM',
                name: 'Flash Payment',
                image: 'https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/banks/FPM.png',
                bankConnect:[{
                    value: 1,
                    label: 'เชื่อมเอง',
                }],
                action:[
                    {value:1,name:'api',show:1,bankNo:1,pin:0,deviceId:0,keyID:0,UnP:0,ApiKey:1,SecretKey:1,ClientId:1,Merchant:1,status:1,api:1,sms:0},
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
                    {value:1,name:'api',show:1,bankNo:0,pin:1,deviceId:1,keyID:1,UnP:0,ApiKey:0,SecretKey:0,ClientId:0,Merchant:0,status:1,api:1,sms:0}
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
        label: 'SuperApi',
    },
];

const optionsLose = [
    {
        value: '1',
        label: 'ยอดเสีย (เงินฝาก)',
    },
    {
        value: '2',
        label: 'ยอดเสีย (เงินฝาก + โบนัส)',
    },
];

const optionsLoseTypeMember = [
    {
        value: '1',
        label: 'รับอัตโนมัติ',
    },
    {
        value: '2',
        label: 'ลูกค้าล็อกอินแล้วกดรับเอง',
    },
];

const optionsFee = [
    {
        value: 1,
        label: 'ปกติ',
    },
    {
        value: 2,
        label: 'กำหนดเอง',
    },
];

const optionsSystemLogin = [
    {
        value: 1,
        label: 'Google Authenticator',
    },
    {
        value: 2,
        label: 'Pin 6 หลัก',
    },
];

const creditCustom = [
    {
        value: 1,
        label: 'เพิ่มเครดิต',
    },
    {
        value: 2,
        label: 'ลดเครดิต',
    },
    {
        value: 3,
        label: 'ฝากเงินไม่เข้า',
    },
];


interface SettingPG {
    gameCode: string;
    username: string;
    isPlayerSetting: boolean;
    setting: {
      name: string;
      output: string;
      percent: any;
      option: {
        from: any;
        to: any;
      };
    }[];
    buyFeatureSetting: {
      name: string;
      output: string;
      percent: any;
      option: {
        from: any;
        to: any;
      };
    }[];
  }

const settingPG20:SettingPG  = {
    gameCode: "fortune-ox",
    username: "testuser",
    isPlayerSetting: true,
    setting: [
      {
        name: "normal-spin",
        output: "normal-spin",
        percent: 80,
        option: {
          from: 0,
          to: 0,
        },
      },
      {
        name: "less-bet",
        output: "less-bet",
        percent: 15.14,
        option: {
          from: 0,
          to: 1,
        },
      },
      {
        name: "more-bet",
        output: "more-bet",
        percent: 4.61,
        option: {
          from: 0,
          to: 20,
        },
      },
      {
        name: "freespin-less-bet",
        output: "freespin-less-bet",
        percent: 0.21,
        option: {
          from: 0,
          to: 0.5,
        },
      },
      {
        name: "freespin-more-bet",
        output: "freespin-more-bet",
        percent: 0.04,
        option: {
          from: 0,
          to: 100,
        },
      },
    ],
    buyFeatureSetting: [
      {
        name: "buy-feature-less-bet",
        output: "freespin-less-bet",
        percent: 90,
        option: {
          from: 0,
          to: 0.8,
        },
      },
      {
        name: "buy-feature-more-bet",
        output: "freespin-more-bet",
        percent: 10,
        option: {
          from: 0,
          to: 100,
        },
      },
    ],
  };
const settingPG40:SettingPG  = {
gameCode: "fortune-ox",
username: "testuser",
isPlayerSetting: true,
setting: [
    {
    name: "normal-spin",
    output: "normal-spin",
    percent: 60,
    option: {
        from: 0,
        to: 0,
    },
    },
    {
    name: "less-bet",
    output: "less-bet",
    percent: 30,
    option: {
        from: 0,
        to: 1,
    },
    },
    {
    name: "more-bet",
    output: "more-bet",
    percent: 9.5,
    option: {
        from: 0,
        to: 5,
    },
    },
    {
    name: "freespin-less-bet",
    output: "freespin-less-bet",
    percent: 0.4,
    option: {
        from: 0,
        to: 0.5,
    },
    },
    {
    name: "freespin-more-bet",
    output: "freespin-more-bet",
    percent: 0.1,
    option: {
        from: 1,
        to: 3,
    },
    },
],
buyFeatureSetting: [
    {
    name: "buy-feature-less-bet",
    output: "freespin-less-bet",
    percent: 80,
    option: {
        from: 0,
        to: 0.8,
    },
    },
    {
    name: "buy-feature-more-bet",
    output: "freespin-more-bet",
    percent: 20,
    option: {
        from: 1,
        to: 3,
    },
    },
],
};

const settingPG50:SettingPG  = {
    gameCode: "fortune-ox",
    username: "testuser",
    isPlayerSetting: true,
    setting: [
    {
        name: "normal-spin",
        output: "normal-spin",
        percent: 50,
        option: {
        from: 0,
        to: 0,
        },
    },
    {
        name: "less-bet",
        output: "less-bet",
        percent: 37.15,
        option: {
        from: 0,
        to: 1,
        },
    },
    {
        name: "more-bet",
        output: "more-bet",
        percent: 12.19,
        option: {
        from: 0,
        to: 20,
        },
    },
    {
        name: "freespin-less-bet",
        output: "freespin-less-bet",
        percent: 0.53,
        option: {
        from: 0,
        to: 0.5,
        },
    },
    {
        name: "freespin-more-bet",
        output: "freespin-more-bet",
        percent: 0.13,
        option: {
        from: 0,
        to: 100,
        },
    },
    ],
    buyFeatureSetting: [
    {
        name: "buy-feature-less-bet",
        output: "freespin-less-bet",
        percent: 75,
        option: {
        from: 0,
        to: 0.8,
        },
    },
    {
        name: "buy-feature-more-bet",
        output: "freespin-more-bet",
        percent: 25,
        option: {
        from: 0,
        to: 100,
        },
    },
    ],
};

const settingPG60:SettingPG  = {
    gameCode: "fortune-ox",
    username: "testuser",
    isPlayerSetting: true,
    setting: [
    {
        name: "normal-spin",
        output: "normal-spin",
        percent: 40,
        option: {
        from: 0,
        to: 0,
        },
    },
    {
        name: "less-bet",
        output: "less-bet",
        percent: 45.17,
        option: {
        from: 0,
        to: 1,
        },
    },
    {
        name: "more-bet",
        output: "more-bet",
        percent: 14.08,
        option: {
        from: 0,
        to: 20,
        },
    },
    {
        name: "freespin-less-bet",
        output: "freespin-less-bet",
        percent: 0.60,
        option: {
        from: 0,
        to: 0.5,
        },
    },
    {
        name: "freespin-more-bet",
        output: "freespin-more-bet",
        percent: 0.15,
        option: {
        from: 0,
        to: 80,
        },
    },
    ],
    buyFeatureSetting: [
    {
        name: "buy-feature-less-bet",
        output: "freespin-less-bet",
        percent: 70,
        option: {
        from: 0,
        to: 0.8,
        },
    },
    {
        name: "buy-feature-more-bet",
        output: "freespin-more-bet",
        percent: 30,
        option: {
        from: 0,
        to: 100,
        },
    },
    ],
};

const settingPG80:SettingPG  = {
    gameCode: "fortune-ox",
    username: "testuser",
    isPlayerSetting: true,
    setting: [
    {
        name: "normal-spin",
        output: "normal-spin",
        percent: 20,
        option: {
        from: 0,
        to: 0,
        },
    },
    {
        name: "less-bet",
        output: "less-bet",
        percent: 60,
        option: {
        from: 0,
        to: 1,
        },
    },
    {
        name: "more-bet",
        output: "more-bet",
        percent: 19.00,
        option: {
        from: 0,
        to: 20,
        },
    },
    {
        name: "freespin-less-bet",
        output: "freespin-less-bet",
        percent: 0.78,
        option: {
        from: 0,
        to: 0.5,
        },
    },
    {
        name: "freespin-more-bet",
        output: "freespin-more-bet",
        percent: 0.22,
        option: {
        from: 0,
        to: 50,
        },
    },
    ],
    buyFeatureSetting: [
    {
        name: "buy-feature-less-bet",
        output: "freespin-less-bet",
        percent: 60,
        option: {
        from: 0,
        to: 0.8,
        },
    },
    {
        name: "buy-feature-more-bet",
        output: "freespin-more-bet",
        percent: 40,
        option: {
        from: 0,
        to: 100,
        },
    },
    ],
};



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
    optionsLoseTypeMember,
    optionsFee,
    optionsSystemLogin,
    creditCustom,
    settingPG20,
    settingPG40,
    settingPG50,
    settingPG60,
    settingPG80,
}