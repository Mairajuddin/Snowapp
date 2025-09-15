
import { io } from "socket.io-client";
import { baseURL } from "../hooks/useRequest";


// const SOCKET_URL = "http://192.168.18.33:5000"; 
// const SOCKET_URL = "https://labubu2.4xbrokers.com"; 

//https://labubu2.4xbrokers.com

export const socket = io(baseURL, {
  transports: ["websocket"], 
  reconnection: true,
});
