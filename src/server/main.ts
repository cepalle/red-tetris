import * as express from 'express';
import * as https from 'https';
import {Server} from 'http';
import * as fs from 'fs';
import {Socket} from 'socket.io';
import {
  ENUM_SOCKET_EVENT_SERVER, IEventMovePiece,
  IEventSetGameOption,
  IEventSubRoomState,
  IEventStartGame, IEventSubRoomsPlayersName,
} from '@src/common/socketEventServer';
import {RoomsManager} from './RoomsManager';
import {ADD_PLAYER, DEL_PLAYER, MOVE_PIECE, START_GAME, UPDATE_OPTION_GAME} from '@src/server/RoomManager';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ENUM_SOCKET_EVENT_CLIENT, IEventSetRoomsPlayersName, IRoomPlayersName} from '@src/common/socketEventClient';

class App {

  roomsManager = new RoomsManager();
  roomsPlayersNameSub: BehaviorSubject<IRoomPlayersName[]> = new BehaviorSubject<IRoomPlayersName[]>([]);

  handleClient(socket: Socket): void {
    let subRoomsPlayersNAme: Subscription | undefined = undefined;

    socket.on(ENUM_SOCKET_EVENT_SERVER.SUB_ROOM_STATE, (arg: IEventSubRoomState) => {
      console.log(ENUM_SOCKET_EVENT_SERVER.SUB_ROOM_STATE, arg);

      this.roomsManager.dispatch({
        roomName: arg.roomName,
        actionRoom: ADD_PLAYER(arg.playerName, socket),
      });
    });

    socket.on(ENUM_SOCKET_EVENT_SERVER.SUB_ROOMS_PLAYERS_NAME, (arg: IEventSubRoomsPlayersName) => {
      console.log(ENUM_SOCKET_EVENT_SERVER.SUB_ROOMS_PLAYERS_NAME, arg);

      if (subRoomsPlayersNAme !== undefined) {
        return;
      }
      subRoomsPlayersNAme = this.roomsPlayersNameSub.subscribe((roomsPlayersName: IRoomPlayersName[]) => {
        const sendSetRoomsPlayersName = (sock: Socket, ag: IEventSetRoomsPlayersName) => {
          sock.emit(ENUM_SOCKET_EVENT_CLIENT.SET_ROOMS_PLAYERS_NAME, ag);
        };

        sendSetRoomsPlayersName(socket, {
          roomsPlayersName: roomsPlayersName,
        });
      });
    });

    socket.on(ENUM_SOCKET_EVENT_SERVER.SET_GAME_OPTION, (arg: IEventSetGameOption) => {
      console.log(ENUM_SOCKET_EVENT_SERVER.SET_GAME_OPTION, arg);

      this.roomsManager.dispatch({
        roomName: arg.roomName,
        actionRoom: UPDATE_OPTION_GAME(arg.optionGame),
      });
    });

    socket.on(ENUM_SOCKET_EVENT_SERVER.START_GAME, (arg: IEventStartGame) => {
      console.log(ENUM_SOCKET_EVENT_SERVER.START_GAME, arg);

      this.roomsManager.dispatch({
        roomName: arg.roomName,
        actionRoom: START_GAME(),
      });
    });

    socket.on(ENUM_SOCKET_EVENT_SERVER.MOVE_PIECE, (arg: IEventMovePiece) => {
      console.log(ENUM_SOCKET_EVENT_SERVER.MOVE_PIECE, arg);

      this.roomsManager.dispatch({
        roomName: arg.roomName,
        actionRoom: MOVE_PIECE(socket.id, arg.move),
      });
    });

    socket.on('disconnect', () => {
      console.log('disconnect');

      this.roomsManager.dispatch({
        socketId: socket.id,
        actionRoom: DEL_PLAYER(socket.id),
      });
      socket.removeAllListeners();
      socket.disconnect(true);
      if (subRoomsPlayersNAme !== undefined) {
        subRoomsPlayersNAme.unsubscribe();
      }
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

    setInterval(() => {
      const next = this.roomsManager.roomManagers.map((r) => {
        return {
          roomName: r.state.roomName,
          playerNames: r.state.players.map((p) => p.playerName),
        };
      });
      this.roomsPlayersNameSub.next(next);
    }, 1000);

  }
}

new App().main();
