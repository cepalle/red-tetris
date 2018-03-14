import io from 'socket.io-client';
import {store} from "./store"
import {add_parts_flow} from "./action-creators"

const socket = io.connect('http://localhost:4433');


// Responce for error handling
socket.on('packetGenFlow', ({pices}) => {
  console.log("socket receive ");
  store.dispatch(add_parts_flow(pices));
});

socket.on('connectionReponse', () => socket.emit("joinRoom", {
  roomName: store.getState().room_name,
  playerName: store.getState().playerName
}));

socket.on('joinRoomResponse', (rep) => {
  console.log("joinRoomResponse receive", rep);
});

function gen_flow() {
  console.log("socket emit gen_flow");
  socket.emit("genFlow", {roomName: store.getState().room_name});
  //store.dispatch(add_parts_flow([0]))
}

export {gen_flow};
