import './util/ArraysUtil';
import express from 'express';
import https from 'https';
import {Server} from 'http';
import * as fs from 'fs';
import {Socket} from 'socket.io';
import {
  ENUM_SOCKET_EVENT_SERVER, IEventPlacePiece,
  IEventSetGameOption,
  IEventSetRoomPlayerName,
  IEventStartGame,
} from '@src/common/socketEventServer';
import {RoomsManager} from '@src/server/RoomsManager';

class App {

  roomsManager = new RoomsManager();

  handleClient(socket: Socket): void {
    socket.on(ENUM_SOCKET_EVENT_SERVER.SET_ROOM_PLAYER_NAME, (arg: IEventSetRoomPlayerName) => {
      this.roomsManager.setRoomPlayerName(socket, arg);
    });

    socket.on(ENUM_SOCKET_EVENT_SERVER.SET_GAME_OPTION, (arg: IEventSetGameOption) => {
      this.roomsManager.updateOptionGame(socket, arg);
    });

    socket.on(ENUM_SOCKET_EVENT_SERVER.START_GAME, (arg: IEventStartGame) => {
      this.roomsManager.startGame(socket, arg);
    });

    socket.on(ENUM_SOCKET_EVENT_SERVER.PLACE_PIECE, (arg: IEventPlacePiece) => {
      this.roomsManager.placePiece(socket, arg);
    });

    socket.on('disconnect', () => {
      this.roomsManager.delSocket(socket);
      socket.removeAllListeners();
      socket.disconnect(true);
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

    io.on('connection', (s: Socket) => this.handleClient(s));

    server.listen(4433, () => {
      console.log('Server on port : 4433');
    });
  }
}

new App().main();
