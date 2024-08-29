// import { io, Socket } from 'socket.io-client';

// let socket: Socket | null = null; // Explicitly annotate the type of 'socket'

// export function connectWebSocket() {
//   if (process.client && !socket) {
//     socket = io('http://localhost:3002');

//     socket.on('connect', () => {
//       console.log('Connected to WebSocket server');
//     });

//     socket.on('disconnect', () => {
//       console.log('Disconnected from WebSocket server');
//       socket = null; // Reset socket when connection is closed
//     });

//     socket.on('message', (data: any) => { // Explicitly annotate the type of 'data'
//       console.log('Message from server:', data);
//       // Handle incoming messages here
//     });

//     socket.on('error', (error: any) => { // Explicitly annotate the type of 'error'
//       console.error('WebSocket error:', error);
//     });
//   }
// }

// export function sendMessage(message: any) { // Explicitly annotate the type of 'message'
//   if (socket && socket.connected) {
//     socket.emit('message', message);
//   } else {
//     console.error('WebSocket connection not open');
//   }
// }