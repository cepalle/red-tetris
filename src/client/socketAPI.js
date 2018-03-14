import io from 'socket.io-client';
import {store} from "./store"
import {addPartsFlow} from "./action-creators"
import socketDefs from "../common/socket-definitions";
const socket = io.connect('http://localhost:4433');


// Responce for error handling
socket.on(socketDefs.PACKET_GENFLOW, ({pieces}) => {
  console.log("socket receive packetGenFlow");
  store.dispatch(addPartsFlow(pieces));
});

socket.on(socketDefs.CONNECTION_RESPONSE, () => {
  console.log("response con");
  socket.emit(socketDefs.JOIN_ROOM, {
    roomName: store.getState().roomName,
    playerName: store.getState().playerName
  });
});

socket.on(socketDefs.JOIN_ROOM_RESPONSE, (rep) => {
  console.log("joinRoomResponse receive", rep);
});

function genFlow() {
  console.log("socket emit genFlow");
  socket.emit(socketDefs.GENFLOW, {roomName: store.getState().roomName});
  //store.dispatch(addPartsFlow([0]))
}

export {genFlow};
