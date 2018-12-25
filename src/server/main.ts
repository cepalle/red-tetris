import './util/ArraysUtil';
import * as express from 'express';
import * as https from 'https';
import {Server} from 'http';
import * as fs from 'fs';
import {Socket} from 'socket.io';
import {
  ENUM_SOCKET_EVENT_SERVER, IEventPlacePiece,
  IEventSetGameOption,
  IEventSetRoomPlayerName,
  IEventStartGame,
} from '@src/common/socketEventServer';
import {RoomsManager} from './RoomsManager';
import {ADD_PLAYER, DEL_PLAYER, PLACE_PIECE, START_GAME, UPDATE_OPTION_GAME} from '@src/server/RoomManager';

class App {

  roomsManager = new RoomsManager();

  handleClient(socket: Socket): void {
    socket.on(ENUM_SOCKET_EVENT_SERVER.SET_ROOM_PLAYER_NAME, (arg: IEventSetRoomPlayerName) => {
      this.roomsManager.dispatch({
        roomName: arg.roomName,
        actionRoom: ADD_PLAYER(arg.playerName, socket),
      });
    });

    socket.on(ENUM_SOCKET_EVENT_SERVER.SET_GAME_OPTION, (arg: IEventSetGameOption) => {
      this.roomsManager.dispatch({
        roomName: arg.roomName,
        actionRoom: UPDATE_OPTION_GAME(arg.optionGame),
      });
    });

    socket.on(ENUM_SOCKET_EVENT_SERVER.START_GAME, (arg: IEventStartGame) => {
      this.roomsManager.dispatch({
        roomName: arg.roomName,
        actionRoom: START_GAME(),
      });
    });

    socket.on(ENUM_SOCKET_EVENT_SERVER.PLACE_PIECE, (arg: IEventPlacePiece) => {
      this.roomsManager.dispatch({
        roomName: arg.roomName,
        actionRoom: PLACE_PIECE(arg.piece, arg.pos, socket.id),
      });
    });

    socket.on('disconnect', () => {
      this.roomsManager.dispatch({
        socketId: socket.id,
        actionRoom: DEL_PLAYER(socket.id),
      });
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
