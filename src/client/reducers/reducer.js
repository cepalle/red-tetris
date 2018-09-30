import {
  reducerPiecesFlow,
  reducerAddWallLine,
  reducerError,
  reducerMovePiece,
  reducerStartGame,
  reducerUpdateGrid,
  reducerUpdatePlayers,
  reducerUpdateRoomPlayerName,
  reducerUpdateGames, reducerToggleGroundResizer, reducerToggleAddWallLine
} from "./reducer-aux";
import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";
import {urlGetPlayerName, urlGetRoomName} from "../util/url-handler";
import {PIECES_NUM} from "../../common/pieces";


const initPlayerState = (playerName, master = false, gridHeight = GRID_HEIGHT) => {
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

const initialState = {
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIECES_FLOW':
      return reducerPiecesFlow(state, action);
    case 'ADD_ERROR':
      return reducerError(state, action);
    case 'UPDATE_PLAYERS':
      return reducerUpdatePlayers(state, action);
    case 'PIECES_MOVE':
      return reducerMovePiece(state, action);
    case 'UPDATE_GRID':
      return reducerUpdateGrid(state, action);
    case 'RECV_START_GAME':
      return reducerStartGame(state, action);
    case 'ADD_WALL_LINE':
      return reducerAddWallLine(state, action);
    case 'UPDATE_ROOM_PLAYER_NAME':
      return reducerUpdateRoomPlayerName(state, action);
    case 'UPDATE_GAMES':
      return reducerUpdateGames(state, action);
    case 'TOGGLE_ADD_WALL_LINE':
      return reducerToggleAddWallLine(state);
    case 'TOGGLE_GROUND_RESIZER':
      return reducerToggleGroundResizer(state);
    case 'UPDATE_EMITE_LOOSE':
      return Object.assign({}, state, {EmitLoose: action.bool});
    case 'UPDATE_EMITE_JOIN_ROOM':
      return Object.assign({}, state, {EmitJoinRoom: action.bool});
    case 'UPDATE_EMITE_UPDATE_GRID':
      return Object.assign({}, state, {EmitUpdateGrid: action.bool});
    case 'UPDATE_EMITE_COMPLETE_LINE':
      return Object.assign({}, state, {EmitCompleteLine: action.nb});
    case 'CLEAN_ERROR':
      return Object.assign({}, state, {error: {}});
    case 'UPDATE_SOCKET_IS_CONNECT':
      return Object.assign({}, state, {socketIsConnect: action.bool});
    default:
      return state;
  }
};

export {reducer, initPlayerState};
