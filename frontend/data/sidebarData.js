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
  HistoryOutlined

} from '@ant-design/icons-vue';

const sidebarData = [
  { path: '/guide', name: 'คู่มือ', icon: MenuUnfoldOutlined, notify: 1 },
  { path: '/dashboard', name: 'หน้าเเรก', icon: HomeOutlined, notify: 0 },
  {
    path: '#',
    name: 'ฝาก - ถอน',
    icon: DollarOutlined,
    notify: 0,
    children: [
      { path: '/deposit-withdraw/deposit', name: 'ฝาก', icon: DollarOutlined, notify: 0 },
      { path: '/deposit-withdraw/withdraw', name: 'ถอน', icon: DollarOutlined, notify: 0 },
      { path: '/deposit-withdraw/commission', name: 'เเนะนำเพื่อน', icon: DollarOutlined, notify: 0 },
      { path: '/deposit-withdraw/credit-custom', name: 'เเก้ไขเครดิต', icon: DollarOutlined, notify: 0 },
    ]
  },
  {
    path: '#',
    name: 'โยกเงิน',
    icon: SwapOutlined,
    notify: 0,
    children: [
      { path: '/tranfer/transfer-money-history', name: 'ประวัติการโยกเงิน', icon: SwapOutlined, notify: 0 },
      { path: '/tranfer/transfer-money-auto', name: 'ตั้งค่าโยกเงินออโต้', icon: SwapOutlined, notify: 0 },
      { path: '/tranfer/transfer-money-summary', name: 'สรุปโยกเงิน', icon: SwapOutlined, notify: 0 },
    ]
  },
  { path: '/promote', name: 'โปรโมชั่น', icon: CrownOutlined, notify: 0 },
  {
    path: '#',
    name: 'สมาชิก',
    icon: TeamOutlined,
    notify: 0,
    children: [
      { path: '/member/member', name: 'สมาชิก', icon: TeamOutlined, notify: 0 },
      { path: '/member/member-detail', name: 'เช็คข้อมูลสมาชิก', icon: TeamOutlined, notify: 0 },
      // { path: '/cashback', name: 'คืนยอดเสีย', icon: TeamOutlined, notify: 0 },
      { path: '/member/cashback-list', name: 'รายการคืนยอดเสีย', icon: TeamOutlined, notify: 0 },
    ]
  },
  {
    path: '#',
    name: 'ประวัติการทำรายการ',
    icon: HistoryOutlined,
    notify: 0,
    children: [
      { path: '/history/deposit-history', name: 'ประวัติการฝาก', icon: HistoryOutlined, notify: 0 },
      { path: '/history/withdraw-history', name: 'ประวัติการถอน', icon: HistoryOutlined, notify: 0 },
      { path: '/history/member-transaction-history', name: 'ประวัติการทำรายการลูกค้า', icon: HistoryOutlined, notify: 0 },
      // { path: '/history/commission1', name: 'ประวัติรายการเครดิตมือ', icon: HistoryOutlined, notify: 0 },
      // { path: '/history/commission2', name: 'ประวัติการใช้เหรียญ', icon: HistoryOutlined, notify: 0 },
    ]
  },
  {
    path: '#',
    name: 'ธนาคาร',
    icon: WalletOutlined,
    notify: 0,
    children: [
      { path: '/bank/bank-list', name: 'iBanking (เช็คเงิน)', icon: WalletOutlined, notify: 0 },
      { path: '/bank/bank-statement', name: 'Statement จากธนาคาร', icon: WalletOutlined, notify: 0 },
    ]
  },
  {
    path: '#',
    name: 'รายงาน',
    icon: FileOutlined,
    notify: 0,
    children: [
      { path: '/report/member-sumary', name: 'สรุปยูส/ค่าคอมมิชชั่น', icon: FileOutlined, notify: 0 },
      { path: '/report/sumary', name: 'สรุปยอด', icon: FileOutlined, notify: 0 },
      { path: '/report/bonus-sumary', name: 'สรุปโบนัส', icon: FileOutlined, notify: 0 },
      { path: '/report/past-dashboard', name: 'สรุปภาพรวมย้อนหลัง', icon: FileOutlined, notify: 0 },
    ]
  },
  { path: '/admin', name: 'เเอดมิน', icon: AndroidOutlined, notify: 0 },
  { path: '/alliance', name: 'จัดการพันธมิตร', icon: UsergroupAddOutlined, notify: 0 },
  { path: '/dashboard', name: 'บัญชี', icon: CreditCardOutlined, notify: 0 },
  {
    path: '#',
    name: 'ตั้งค่า',
    icon: SettingOutlined,
    notify: 0,
    children: [
      { path: '/deposit', name: 'ตั้งค่าทั่วไป', icon: SettingOutlined, notify: 0 },
      // { path: '/withdraw', name: 'ตั้งค่าหน้าลูกค้า' , icon:MenuUnfoldOutlined},
      // { path: '/withdraw', name: 'ตั้งค่าธีมเข้าสู่ระบบ' , icon:MenuUnfoldOutlined},
      { path: '/withdraw', name: 'ตั้งค่าระบบ', icon: SettingOutlined, notify: 0 },
      { path: '/withdraw', name: 'ตั้งค่ายเกมส์', icon: SettingOutlined, notify: 0 },
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
  { path: '/dashboard', name: 'โปรไฟล์', icon: UserOutlined,notify: 0 },
  { path: '/dashboard', name: 'Log', icon: MenuUnfoldOutlined,notify: 0 },
  { path: '/dashboard', name: 'บัญชีดำ', icon: LockOutlined,notify: 0 },
  { path: '/dashboard', name: 'ออกจากระบบ', icon: LogoutOutlined,notify: 0 },
];

export default sidebarData;