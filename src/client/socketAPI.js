import io from 'socket.io-client';
import {store} from "./store"
import {add_parts_flow} from "./action-creators"

const socket = io.connect('http://localhost:4433');

socket.on('genFlowResponse', data => store.dispatch(add_parts_flow(data)));
socket.on('connectionReponse', () => socket.emit("joinRoom", {
  roomName: store.getState().room_name,
  playerName: store.getState().playerName
}));
socket.on('joinRoomResponse', /**/);

function gen_flow() {
  console.log("gen_flow");
  socket.emit("genFlow", store.getState().room_name);
  store.dispatch(add_parts_flow([0]))
}

export {gen_flow};
