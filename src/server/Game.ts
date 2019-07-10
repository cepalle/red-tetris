import {Socket} from 'socket.io';
import {
  ENUM_PIECES,
  ENUM_PIECES_MOVE,
  GRID_HEIGHT,
  gridInit,
  initPose,
  moveHandler,
} from '@src/common/grid-piece-handler';
import {IOptionGame, IRoomState} from '@src/common/ITypeRoomManager';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Player} from '@src/server/Player';
import {
  ENUM_SOCKET_EVENT_CLIENT,
  EnumError,
  IEventClientSetError,
  IEventClientSetRoomState,
} from '@src/common/socketEventClient';
import {Piece} from '@src/server/Piece';
import {updateWin} from '@src/server/updateWin';
import Timeout = NodeJS.Timeout;

// -- ACTION

enum EnumActionRoomStore {
  ADD_PLAYER,
  DEL_PLAYER,
  UPDATE_OPTION_GAME,
  START_GAME,
  MOVE_PIECE,
}

interface IActionRoom {
  readonly type: EnumActionRoomStore;
}

// ADD_PLAYER

interface IActionRoomAddPlayer extends IActionRoom {
  readonly type: EnumActionRoomStore.ADD_PLAYER;

  readonly playerName: string;
  readonly socket: Socket;
}

const ADD_PLAYER = (playerName: string, socket: Socket): IActionRoomAddPlayer => {
  return {
    type: EnumActionRoomStore.ADD_PLAYER,
    playerName,
    socket,
  };
};

const reducerAddPlayer = (
  state: IRoomState,
  action: IActionRoomAddPlayer,
): IRoomState => {

  const {playerName, socket} = action;

  const hasPlayerName = state.players.some((p) => p.playerName === playerName);
  if (hasPlayerName) {
    const toSend: IEventClientSetError = {
      error_type: EnumError.PLAYER_SAME_NAME,
      msg: 'A player has already this name in this room',
    };

    socket.emit(ENUM_SOCKET_EVENT_CLIENT.SET_ERROR, toSend);
    return state;
  }

  const isMaster = state.players.length === 0;
  const player = Player.newPlayer(playerName, socket, isMaster, GRID_HEIGHT);

  return {
    ...state,
    players: [...state.players, {
      ...player,
    },
    ],
  };
};

// DEL_PLAYER

interface IActionRoomDelPlayer extends IActionRoom {
  readonly type: EnumActionRoomStore.DEL_PLAYER;

  readonly socketId: string;
}

const DEL_PLAYER = (socketId: string): IActionRoomDelPlayer => {
  return {
    type: EnumActionRoomStore.DEL_PLAYER,
    socketId,
  };
};

const reducerDelPlayer = (
  state: IRoomState,
  action: IActionRoomDelPlayer,
): IRoomState => {

  const {socketId} = action;

  let players = state.players.filter((p) => p.socket.id !== socketId);

  if (players.length > 0) {
    if (!players.some((p) => p.isMaster)) {
      const [frst, ...rest] = players;
      players = [{...frst, isMaster: true}, ...rest];
    }

    players = updateWin(players);
  }

  return {
    ...state,
    playing: players.some((p) => p.playing),
    players: players,
  };
};

// UPDATE_OPTION_GAME

interface IActionUpdateOptionGame extends IActionRoom {
  readonly type: EnumActionRoomStore.UPDATE_OPTION_GAME;

  readonly optionGame: IOptionGame;
}

const UPDATE_OPTION_GAME = (optionGame: IOptionGame): IActionUpdateOptionGame => {
  return {
    type: EnumActionRoomStore.UPDATE_OPTION_GAME,
    optionGame,
  };
};

const reducerUpdateOptionGame = (
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
  readonly type: EnumActionRoomStore.START_GAME;
}

const START_GAME = (): IActionStartGame => {
  return {
    type: EnumActionRoomStore.START_GAME,
  };
};

const reducerStartGame = (
  state: IRoomState,
  action: IActionStartGame,
): IRoomState => {
  const flow = Piece.genFlow(20);

  const gridHeight = state.optionGame.groundResizer ? GRID_HEIGHT + state.players.length * 2 : GRID_HEIGHT;

  return {
    ...state,
    playing: true,
    players: state.players.map((p) => ({
      ...p,
      playing: true,
      isSpectator: false,
      flow: flow,
      win: false,
      lost: false,
      score: 0,
      nbLineCompleted: 0,
      posPiece: initPose(),
      grid: gridInit(gridHeight),
    })),
  };
};

// MOVE_PIECE

interface IActionMovePiece extends IActionRoom {
  readonly type: EnumActionRoomStore.MOVE_PIECE;

  readonly socketId: string,
  readonly move: ENUM_PIECES_MOVE,
}

const MOVE_PIECE = (socketId: string, move: ENUM_PIECES_MOVE): IActionMovePiece => {
  return {
    type: EnumActionRoomStore.MOVE_PIECE,

    socketId,
    move,
  };
};

const reducerMovePiece = (
  state: IRoomState,
  action: IActionMovePiece,
): IRoomState => {
  const {move, socketId} = action;

  let newplayers = moveHandler(state.players, move, socketId, state.optionGame);

  // update player lost
  newplayers = newplayers.map((p) => {
    if (p.grid[3].some((pi) => pi !== ENUM_PIECES.empty)) {
      return {
        ...p,
        lost: true,
        playing: false,
      };
    }
    return p;
  });

  // update player win
  newplayers = updateWin(newplayers);

  // add flow if need
  if (newplayers.some((p) => p.flow.length < 5)) {
    const flowToAdd = Piece.genFlow(20);

    newplayers = state.players.map((p) => ({...p, flow: [...p.flow, ...flowToAdd]}));
  }

  return {
    ...state,
    players: newplayers,
    playing: newplayers.some((p) => p.playing),
  };
};

// -- ACTION ROOM

type ActionRoom = IActionRoomAddPlayer
  | IActionRoomDelPlayer
  | IActionUpdateOptionGame
  | IActionStartGame
  | IActionMovePiece;

// -- REDUCER

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
    case EnumActionRoomStore.MOVE_PIECE:
      return reducerMovePiece(state, action);
    default:
      return state;
  }
};

// -- ROOM MANAGER

class Game {

  state: IRoomState;
  stateSub: BehaviorSubject<IRoomState>;
  sub: Subscription;
  intervalDownPiece: Timeout;

  constructor(roomName: string) {
    const sendSetRoomState = (socket: Socket, arg: IEventClientSetRoomState) => {
      socket.emit(ENUM_SOCKET_EVENT_CLIENT.SET_ROOM_STATE, arg);
    };

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
    this.sub = this.stateSub.subscribe((state: IRoomState) => {
      const ToSend = {
        room: {
          ...state,
          players: state.players.map((pl) => ({
            ...pl,
            socket: undefined,
          })),
        },
      };

      state.players.forEach((p) => {
        sendSetRoomState(p.socket, ToSend);
      });
    });
    this.intervalDownPiece = setInterval(() => {
      this.state.players.forEach((p) => {
        if (p.playing) {
          this.dispatch(MOVE_PIECE(p.socket.id, ENUM_PIECES_MOVE.DOWN));
        }
      });
    }, 500);
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

  public unsubscribe(): void {
    this.sub.unsubscribe();
    clearInterval(this.intervalDownPiece);
  }

}

export {
  EnumActionRoomStore,
  Game,
  ActionRoom,
  ADD_PLAYER,
  DEL_PLAYER,
  UPDATE_OPTION_GAME,
  START_GAME,
  MOVE_PIECE,
};
