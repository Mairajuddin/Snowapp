
import { io } from "socket.io-client";


const SOCKET_URL = "http://192.168.18.33:5000"; 

export const socket = io(SOCKET_URL, {
  transports: ["websocket"], 
  reconnection: true,
});
