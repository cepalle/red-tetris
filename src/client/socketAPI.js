import io from 'socket.io-client';
import {store} from "./store"
import {add_parts_flow} from "./action-creators"

// handel subscription

const socket = io.connect('http://localhost:4433');

// socket.on('flow', data => store.dispatch(add_parts_flow(data)));

function gen_flow() {
  console.log("gen_flow");
  // socket.emit("flow", store.getState().room_name);
  store.dispatch(add_parts_flow([0]))
}

export {gen_flow};
