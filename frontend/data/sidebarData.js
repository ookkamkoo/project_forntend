// data/sidebarData.js\
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';

const sidebarData = [
  { path: '/guide', name: 'คู่มือ', icon: MenuUnfoldOutlined, notify: 1 },
  { path: '/dashboard', name: 'หน้าเเรก', icon: MenuUnfoldOutlined, notify: 0 },
  {
    path: '#',
    name: 'ฝาก - ถอน',
    icon: MenuFoldOutlined,
    notify: 0,
    children: [
      { path: '/deposit', name: 'ฝาก', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/withdraw', name: 'ถอน', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/commission', name: 'คอมมิชชัน', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/deposit-withdraw', name: 'ฝาก - ถอน ย้อนหลัง', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/credit-mobile', name: 'เพิ่ม ลด เครดิตมือ', icon: MenuUnfoldOutlined, notify: 0 },
    ]
  },
  {
    path: '#',
    name: 'โยกเงิน',
    icon: MenuFoldOutlined,
    notify: 0,
    children: [
      { path: '/deposit', name: 'ประวัติการโยกเงิน', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/withdraw', name: 'ตั้งค่าโยกเงินออโต้', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/commission', name: 'สรุปโยกเงิน', icon: MenuUnfoldOutlined, notify: 0 },
    ]
  },
  { path: '/dashboard', name: 'โปรโมชั่น', icon: MenuUnfoldOutlined, notify: 0 },
  {
    path: '#',
    name: 'สมาชิก',
    icon: MenuFoldOutlined,
    notify: 0,
    children: [
      { path: '/deposit', name: 'ข้อมูลสมาชิก', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/withdraw', name: 'คืนยอดเสีย', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/commission', name: 'รายการคืนยอดเสีย', icon: MenuUnfoldOutlined, notify: 0 },
    ]
  },
  {
    path: '#',
    name: 'ประวัติการทำรายการ',
    icon: MenuFoldOutlined,
    notify: 0,
    children: [
      { path: '/deposit', name: 'ประวัติการฝาก', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/withdraw', name: 'ประวัติการถอน', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/commission', name: 'ประวัติการทำรายการลูกค้า', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/commission', name: 'ประวัติรายการเครดิตมือ', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/commission', name: 'ประวัติการใช้เหรียญ', icon: MenuUnfoldOutlined, notify: 0 },
    ]
  },
  {
    path: '#',
    name: 'ธนาคาร',
    icon: MenuFoldOutlined,
    notify: 0,
    children: [
      { path: '/deposit', name: 'iBanking (เช็คเงิน)', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/withdraw', name: 'Statement จากธนาคาร', icon: MenuUnfoldOutlined, notify: 0 },
    ]
  },
  {
    path: '#',
    name: 'ธนาคาร',
    icon: MenuFoldOutlined,
    notify: 0,
    children: [
      { path: '/deposit', name: 'สรุปยูส/ค่าคอมมิชชั่น', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/withdraw', name: 'สรุปยอด', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/withdraw', name: 'สรุปโบนัส', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/withdraw', name: 'สรุปภาพรวมย้อนหลัง', icon: MenuUnfoldOutlined, notify: 0 },
    ]
  },
  { path: '/dashboard', name: 'เเอดมิน', icon: MenuUnfoldOutlined, notify: 0 },
  { path: '/dashboard', name: 'จัดการพันธมิตร', icon: MenuUnfoldOutlined, notify: 0 },
  { path: '/dashboard', name: 'บัญชี', icon: MenuUnfoldOutlined, notify: 0 },
  {
    path: '#',
    name: 'ตั้งค่า',
    icon: MenuFoldOutlined,
    notify: 0,
    children: [
      { path: '/deposit', name: 'ตั้งค่าทั่วไป', icon: MenuUnfoldOutlined, notify: 0 },
      // { path: '/withdraw', name: 'ตั้งค่าหน้าลูกค้า' , icon:MenuUnfoldOutlined},
      // { path: '/withdraw', name: 'ตั้งค่าธีมเข้าสู่ระบบ' , icon:MenuUnfoldOutlined},
      { path: '/withdraw', name: 'ตั้งค่าระบบ', icon: MenuUnfoldOutlined, notify: 0 },
      { path: '/withdraw', name: 'ตั้งค่ายเกมส์', icon: MenuUnfoldOutlined, notify: 0 },
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
  { path: '/dashboard', name: 'โปรไฟล์', icon: MenuUnfoldOutlined,notify: 0 },
  { path: '/dashboard', name: 'Log', icon: MenuUnfoldOutlined,notify: 0 },
  { path: '/dashboard', name: 'บัญชีดำ', icon: MenuUnfoldOutlined,notify: 0 },
  { path: '/dashboard', name: 'ออกจากระบบ', icon: MenuUnfoldOutlined,notify: 0 },
];

export default sidebarData;