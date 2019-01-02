import * as express from 'express';
import * as https from 'https';
import {Server} from 'http';
import * as fs from 'fs';
import {Socket} from 'socket.io';
import {
  ENUM_SOCKET_EVENT_SERVER, IEventServerMovePiece,
  IEventServerSetGameOption,
  IEventServerSubRoomState,
  IEventServerStartGame, IEventServerSubRoomsPlayersName,
} from '@src/common/socketEventServer';
import {GamesManager} from './GamesManager';
import {ADD_PLAYER, DEL_PLAYER, MOVE_PIECE, START_GAME, UPDATE_OPTION_GAME} from '@src/server/Game';
import {BehaviorSubject, Subscription} from 'rxjs';
import {
  ENUM_SOCKET_EVENT_CLIENT,
  IEventClientSetRoomsPlayersName,
  IRoomPlayersName,
} from '@src/common/socketEventClient';

class App {

  gamesManager = new GamesManager();
  roomsPlayersNameSub: BehaviorSubject<IRoomPlayersName[]> = new BehaviorSubject<IRoomPlayersName[]>([]);

  handleClient(socket: Socket): void {
    console.log('connect', socket.id);

    let subRoomsPlayersNAme: Subscription | undefined = undefined;

    socket.on(ENUM_SOCKET_EVENT_SERVER.JOIN_ROOM, (arg: IEventServerSubRoomState) => {
      console.log(ENUM_SOCKET_EVENT_SERVER.JOIN_ROOM, arg);

      this.gamesManager.dispatch({
        roomName: arg.roomName,
        actionRoom: ADD_PLAYER(arg.playerName, socket),
      });
    });

    socket.on(ENUM_SOCKET_EVENT_SERVER.SUB_ROOMS_PLAYERS_NAME, (arg: IEventServerSubRoomsPlayersName) => {
      console.log(ENUM_SOCKET_EVENT_SERVER.SUB_ROOMS_PLAYERS_NAME, arg);

      if (subRoomsPlayersNAme !== undefined && !subRoomsPlayersNAme.closed) {
        return;
      }
      subRoomsPlayersNAme = this.roomsPlayersNameSub.subscribe((roomsPlayersName: IRoomPlayersName[]) => {
        const sendSetRoomsPlayersName = (sock: Socket, ag: IEventClientSetRoomsPlayersName) => {
          sock.emit(ENUM_SOCKET_EVENT_CLIENT.SET_ROOMS_PLAYERS_NAME, ag);
        };

        sendSetRoomsPlayersName(socket, {
          roomsPlayersName: roomsPlayersName,
        });
      });
    });

    socket.on(ENUM_SOCKET_EVENT_SERVER.SET_GAME_OPTION, (arg: IEventServerSetGameOption) => {
      console.log(ENUM_SOCKET_EVENT_SERVER.SET_GAME_OPTION, arg);

      this.gamesManager.dispatch({
        roomName: arg.roomName,
        actionRoom: UPDATE_OPTION_GAME(arg.optionGame),
      });
    });

    socket.on(ENUM_SOCKET_EVENT_SERVER.START_GAME, (arg: IEventServerStartGame) => {
      console.log(ENUM_SOCKET_EVENT_SERVER.START_GAME, arg);

      this.gamesManager.dispatch({
        roomName: arg.roomName,
        actionRoom: START_GAME(),
      });
    });

    socket.on(ENUM_SOCKET_EVENT_SERVER.MOVE_PIECE, (arg: IEventServerMovePiece) => {
      console.log(ENUM_SOCKET_EVENT_SERVER.MOVE_PIECE, arg);

      this.gamesManager.dispatch({
        roomName: arg.roomName,
        actionRoom: MOVE_PIECE(socket.id, arg.move),
      });
    });

    socket.on('disconnect', () => {
      console.log('disconnect', socket.id);

      this.gamesManager.dispatch({
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

    app.use(express.static('build'));

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
      const next = this.gamesManager.games.map((r) => {
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
