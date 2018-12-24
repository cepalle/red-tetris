import {Socket} from 'socket.io';
import {ENUM_PIECES, IOptionGame, IPiece} from '@src/common/IType';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {IEventPlacePiece} from '@src/common/socketEventServer';
import {factPlayer} from '@src/server/playerUtils';

// ACTION

enum EnumActionRoomStore {
  ADD_PLAYER,
  DEL_PLAYER,
  UPDATE_OPTION_GAME,
  START_GAME,
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

const reducerStartGame = (state: IRoomState, action: IActionStartGame): IRoomState => {
  return {
    ...state,
    playing: true,
  };
};

// ACTION ROOM

type ActionRoom = IActionRoomAddPlayer
  | IActionRoomDelPlayer
  | IActionUpdateOptionGame
  | IActionStartGame;

// REDUCER

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
    default:
      return state;
  }
};

// ISTATE

interface IPlayer {
  playerName: string;
  socket: Socket;
  isSpectator: boolean;
  grid: ENUM_PIECES[][];
  score: number;
  nbLineCompleted: number;
  win: boolean;
  lost: boolean;
  master: boolean;
  flow: IPiece[];
}

interface IRoomState {
  roomName: string;
  playing: boolean;
  players: IPlayer[];
  optionGame: IOptionGame;
}

// ROOM MANAGER

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

  public dispatch(action: ActionRoom) {
    const newState = reducer(this.state, action);

    if (newState !== this.state) {
      this.state = newState;
      this.stateSub.next(this.state);
    }
  }

  public hasSocketId(socketId: string) {
    return this.state.players.some((p) => p.socket.id === socketId);
  }

  public placePiece(socket: Socket, arg: IEventPlacePiece) {
    // const {piece, pos} = arg;
    // TODO
  }

}

export {
  RoomManager,
  IPlayer,
  IRoomState,
};
