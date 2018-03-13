require("./util/ArraysUtil");

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


const SocketHandler = require("./SocketHandler");
const socketHandlerList = [];


function handleClient(socket) {
  const socketHandler = new SocketHandler(socket);
  socketHandlerList.push(socketHandler);

  console.log(`New client with id : ${socket.id} !`);

  socket.on("createRoom", socketHandler.createRoom);
  socket.on("joinRoom", socketHandler.joinRoom);

  socket.on("disconnect", function () {
    socketHandlerList.removeObj(socketHandler);
    //TODO disconect action remove from room ...
  });
}

io.on("connection", (e) => handleClient(e));

http.listen(4433, function(){
  console.log('Server on port :' + 4433);
});

const  socket = require('socket.io-client')('http://localhost:4433');

socket.emit("cre")
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});
