require("./util/ArraysUtil");

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const RoomSocketHandler = require("./handlers/RoomSocketHandler");
const GlobalSocketHandler = require("./handlers/GlobalSocketHandler");
const TetrisSocketHandler = require("./handlers/TetrisSocketHandler");
const SocketMap = require("./data/SocketMap");
const socketDefs = require("../common/socket-definitions");
const RoomManager = require("./data/room/RoomsManager");

class App {

  handleClient(socket) {

    const roomSocketHandler = new RoomSocketHandler(socket);
    const globalSocketHandler = new GlobalSocketHandler(socket);
    const tetrisSocketHandler = new TetrisSocketHandler(socket);

    SocketMap.sockets.set(socket.id, socket);

    globalSocketHandler.connection();

    socket.on(socketDefs.JOIN_ROOM,             (d) => roomSocketHandler.joinRoom(d));
    socket.on(socketDefs.QUIT_ROOM,             (d) => roomSocketHandler.quitRoom(d));
    socket.on(socketDefs.START_PLAYING,         (d) => roomSocketHandler.startPlaying(d));
    socket.on(socketDefs.GENFLOW,               (d) => tetrisSocketHandler.genFlow(d));
    socket.on(socketDefs.TETRIS_PLACE_PIECE,    (d) => tetrisSocketHandler.placePiece(d));
    socket.on(socketDefs.PLAYER_LOOSE,          (d) => tetrisSocketHandler.playerLoose(d));
    socket.on(socketDefs.PLAYER_COMPLETE_LINE,  (d) => tetrisSocketHandler.playerCompleteLine(d));

    socket.on(socketDefs.DISCONNECT, () => {
      const room = RoomManager.getRoomById(socket.id);
      if (room) {
        const user = room.getUser(socket.id);
        roomSocketHandler.quitRoom({roomName: room.name, playerName: user.getUsername()});
      }
    });
  }

  main() {
    io.on(socketDefs.CONNECTION, (e) => this.handleClient(e));
    http.listen(4433, function () {
      console.log('Server on port :' + 4433);
    });
  }
}


new App().main();
