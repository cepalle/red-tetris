import {Socket} from 'socket.io';
import {ENUM_PIECES_MOVE} from '@src/common/grid-piece-handler';
import {IOptionGame, IRoomState} from '@src/common/ITypeRoomManager';
import {BehaviorSubject} from 'rxjs';
import {Player} from '@src/server/Player';
import {ENUM_SOCKET_EVENT_CLIENT, IEventSetRoomState} from '@src/common/socketEventClient';

const sendSetRoomState = (socket: Socket, arg: IEventSetRoomState) => {
  socket.emit(ENUM_SOCKET_EVENT_CLIENT.SET_ROOM_STATE, arg);
};

// -- ACTION

enum EnumActionRoomStore {
  ADD_PLAYER,
  DEL_PLAYER,
  UPDATE_OPTION_GAME,
  START_GAME,
  MOVE_PIECE,
}

interface IActionRoom {
  type: EnumActionRoomStore;
}

// ADD_PLAYER

interface IActionRoomAddPlayer extends IActionRoom {
  type: EnumActionRoomStore.ADD_PLAYER;

  playerName: string;
  socket: Socket;
}

const ADD_PLAYER = (playerName: string, socket: Socket): IActionRoomAddPlayer => {
  return {
    type: EnumActionRoomStore.ADD_PLAYER,
    playerName,
    socket,
  };
};

const reducerAddPlayer = (
  stateSub: BehaviorSubject<IRoomState>,
  state: IRoomState,
  action: IActionRoomAddPlayer,
): IRoomState => {

  const {playerName, socket} = action;

  const hasPlayerName = state.players.some((p) => p.playerName === playerName);
  if (hasPlayerName) {
    // TODO emit error
    return state;
  }

  const hasSocket = state.players.some((p) => p.socketId === socket.id);
  if (hasSocket) {
    // TODO
    return state;
  }

  const isMaster = state.players.length === 0;
  const player = Player.factPlayer(playerName, socket.id, isMaster);

  const sub = stateSub.subscribe((r: IRoomState) => {
    sendSetRoomState(socket, {
      room: r,
    });
  });

  return {
    ...state,
    players: [...state.players, {
      ...player,
      subState: sub,
    },
    ],
  };
};

// DEL_PLAYER

interface IActionRoomDelPlayer extends IActionRoom {
  type: EnumActionRoomStore.DEL_PLAYER;

  socketId: string;
}

const DEL_PLAYER = (socketId: string): IActionRoomDelPlayer => {
  return {
    type: EnumActionRoomStore.DEL_PLAYER,
    socketId,
  };
};

const reducerDelPlayer = (
  stateSub: BehaviorSubject<IRoomState>,
  state: IRoomState,
  action: IActionRoomDelPlayer,
): IRoomState => {

  const {socketId} = action;

  state.players.filter((p) => p.socketId === socketId).forEach((p) => {
    if (p.subState !== undefined) {
      p.subState.unsubscribe();
    }
  });

  return {
    ...state,
    players: state.players.filter((p) => p.socketId !== socketId),
  };
};

// UPDATE_OPTION_GAME

interface IActionUpdateOptionGame extends IActionRoom {
  type: EnumActionRoomStore.UPDATE_OPTION_GAME;

  optionGame: IOptionGame;
}

const UPDATE_OPTION_GAME = (optionGame: IOptionGame): IActionUpdateOptionGame => {
  return {
    type: EnumActionRoomStore.UPDATE_OPTION_GAME,
    optionGame,
  };
};

const reducerUpdateOptionGame = (
  stateSub: BehaviorSubject<IRoomState>,
  state: IRoomState,
  action: IActionUpdateOptionGame,
): IRoomState => {

  const {optionGame} = action;

  return {
    ...state,
    optionGame: optionGame,
  };
};

// START_GAME

interface IActionStartGame extends IActionRoom {
  type: EnumActionRoomStore.START_GAME;
}

const START_GAME = (): IActionStartGame => {
  return {
    type: EnumActionRoomStore.START_GAME,
  };
};

const reducerStartGame = (
  stateSub: BehaviorSubject<IRoomState>,
  state: IRoomState,
  action: IActionStartGame,
): IRoomState => {
  // TODO set interval
  return {
    ...state,
    playing: true,
    players: state.players.map((p) => ({
      ...p,
      playing: true,
    })),
  };
};

// MOVE_PIECE

interface IActionMovePiece extends IActionRoom {
  type: EnumActionRoomStore.MOVE_PIECE;

  socketId: string,
  move: ENUM_PIECES_MOVE,
}

const MOVE_PIECE = (socketId: string, move: ENUM_PIECES_MOVE): IActionMovePiece => {
  return {
    type: EnumActionRoomStore.MOVE_PIECE,

    socketId,
    move,
  };
};

const reducerMovePiece = (
  stateSub: BehaviorSubject<IRoomState>,
  state: IRoomState,
  action: IActionMovePiece,
): IRoomState => {
  // const {piece, pos} = arg;
  // TODO
  return state;
};

// -- ACTION ROOM

type ActionRoom = IActionRoomAddPlayer
  | IActionRoomDelPlayer
  | IActionUpdateOptionGame
  | IActionStartGame
  | IActionMovePiece;

// -- REDUCER

const reducer = (stateSub: BehaviorSubject<IRoomState>, state: IRoomState, action: ActionRoom): IRoomState => {
  switch (action.type) {
    case EnumActionRoomStore.ADD_PLAYER:
      return reducerAddPlayer(stateSub, state, action);
    case EnumActionRoomStore.DEL_PLAYER:
      return reducerDelPlayer(stateSub, state, action);
    case EnumActionRoomStore.UPDATE_OPTION_GAME:
      return reducerUpdateOptionGame(stateSub, state, action);
    case EnumActionRoomStore.START_GAME:
      return reducerStartGame(stateSub, state, action);
    case EnumActionRoomStore.MOVE_PIECE:
      return reducerMovePiece(stateSub, state, action);
    default:
      return state;
  }
};

// -- ROOM MANAGER

class Game {

  state: IRoomState;
  stateSub: BehaviorSubject<IRoomState>;

  constructor(roomName: string) {
    this.state = {
      roomName: roomName,
      players: [],
      playing: false,
      optionGame: {
        addWallLine: true,
        groundResizer: true,
      },
    };
    this.stateSub = new BehaviorSubject<IRoomState>(this.state);
  }

  public dispatch(action: ActionRoom): void {
    const newState = reducer(this.stateSub, this.state, action);

    if (newState !== this.state) {
      this.state = newState;
      this.stateSub.next(this.state);
    }
  }

  public hasSocketId(socketId: string): boolean {
    return this.state.players.some((p) => p.socketId === socketId);
  }

  public nbPlayer(): number {
    return this.state.players.length;
  }

}

export {
  Game,
  ActionRoom,
  ADD_PLAYER,
  DEL_PLAYER,
  UPDATE_OPTION_GAME,
  START_GAME,
  MOVE_PIECE,
};
