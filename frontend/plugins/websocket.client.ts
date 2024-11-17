export default defineNuxtPlugin((nuxtApp) => {
  const socket = new WebSocket('ws://localhost:3001/ws/admin');

  socket.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  socket.onclose = () => {
    console.log("Disconnected from WebSocket server");
  };

  nuxtApp.provide('socket', socket);
});