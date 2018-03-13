require("./util/ArraysUtil");

const server = require("net").createServer();
const io = require("socket.io")(server);
const SocketHandler = require("SocketHandler");
const RoomManager = require("RoomsManager");


function handleClient(socket) {
  const id = socket.id;

  socket.on("createRoom", function (info) {
    if (info.roomName && info.playerName) {

    }
    else
      socket.emit("createRoomResponse", {error: ""})
  });

  socket.on("disconnect", function () {

  });
}

io.on("connection", handleClient);
server.listen(8080);
