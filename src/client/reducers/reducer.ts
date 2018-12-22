import {
  reducerAddWallLine,
  reducerMovePiece,
  reducerStartGame,
  reducerUpdatePlayers,
  reducerUpdateRoomPlayerName,
} from "./reducer-aux";
import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";
import {urlGetPlayerName, urlGetRoomName} from "../util/url-handler";
import {PIECES_NUM} from "../../common/pieces";
import {EnumAction, ReducerAction} from "../actions/action-creators";


interface IPlayerState {
  readonly grid: number[][],
  readonly win: boolean,
  readonly playerName: string,
  readonly master: boolean,
  readonly loose: boolean,
  readonly score: number,
  readonly lines: number,
  readonly spectator: boolean
}

interface IPos {
  readonly x: number,
  readonly y: number
}

interface IPiece {
  readonly num: number,
  readonly rot: number,
  readonly pos: IPos
}

interface IError {

}

interface IGame {

}

interface IParams {
  readonly addWallLine: boolean,
  readonly groundResizer: boolean,
}

interface IState {
  readonly playerStates: IPlayerState[],
  readonly piecesFlow: IPiece[],
  readonly error: IError,
  readonly playerName: string,
  readonly roomName: string,
  readonly animate: boolean,
  readonly EmitLoose: boolean,
  readonly EmitUpdateGrid: boolean,
  readonly EmitJoinRoom: boolean,
  readonly EmitCompleteLine: number,
  readonly games: IGame[],
  readonly params: IParams,
  readonly gridHeight: number,
  readonly socketIsConnect: boolean
}

const initPlayerState = (playerName: string, master = false, gridHeight = GRID_HEIGHT): IPlayerState => {
  return {
    grid: Array(gridHeight).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty)),
    win: false,
    playerName: playerName,
    master: master,
    loose: false,
    score: 0,
    lines: 0,
    spectator: false
  }
};

const initialState: IState = {
  playerStates: [initPlayerState(urlGetPlayerName(window))],
  piecesFlow: [],
  error: {},
  playerName: urlGetPlayerName(window),
  roomName: urlGetRoomName(window),
  animate: false,
  EmitLoose: false,
  EmitUpdateGrid: false,
  EmitJoinRoom: false,
  EmitCompleteLine: 0,
  games: [],
  params: {
    addWallLine: true,
    groundResizer: true,
  },
  gridHeight: GRID_HEIGHT,
  socketIsConnect: false
};


//----------------------------------------------------------------------------
//
// SWITCH REDUCER
//
//----------------------------------------------------------------------------

const reducer = (state = initialState, action: ReducerAction): IState => {
  switch (action.type) {
    case EnumAction.ADD_PIECES_FLOW:
      return {
        ...state,
        piecesFlow: [...state.piecesFlow, ...action.pieces]
      };
    case EnumAction.ADD_ERROR:
      return {...state, error: action.error};
    case EnumAction.UPDATE_PLAYERS:
      return reducerUpdatePlayers(state, action);
    case EnumAction.PIECES_MOVE:
      return reducerMovePiece(state, action);
    case EnumAction.UPDATE_GRID:
      return {
        ...state,
        playerStates: state.playerStates.map(el =>
          (el.playerName === action.playerName) ?
            {...el, grid: action.grid} :
            el
        )
      };
    case EnumAction.RECV_START_GAME:
      return reducerStartGame(state, action);
    case EnumAction.ADD_WALL_LINE:
      return reducerAddWallLine(state, action);
    case EnumAction.UPDATE_ROOM_PLAYER_NAME:
      return reducerUpdateRoomPlayerName(state, action);
    case EnumAction.UPDATE_GAMES:
      return {
        ...state,
        games: action.games
      };
    case EnumAction.TOGGLE_ADD_WALL_LINE:
      return {
        ...state,
        params: {
          ...state.params,
          addWallLine: !state.params.addWallLine,
        },
      };
    case EnumAction.TOGGLE_GROUND_RESIZER:
      return {
        ...state,
        params: {
          ...state.params,
          groundResizer: !state.params.groundResizer,
        },
      };
    case EnumAction.UPDATE_EMITE_LOOSE:
      return {...state, EmitLoose: action.bool};
    case EnumAction.UPDATE_EMITE_JOIN_ROOM:
      return {...state, EmitJoinRoom: action.bool};
    case EnumAction.UPDATE_EMITE_UPDATE_GRID:
      return {...state, EmitUpdateGrid: action.bool};
    case EnumAction.UPDATE_EMITE_COMPLETE_LINE:
      return {...state, EmitCompleteLine: action.nb};
    case EnumAction.CLEAN_ERROR:
      return {...state, error: {}};
    case EnumAction.UPDATE_SOCKET_IS_CONNECT:
      return {...state, socketIsConnect: action.bool};
    default:
      return state;
  }
};

export {
  reducer,
  initPlayerState,
  EnumAction,
  IState,
  IGame,
  IParams,
  IError,
  IPiece,
  IPlayerState,
  IPos,
};
