import io from 'socket.io-client';

const socket = io.connect('http://localhost:4433');

export {socket};
