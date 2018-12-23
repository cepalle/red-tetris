import './util/ArraysUtil';
import express from 'express';
import https from 'https';
import {Server} from 'http';
import * as fs from 'fs';
import {ENUM_SOCKET_DEF} from '@src/common/socket-definitions';
import {Socket} from 'socket.io';
import {RoomSocketHandler} from '@src/server/handlers/RoomSocketHandler';
import {GlobalSocketHandler} from '@src/server/handlers/GlobalSocketHandler';
import {TetrisSocketHandler} from '@src/server/handlers/TetrisSocketHandler';
import {socketMap} from '@src/server/data/SocketMap';
import {roomManager} from '@src/server/data/game/GameManager';

class App {

  handleClient(socket: Socket): void {

    const roomSocketHandler = new RoomSocketHandler(socket);
    const globalSocketHandler = new GlobalSocketHandler(socket);
    const tetrisSocketHandler = new TetrisSocketHandler(socket);

    socketMap.sockets.set(socket.id, socket);

    globalSocketHandler.connection();

    socket.on(ENUM_SOCKET_DEF.HOME, () => globalSocketHandler.home());
    socket.on(ENUM_SOCKET_DEF.JOIN_GAME, (d) => roomSocketHandler.joinGame(d));
    socket.on(ENUM_SOCKET_DEF.QUIT_GAME, (d) => roomSocketHandler.quitGame(d));
    socket.on(ENUM_SOCKET_DEF.START_PLAYING, (d) => roomSocketHandler.startPlaying(d));
    socket.on(ENUM_SOCKET_DEF.GENFLOW, (d) => tetrisSocketHandler.genFlow(d));
    socket.on(ENUM_SOCKET_DEF.TETRIS_PLACE_PIECE, (d) => tetrisSocketHandler.placePiece(d));
    socket.on(ENUM_SOCKET_DEF.PLAYER_LOOSE, (d) => tetrisSocketHandler.playerLoose(d));
    socket.on(ENUM_SOCKET_DEF.PLAYER_COMPLETE_LINE, (d) => tetrisSocketHandler.playerCompleteLine(d));

    socket.on(ENUM_SOCKET_DEF.DISCONNECT, () => {
      const room = roomManager.getGameById(socket.id);
      if (!room) {
        return;
      }

      const player = room.getPlayer(socket.id);
      if (!player) {
        return;
      }

      roomSocketHandler.quitGame({roomName: room.name, playerName: player.playerName});
    });
  }

  main(): void {
    const app = express();

    const server = (process.env.NODE_ENV && process.env.NODE_ENV === 'production') ?
      https.createServer(
        {
          key: fs.readFileSync('/home/ssl/privkey.pem'),
          cert: fs.readFileSync('/home/ssl/cert.pem'),
        }, app) :
      new Server(app);

    const io = require('socket.io')(server);

    io.on(ENUM_SOCKET_DEF.CONNECTION, (e: Socket) => this.handleClient(e));

    server.listen(4433, () => {
      console.log('Server on port : 4433');
    });
  }
}

new App().main();
