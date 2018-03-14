require("./util/ArraysUtil");

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const RoomSocketHandler = require("./handlers/RoomSocketHandler");
const GlobalSocketHandler = require("./handlers/GlobalSocketHandler");
const SocketMap = require("./data/SocketMap");
const socketDefs = require("../common/socket-definitions");

class App {

  handleClient(socket) {
    const roomHSocketHandler = new RoomSocketHandler(socket);
    const globalSocketHandler = new GlobalSocketHandler(socket);

    SocketMap.sockets.set(socket.id, socket);
    console.log(SocketMap.sockets);

    console.log("New connection with id ", socket.id);

    globalSocketHandler.connection();

    socket.on(socketDefs.JOIN_ROOM, (d) => roomHSocketHandler.joinRoom(d));
    socket.on(socketDefs.QUIT_ROOM, (d) => roomHSocketHandler.quitRoom(d));
    socket.on(socketDefs.GENFLOW, (d) => globalSocketHandler.genFlow(d));

    socket.on("disconnect", function () {
      // socketMap.delete(socket.id);
      //TODO disconect action remove from room ...
    });
  }

  main() {
    io.on("connection", (e) => this.handleClient(e));
    http.listen(4433, function () {
      console.log('Server on port :' + 4433);
    });
  }
}


new App().main();












//
// const socket = require('socket.io-client')('http://localhost:4433');
//
// socket.emit("joinRoom", {roomName: "hey", playerName: "Alexis"});
// socket.emit("joinRoom", {roomName: "hey", playerName: "Alexis2"});
//
// socket.on('createRoomResponse', function (a) {
//   console.log("Response1: " + JSON.stringify(a))
// });
// socket.on('joinRoomResponse', function (a) {
//   console.log("Response: " + JSON.stringify(a))
// });
// socket.on('event', function (data) {
// });
// socket.on('disconnect', function () {
// });
//
