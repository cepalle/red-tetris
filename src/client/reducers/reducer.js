import {
  reducerPiecesFlow,
  reducerAddWallLine,
  reducerError,
  reducerMovePiece,
  reducerStartGame,
  reducerUpdateGrid,
  reducerUpdateUsers,
  reducerUpdateRoomPlayerName,
  reducerUpdateGames
} from "./reducer-aux";
import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";
import {urlGetPlayerName, urlGetRoomName} from "../util/url-handler";
import {PIECES_NUM} from "../../common/pieces";


const initPlayerState = (playerName, master = false) => {
  return {
    grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty)),
    win: false,
    playerName: playerName,
    master: master,
    loose: false,
    score: 0,
    lines: 0
  }
};

const initialState = {
  playerStates: [initPlayerState(urlGetPlayerName())],
  piecesFlow: [],
  error: {},
  playerName: urlGetPlayerName(),
  roomName: urlGetRoomName(),
  animate: false,
  EmitLoose: false,
  EmitUpdateGrid: false,
  EmitJoinRoom: false,
  EmitCompleteLine: 0,
  games: [],
  params: {
    addWallLine: true,
    groundResizer: false,
  },
  gridHeight: GRID_HEIGHT,
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
      return reducerUpdateUsers(state, action);
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
    default:
      return state;
  }
};

export {reducer, initPlayerState};
