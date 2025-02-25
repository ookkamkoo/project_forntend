import { ref } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  // กำหนด type ให้ socket เป็น WebSocket | null
  const socket = ref<WebSocket | null>(null);

  function createWebSocket(): WebSocket {
    const ws = new WebSocket(`wss://api.cooper89.com/ws/admin`);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
      // คุณอาจส่งข้อมูลนี้ไป update reactive state ที่ component ใช้แสดงผล
    };

    return ws;
  }

  // เริ่มต้นการเชื่อมต่อ WebSocket ครั้งแรก
  socket.value = createWebSocket();

  // Provide ค่า socket เป็น reactive reference เพียงครั้งเดียว
  nuxtApp.provide('socket', socket);

  // ตรวจสอบสถานะ WebSocket ทุก 10 วินาที แล้วอัปเดต socket.value เมื่อ reconnect
  setInterval(() => {
    console.log(socket.value);
    console.log(socket.value?.readyState);
    console.log(socket.value?.readyState);
    if (
      !socket.value ||
      (socket.value.readyState !== WebSocket.OPEN &&
        socket.value.readyState !== WebSocket.CONNECTING)
    ) {
      console.log("WebSocket not connected, reconnecting...");
      socket.value = createWebSocket();
    }
  }, 10000);
});
