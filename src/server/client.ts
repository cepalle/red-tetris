import {GamesDispatcher} from '@src/server/GamesDispatcher';
import {BehaviorSubject, Subscription} from 'rxjs';
import {
  ENUM_SOCKET_EVENT_CLIENT,
  IEventClientSetRoomsPlayersName,
  IRoomPlayersName
} from '@src/common/socketEventClient';
import {Socket} from 'socket.io';
import {
  ENUM_SOCKET_EVENT_SERVER,
  IEventServerJoinRoom, IEventServerMovePiece,
  IEventServerQuitRoom, IEventServerSetGameOption, IEventServerStartGame,
  IEventServerSubRoomsPlayersName, IEventServerUnSubRoomsPlayersName
} from '@src/common/socketEventServer';
import {ADD_PLAYER, DEL_PLAYER, MOVE_PIECE, START_GAME, UPDATE_OPTION_GAME} from '@src/server/Game';

const gamesDispatcher = new GamesDispatcher();
const roomsPlayersNameSub: BehaviorSubject<IRoomPlayersName[]> = new BehaviorSubject<IRoomPlayersName[]>([]);

const handleClient = (socket: Socket) => {
  console.log('connect', socket.id);

  let subRoomsPlayersNAme: Subscription | undefined = undefined;

  socket.on(ENUM_SOCKET_EVENT_SERVER.JOIN_ROOM, (arg: IEventServerJoinRoom) => {
    console.log(ENUM_SOCKET_EVENT_SERVER.JOIN_ROOM, arg);

    gamesDispatcher.dispatch({
      roomName: arg.roomName,
      actionRoom: ADD_PLAYER(arg.playerName, socket),
    });
  });

  socket.on(ENUM_SOCKET_EVENT_SERVER.QUIT_ROOM, (arg: IEventServerQuitRoom) => {
    console.log(ENUM_SOCKET_EVENT_SERVER.QUIT_ROOM, arg);

    gamesDispatcher.dispatch({
      socketId: socket.id,
      actionRoom: DEL_PLAYER(socket.id),
    });
  });

  socket.on(ENUM_SOCKET_EVENT_SERVER.SUB_ROOMS_PLAYERS_NAME, (arg: IEventServerSubRoomsPlayersName) => {
    console.log(ENUM_SOCKET_EVENT_SERVER.SUB_ROOMS_PLAYERS_NAME, arg);

    if (subRoomsPlayersNAme !== undefined && !subRoomsPlayersNAme.closed) {
      return;
    }
    subRoomsPlayersNAme = roomsPlayersNameSub.subscribe((roomsPlayersName: IRoomPlayersName[]) => {
      const sendSetRoomsPlayersName = (sock: Socket, ag: IEventClientSetRoomsPlayersName) => {
        sock.emit(ENUM_SOCKET_EVENT_CLIENT.SET_ROOMS_PLAYERS_NAME, ag);
      };

      sendSetRoomsPlayersName(socket, {
        roomsPlayersName: roomsPlayersName,
      });
    });
  });

  socket.on(ENUM_SOCKET_EVENT_SERVER.UN_SUB_ROOMS_PLAYERS_NAME, (arg: IEventServerUnSubRoomsPlayersName) => {
    if (subRoomsPlayersNAme !== undefined) {
      subRoomsPlayersNAme.unsubscribe();
    }
  });

  socket.on(ENUM_SOCKET_EVENT_SERVER.SET_GAME_OPTION, (arg: IEventServerSetGameOption) => {
    console.log(ENUM_SOCKET_EVENT_SERVER.SET_GAME_OPTION, arg);

    gamesDispatcher.dispatch({
      roomName: arg.roomName,
      actionRoom: UPDATE_OPTION_GAME(arg.optionGame),
    });
  });

  socket.on(ENUM_SOCKET_EVENT_SERVER.START_GAME, (arg: IEventServerStartGame) => {
    console.log(ENUM_SOCKET_EVENT_SERVER.START_GAME, arg);

    gamesDispatcher.dispatch({
      roomName: arg.roomName,
      actionRoom: START_GAME(),
    });
  });

  socket.on(ENUM_SOCKET_EVENT_SERVER.MOVE_PIECE, (arg: IEventServerMovePiece) => {
    console.log(ENUM_SOCKET_EVENT_SERVER.MOVE_PIECE, arg);

    gamesDispatcher.dispatch({
      roomName: arg.roomName,
      actionRoom: MOVE_PIECE(socket.id, arg.move),
    });
  });

  socket.on('disconnect', () => {
    console.log('disconnect', socket.id);

    gamesDispatcher.dispatch({
      socketId: socket.id,
      actionRoom: DEL_PLAYER(socket.id),
    });

    if (subRoomsPlayersNAme !== undefined) {
      subRoomsPlayersNAme.unsubscribe();
    }

    socket.removeAllListeners();
    socket.disconnect(true);
  });
};

setInterval(() => {
  roomsPlayersNameSub.next(
    gamesDispatcher.games.map((r) => ({
        roomName: r.state.roomName,
        playerNames: r.state.players.map((p) => p.playerName),
      }),
    ),
  );
}, 1000);

export {handleClient}
