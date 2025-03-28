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
  SoundOutlined,
  BellOutlined

} from '@ant-design/icons-vue';
import { notifyStore } from '~/store/index';
const notify = notifyStore();
console.log(notify.notify.withdraw);
console.log(notify.notify.deposit);
console.log("aaaaa");
console.log(notify.notify.withdraw + notify.notify.deposit);

const sidebarData = [
  { path: '/guide', name: '1. คู่มือ', icon: MenuUnfoldOutlined, notify: 1 },
  { path: '/dashboard', name: '2. หน้าเเรก', icon: HomeOutlined, notify: 0 },
  {
    path: '#',
    name: '3. ฝาก-ถอน',
    icon: DollarOutlined,
    notify: (Number(notify.notify.withdraw) || 0) + (Number(notify.notify.deposit) || 0),
    children: [
      { path: '/deposit-withdraw/deposit', name: '3.1. ฝาก', icon: DollarOutlined, notify: notify.notify.deposit },
      { path: '/deposit-withdraw/withdraw', name: '3.2. ถอน', icon: DollarOutlined, notify: notify.notify.withdraw },
      // { path: '/deposit-withdraw/commission', name: 'เเนะนำเพื่อน', icon: DollarOutlined, notify: 0 },
      { path: '/deposit-withdraw/credit-custom', name: '3.3. เเก้ไขเครดิต', icon: DollarOutlined, notify: 0 },
    ]
  },
  // {
  //   path: '#',
  //   name: '4. โยกเงิน',
  //   icon: SwapOutlined,
  //   notify: 0,
  //   children: [
  //     { path: '/tranfer/transfer-money-history', name: '4.1. ประวัติการโยกเงิน', icon: SwapOutlined, notify: 0 },
  //     { path: '/tranfer/transfer-money-auto', name: '4.2. ตั้งค่าโยกเงินออโต้', icon: SwapOutlined, notify: 0 },
  //     { path: '/tranfer/transfer-money-summary', name: '4.3. สรุปโยกเงิน', icon: SwapOutlined, notify: 0 },
  //   ]
  // },
  {
    path: '#',
    name: '4. โบนัส',
    icon: BellOutlined,
    notify: 0,
    children: [
      { path: '/recommend', name: '4.1. เเนะนำเพื่อน', icon: BellOutlined, notify: 0 },
      { path: '/member/cashback-list', name: '4.3. ยอดเสีย', icon: BellOutlined, notify: 0 },
    ]
  },
  { path: '/promote', name: '5. โปรโมชั่น', icon: CrownOutlined, notify: 0 },
  {
    path: '#',
    name: '6. สมาชิก',
    icon: TeamOutlined,
    notify: 0,
    children: [
      { path: '/member/member', name: '6.1. สมาชิก', icon: TeamOutlined, notify: 0 },
      { path: '/member/member-online', name: '6.2. สมาชิกออนไลน์', icon: TeamOutlined, notify: 0 },
      { path: '/member/member-detail', name: '6.3. เช็คข้อมูลสมาชิก', icon: TeamOutlined, notify: 0 },
      // { path: '/cashback', name: 'คืนยอดเสีย', icon: TeamOutlined, notify: 0 },
      // { path: '/member/cashback-list', name: '6.3. รายการคืนยอดเสีย', icon: TeamOutlined, notify: 0 },
    ]
  },
  {
    path: '#',
    name: '7. ประวัติการทำรายการ',
    icon: HistoryOutlined,
    notify: 0,
    children: [
      { path: '/history/deposit-history', name: '7.1. ประวัติการฝาก', icon: HistoryOutlined, notify: 0 },
      { path: '/history/withdraw-history', name: '7.2. ประวัติการถอน', icon: HistoryOutlined, notify: 0 },
      { path: '/history/member-credit-history', name: '7.3. ประวิติรายการเครดิตลูกค้า', icon: HistoryOutlined, notify: 0 },
      { path: '/history/member-transaction-history', name: '7.4. ประวัติการทำรายการลูกค้า', icon: HistoryOutlined, notify: 0 },
      { path: '/history/report-game', name: '7.5. ประวัติการเล่นเกมส์', icon: HistoryOutlined, notify: 0 },
      { path: '/history/report-minigame', name: '7.5. ประวัติการเล่นมินิเกมส์', icon: HistoryOutlined, notify: 0 },
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
  { path: '#', name: '8. บัญชีธนาคาร', icon: CreditCardOutlined, notify: 0,
    children: [
      { path: '/bank/bank-list', name: '8.1. ตั้งค่าธนาคาร', icon: CreditCardOutlined, notify: 0 },
      { path: '/bank/bank-statement', name: '8.2. รายการธนาคาร', icon: WalletOutlined, notify: 0 },
      { path: '/bank/bank-summary', name: '8.3. สรุปรายการธนาคาร', icon: WalletOutlined, notify: 0 },
    ]
  },
  {
    path: '#',
    name: '9. รายงานสรุป',
    icon: FileOutlined,
    notify: 0,
    children: [
      // { path: '/report/member-summary', name: '9.1. สรุปยูส/ค่าคอมมิชชั่น', icon: FileOutlined, notify: 0 },
      { path: '/report/summary', name: '9.1. สรุปยอด', icon: FileOutlined, notify: 0 },
      { path: '/report/promotion-summary', name: '9.2. สรุปโปรโมชั่น', icon: FileOutlined, notify: 0 },
      { path: '/report/game', name: '9.3. สรุปการเล่นเกมส์', icon: FileOutlined, notify: 0 },
      { path: '/report/mini-game', name: '9.4. สรุปมินิเกมส์', icon: FileOutlined, notify: 0 },
      { path: '/report/bonus', name: '9.5. สรุปโบนัส', icon: FileOutlined, notify: 0 },
      { path: '/report/past-dashboard', name: '9.6. สรุปภาพรวม', icon: FileOutlined, notify: 0 },
    ]
  },
  { path: '#', name: '10. พนักงาน', icon: AndroidOutlined, notify: 0,
    children: [
      { path: '/admin', name: '10.1. พนักงาน', icon: AndroidOutlined, notify: 0 },
      { path: '/admin/report', name: '10.1. รายงานพนักงาน', icon: AndroidOutlined, notify: 0 },
    ]
  },
  // { path: '/admin', name: '11. พนักงาน', icon: AndroidOutlined, notify: 0 },
  // { path: '/news', name: '12 เเจ้งข่าวสาร', icon: SoundOutlined, notify: 0 },
  { path: '#', name: '11 เเจ้งเตือนข่าวสาร', icon: CreditCardOutlined, notify: 0,
    children: [
      { path: '/notify/news', name: '11.1. เเจ้งข่าวสาร', icon: CreditCardOutlined, notify: 0 },
      { path: '/notify/notify', name: '11.1. ประกาศ', icon: CreditCardOutlined, notify: 0 },
    ]
  },
  { path: '/alliance', name: '12. จัดการพันธมิตร', icon: UsergroupAddOutlined, notify: 0 },
  // { path: '/dashboard', name: 'บัญชี', icon: CreditCardOutlined, notify: 0 },
  {
    path: '#',
    name: '13. ตั้งค่า',
    icon: SettingOutlined,
    notify: 0,
    children: [
      // { path: '/setting/member', name: 'ตั้งค่าลูกค้า', icon: SettingOutlined, notify: 0 },
      { path: '/setting/system', name: '13.1. ตั้งค่าระบบ', icon: SettingOutlined, notify: 0 },
      { path: '/setting/mini-game', name: '13.2. ตั้งค่ามินิเกมส์', icon: SettingOutlined, notify: 0 },
      { path: '/setting/game-provider', name: '13.3. ตั้งค่ายเกมส์', icon: SettingOutlined, notify: 0 },
      { path: '/setting/play', name: '13.4. ตั้งหน้าบ้าน', icon: SettingOutlined, notify: 0 },
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
  { path: '/profile', name: '14. ข้อมูลส่วนตัว', icon: UserOutlined,notify: 0 },
  { path: '/log', name: '15. Log', icon: MenuUnfoldOutlined,notify: 0 },
  { path: '/blacklist', name: '16. บัญชีดำ', icon: LockOutlined,notify: 0 },
];

export default sidebarData;