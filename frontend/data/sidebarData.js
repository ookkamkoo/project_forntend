// data/sidebarData.js\
import {
  MenuUnfoldOutlined,
  HomeOutlined,
  TeamOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  LockOutlined,
  UsergroupAddOutlined,
  WalletOutlined,
  FileOutlined,
  CrownOutlined,
  DollarOutlined,
  CreditCardOutlined,
  SwapOutlined,
  AndroidOutlined,
  HistoryOutlined,
  SoundOutlined

} from '@ant-design/icons-vue';

const sidebarData = [
  { path: '/guide', name: '1. คู่มือ', icon: MenuUnfoldOutlined, notify: 1 },
  { path: '/dashboard', name: '2. หน้าเเรก', icon: HomeOutlined, notify: 0 },
  {
    path: '#',
    name: '3. ฝาก-ถอน',
    icon: DollarOutlined,
    notify: 3,
    children: [
      { path: '/deposit-withdraw/deposit', name: '3.1. ฝาก', icon: DollarOutlined, notify: 1 },
      { path: '/deposit-withdraw/withdraw', name: '3.2. ถอน', icon: DollarOutlined, notify: 2 },
      // { path: '/deposit-withdraw/commission', name: 'เเนะนำเพื่อน', icon: DollarOutlined, notify: 0 },
      { path: '/deposit-withdraw/credit-custom', name: '3.3. เเก้ไขเครดิต', icon: DollarOutlined, notify: 0 },
    ]
  },
  {
    path: '#',
    name: '4. โยกเงิน',
    icon: SwapOutlined,
    notify: 0,
    children: [
      { path: '/tranfer/transfer-money-history', name: '4.1. ประวัติการโยกเงิน', icon: SwapOutlined, notify: 0 },
      { path: '/tranfer/transfer-money-auto', name: '4.2. ตั้งค่าโยกเงินออโต้', icon: SwapOutlined, notify: 0 },
      { path: '/tranfer/transfer-money-summary', name: '4.3. สรุปโยกเงิน', icon: SwapOutlined, notify: 0 },
    ]
  },
  { path: '/recommend', name: '4.4. เเนะนำเพื่อน', icon: DollarOutlined, notify: 0 },
  { path: '/promote', name: '4.5. โปรโมชั่น', icon: CrownOutlined, notify: 0 },
  {
    path: '#',
    name: '5. สมาชิก',
    icon: TeamOutlined,
    notify: 0,
    children: [
      { path: '/member/member', name: '5.1. สมาชิก', icon: TeamOutlined, notify: 0 },
      { path: '/member/member-detail', name: '5.2. เช็คข้อมูลสมาชิก', icon: TeamOutlined, notify: 0 },
      // { path: '/cashback', name: 'คืนยอดเสีย', icon: TeamOutlined, notify: 0 },
      { path: '/member/cashback-list', name: '5.3. รายการคืนยอดเสีย', icon: TeamOutlined, notify: 0 },
    ]
  },
  {
    path: '#',
    name: '6. ประวัติการทำรายการ',
    icon: HistoryOutlined,
    notify: 0,
    children: [
      { path: '/history/deposit-history', name: '6.1. ประวัติการฝาก', icon: HistoryOutlined, notify: 0 },
      { path: '/history/withdraw-history', name: '6.2. ประวัติการถอน', icon: HistoryOutlined, notify: 0 },
      { path: '/history/member-credit-history', name: '6.3. ประวิติรายการเครดิตลูกค้า', icon: HistoryOutlined, notify: 0 },
      { path: '/history/member-transaction-history', name: '6.4. ประวัติการทำรายการลูกค้า', icon: HistoryOutlined, notify: 0 },
      { path: '/history/report-game', name: '6.5. ประวัติการเล่นเกมส์', icon: HistoryOutlined, notify: 0 },
      // { path: '/history/commission1', name: 'ประวัติรายการเครดิตมือ', icon: HistoryOutlined, notify: 0 },
      // { path: '/history/commission2', name: 'ประวัติการใช้เหรียญ', icon: HistoryOutlined, notify: 0 },
    ]
  },
  // {
  //   path: '#',
  //   name: 'ธนาคาร',
  //   icon: CreditCardOutlined,
  //   notify: 0,
  //   children: [
  //     { path: '/bank/bank-list', name: 'บัญชี', icon: CreditCardOutlined, notify: 0 },
  //     // { path: '/bank/bank-statement', name: 'Statement จากธนาคาร', icon: WalletOutlined, notify: 0 },
  //   ]
  // },
  { path: '/bank/bank-list', name: '7. บัญชี', icon: CreditCardOutlined, notify: 0 },
  {
    path: '#',
    name: '8. รายงาน',
    icon: FileOutlined,
    notify: 0,
    children: [
      { path: '/report/member-summary', name: '8.1. สรุปยูส/ค่าคอมมิชชั่น', icon: FileOutlined, notify: 0 },
      { path: '/report/summary', name: '8.2. สรุปยอด', icon: FileOutlined, notify: 0 },
      { path: '/report/bonus-summary', name: '8.3. สรุปโบนัส', icon: FileOutlined, notify: 0 },
      { path: '/report/game', name: '8.4. สรุปการเล่นเกมส์', icon: FileOutlined, notify: 0 },
      { path: '/report/past-dashboard', name: '8.5. สรุปภาพรวมย้อนหลัง', icon: FileOutlined, notify: 0 },
    ]
  },
  { path: '/admin', name: '9. พนักงาน', icon: AndroidOutlined, notify: 0 },
  { path: '/news', name: '10 เเจ้งข่าวสาร', icon: SoundOutlined, notify: 0 },
  { path: '/alliance', name: '11. จัดการพันธมิตร', icon: UsergroupAddOutlined, notify: 0 },
  // { path: '/dashboard', name: 'บัญชี', icon: CreditCardOutlined, notify: 0 },
  {
    path: '#',
    name: '12. ตั้งค่า',
    icon: SettingOutlined,
    notify: 0,
    children: [
      // { path: '/setting/member', name: 'ตั้งค่าลูกค้า', icon: SettingOutlined, notify: 0 },
      { path: '/setting/system', name: '12.1. ตั้งค่าระบบ', icon: SettingOutlined, notify: 0 },
      { path: '/setting/game-provider', name: '12.2. ตั้งค่ายเกมส์', icon: SettingOutlined, notify: 0 },
    ]
  },
  // { 
  //   path: '#', 
  //   name: 'ตั้งค่ามินิเกมส์',
  //   icon: MenuFoldOutlined,
  //   notify: 0,
  //   children: [
  //       { path: '/deposit', name: 'ตั้งค่ากงล้อ' , icon:MenuUnfoldOutlined},
  //     ]
  // },
  { path: '/profile', name: '13. ข้อมูลส่วนตัว', icon: UserOutlined,notify: 0 },
  { path: '/log', name: '14. Log', icon: MenuUnfoldOutlined,notify: 0 },
  { path: '/blacklist', name: '15. บัญชีดำ', icon: LockOutlined,notify: 0 },
];

export default sidebarData;