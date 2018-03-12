require("./util/ArraysUtil");

const server = require("net").createServer();
const io = require("socket.io")(server);



/// createRoom    = {roomName, playerName}
/// joinRoom      = {roomName, playerName}
/// quitRoom      = {roomName, playerName}
/// startPlaying  = {roomName, playerName}

function handleClient(socket) {
  const id = socket.id;

  socket.on("disconnect", function () {

  });
}

io.on("connection", handleClient);

server.listen(8080);
