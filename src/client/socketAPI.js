import io from 'socket.io-client';

const socket = io.connect('https://le-101.tk:443');

function subscribeToId(cb) {
  socket.on('setId', cid => cb(cid));
}

function sendAction(act, id) {
  socket.emit("action", id, act);
}
