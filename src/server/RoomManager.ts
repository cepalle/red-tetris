import {Socket} from 'socket.io';
import {IPiece, IPos} from '@src/common/grid-piece-handler';
import {factPlayer, IOptionGame, IRoomState} from '@src/common/ITypeRoomManager';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

// -- ACTION

enum EnumActionRoomStore {
  ADD_PLAYER,
  DEL_PLAYER,
  UPDATE_OPTION_GAME,
  START_GAME,
  PLACE_PIECE,
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

const reducerAddPlayer = (state: IRoomState, action: IActionRoomAddPlayer): IRoomState => {

  const {playerName, socket} = action;

  const hasPlayerName = state.players.some((p) => p.playerName === playerName);
  if (hasPlayerName) {
    // TODO emit error
  }

  const hasSocket = state.players.some((p) => p.socket.id === socket.id);
  if (hasSocket) {
    // TODO
  }

  const isMaster = state.players.length === 0;
  return {
    ...state,
    players: [...state.players,
      factPlayer(playerName, socket, isMaster),
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

const reducerDelPlayer = (state: IRoomState, action: IActionRoomDelPlayer): IRoomState => {

  const {socketId} = action;

  if (state.players.some((p) => p.socket.id === socketId)) {
    return {
      ...state,
      players: state.players.filter((p) => p.socket.id === socketId),
    };
  }
  return state;
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

const reducerUpdateOptionGame = (state: IRoomState, action: IActionUpdateOptionGame): IRoomState => {

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

const reducerStartGame = (state: IRoomState, action: IActionStartGame): IRoomState => {
  return {
    ...state,
    playing: true,
  };
};

// PLACE_PIECE

interface IActionPlacePiece extends IActionRoom {
  type: EnumActionRoomStore.PLACE_PIECE;

  socketId: string,
  piece: IPiece,
  pos: IPos
}

const PLACE_PIECE = (piece: IPiece, pos: IPos, socketId: string): IActionPlacePiece => {
  return {
    type: EnumActionRoomStore.PLACE_PIECE,

    socketId,
    piece,
    pos,
  };
};

const reducerPlacePiece = (state: IRoomState, action: IActionPlacePiece): IRoomState => {
  // const {piece, pos} = arg;
  // TODO
  return state;
};

// -- ACTION ROOM

type ActionRoom = IActionRoomAddPlayer
  | IActionRoomDelPlayer
  | IActionUpdateOptionGame
  | IActionStartGame
  | IActionPlacePiece;

// -- REDUCER

// use middelware for check end send socket... ?
const reducer = (state: IRoomState, action: ActionRoom): IRoomState => {
  switch (action.type) {
    case EnumActionRoomStore.ADD_PLAYER:
      return reducerAddPlayer(state, action);
    case EnumActionRoomStore.DEL_PLAYER:
      return reducerDelPlayer(state, action);
    case EnumActionRoomStore.UPDATE_OPTION_GAME:
      return reducerUpdateOptionGame(state, action);
    case EnumActionRoomStore.START_GAME:
      return reducerStartGame(state, action);
    case EnumActionRoomStore.PLACE_PIECE:
      return reducerPlacePiece(state, action);
    default:
      return state;
  }
};

// -- ROOM MANAGER

class RoomManager {

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
    const newState = reducer(this.state, action);

    if (newState !== this.state) {
      this.state = newState;
      this.stateSub.next(this.state);
    }
  }

  public hasSocketId(socketId: string): boolean {
    return this.state.players.some((p) => p.socket.id === socketId);
  }

  public nbPlayer(): number {
    return this.state.players.length;
  }

}

export {
  RoomManager,
  ActionRoom,
  ADD_PLAYER,
  DEL_PLAYER,
  UPDATE_OPTION_GAME,
  START_GAME,
  PLACE_PIECE,
};
