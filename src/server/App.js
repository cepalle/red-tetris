require("./util/ArraysUtil");

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const RoomSocketHandler = require("./handlers/RoomSocketHandler");
const GlobalSocketHandler = require("./handlers/GlobalSocketHandler");
const socketMap = new Map();

class App {

  handleClient(socket) {
    const roomHSocketHandler = new RoomSocketHandler(socket);
    const globalSocketHandler = new GlobalSocketHandler(socket);
    socketMap.set(socket.id, socket);

    socket.on("joinRoom", (d) => roomHSocketHandler.joinRoom(d));
    socket.on("quitRoom", (d) => roomHSocketHandler.quitRoom(d));
    socket.on("connection", (d) => globalSocketHandler.connection());

    socket.on("disconnect", function () {
      socketMap.delete(socket.id);
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













const socket = require('socket.io-client')('http://localhost:4433');

socket.emit("joinRoom", {roomName: "hey", playerName: "Alexis"});
socket.emit("joinRoom", {roomName: "hey", playerName: "Alexis2"});

socket.on('createRoomResponse', function (a) {
  console.log("Response: " + JSON.stringify(a))
});
socket.on('joinRoomResponse', function (a) {
  console.log("Response: " + JSON.stringify(a))
});
socket.on('event', function (data) {
});
socket.on('disconnect', function () {
});

module.exports = socketMap;
