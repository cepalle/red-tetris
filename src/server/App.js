import "./util/ArraysUtil";
import express from "express";
import RoomSocketHandler from "./handlers/RoomSocketHandler";
import GameManager from "./data/game/GameManager";
import GlobalSocketHandler from "./handlers/GlobalSocketHandler";
import TetrisSocketHandler from "./handlers/TetrisSocketHandler";
import SocketMap from "./data/SocketMap";
import socketDefs from "../common/socket-definitions";
import https from "https";
import {Server} from "http";
import * as fs from "fs";

class App {

  handleClient(socket) {

    const roomSocketHandler = new RoomSocketHandler(socket);
    const globalSocketHandler = new GlobalSocketHandler(socket);
    const tetrisSocketHandler = new TetrisSocketHandler(socket);

    SocketMap.sockets.set(socket.id, socket);

    globalSocketHandler.connection();

    socket.on(socketDefs.HOME,                  (d) => globalSocketHandler.home());
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
    const app = express();
    let server;

    if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
      server = https.createServer(
        {
          key: fs.readFileSync('/home/ssl/privkey.pem'),
          cert: fs.readFileSync('/home/ssl/cert.pem')
        }, app
      );
    }
    else
      server = Server(app);

    const io = require("socket.io")(server);
    io.on(socketDefs.CONNECTION, (e) => this.handleClient(e));
    server.listen(4433, function () {
      console.log('Server on port : 4433');
    });
  }
}


const app = new App().main();
