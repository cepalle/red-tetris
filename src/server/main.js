require("./util/ArraysUtil");

const server = require("net").createServer();
const io = require("socket.io")(server);
const SocketHandler = require("./SocketHandler");

const socketHandlerList = [];


function handleClient(socket) {
  //const socketHandler = new SocketHandler(socket);
  //socketHandlerList.push(socketHandler);

  console.log(`New client with id : ${socket.id} !`);
/*
  socket.on("createRoom", socketHandler.createRoom);
  socket.on("joinRoom", socketHandler.joinRoom);

  socket.on("disconnect", function () {
    socketHandlerList.removeObj(socketHandler);
    //TODO disconect action remove from room ...
  });
*/
}

io.on("connection", (e) => handleClient(e));
server.listen(4433);
