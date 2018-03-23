import "./util/ArraysUtil";
import express from "express";
import {Server} from "http";
import RoomSocketHandler from "./handlers/RoomSocketHandler";
import GameManager from "./data/game/GameManager";
import GlobalSocketHandler from "./handlers/GlobalSocketHandler";
import TetrisSocketHandler from "./handlers/TetrisSocketHandler";
import SocketMap from "./data/SocketMap";
import socketDefs from "../common/socket-definitions";

const ex = express();
const http = Server(ex);
const io = require("socket.io")(http);


class App {


  handleClient(socket) {
    const roomSocketHandler = new RoomSocketHandler(socket);
    const globalSocketHandler = new GlobalSocketHandler(socket);
    const tetrisSocketHandler = new TetrisSocketHandler(socket);

    SocketMap.sockets.set(socket.id, socket);

    globalSocketHandler.connection();

    socket.on(socketDefs.JOIN_GAME,             (d) => roomSocketHandler.joinGame(d));
    socket.on(socketDefs.QUIT_GAME,             (d) => roomSocketHandler.quitGame(d));
    socket.on(socketDefs.START_PLAYING,         (d) => roomSocketHandler.startPlaying(d));
    socket.on(socketDefs.GENFLOW,               (d) => tetrisSocketHandler.genFlow(d));
    socket.on(socketDefs.TETRIS_PLACE_PIECE,    (d) => tetrisSocketHandler.placePiece(d));
    socket.on(socketDefs.PLAYER_LOOSE,          (d) => tetrisSocketHandler.playerLoose(d));
    socket.on(socketDefs.PLAYER_COMPLETE_LINE,  (d) => tetrisSocketHandler.playerCompleteLine(d));

    socket.on(socketDefs.DISCONNECT, () => {
      const room = GameManager.getGameById(socket.id);
      if (room) {
        const player = room.getPlayer(socket.id);
        roomSocketHandler.quitGame({roomName: room.name, playerName: player.playerName});
      }
    });
  }

  main() {
    io.on(socketDefs.CONNECTION, (e) => this.handleClient(e));
    http.listen(4433, function () {
      console.log(`Server on port : 4433`);
    });
  }
}
const app = new App();
app.main();

