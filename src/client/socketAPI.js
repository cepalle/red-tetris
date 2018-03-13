import io from 'socket.io-client';

// handel subscription

const socket = io.connect('http://localhost:4433'); // REPLACE adresse

/*
function subscribeToId(cb) {
  socket.on('setId', cid => cb(cid));
}

function sendAction(act, id) {
  socket.emit("action", id, act);
}
*/
export {socket};
