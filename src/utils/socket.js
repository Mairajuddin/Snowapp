
import { io } from "socket.io-client";


// const SOCKET_URL = "http://192.168.18.33:5000"; 
const SOCKET_URL = "https://labubu2.4xbrokers.com"; 

//https://labubu2.4xbrokers.com

export const socket = io(SOCKET_URL, {
  transports: ["websocket"], 
  reconnection: true,
});
