import {Socket} from 'socket.io';

class SocketMap {
  sockets: Map<string, Socket>;

  constructor() {
    this.sockets = new Map<string, Socket>();
  }
}

const socketMap = new SocketMap();

export {socketMap};
