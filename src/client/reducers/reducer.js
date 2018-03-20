import {cloneState} from "../util/clone-handler";
import {
  reducerPartsFlow,
  reducerAddWallLine,
  reducerError,
  reducerMovePiece,
  reducerStartGame,
  reducerUpdateGrid,
  reducerUpdateUsers
} from "reducer-aux";
import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";


const initPlayerState = (playerName, isMaster = false) => {
  return {
    grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0)),
    playerName: playerName,
    isMaster: isMaster,
    hasLoose: false,
    hasWin: false,
  }
};

const initialState = {
  playerStates: [initPlayerState(urlGetPlayerName())],
  piecesFlow: [],
  playerName: urlGetPlayerName(),
  roomName: urlGetRoomName(),
  error: undefined,
};


//----------------------------------------------------------------------------
//
// SWITCH REDUCER
//
//----------------------------------------------------------------------------

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIECES_FLOW':
      return reducerPartsFlow(cloneState(state), action.data);
    case 'ADD_ERROR':
      return reducerError(cloneState(state), action.data);
    case 'UPDATE_PLAYERS':
      return reducerUpdateUsers(cloneState(state), action.data);
    case 'PIECES_MOVE':
      return reducerMovePiece(cloneState(state), action.data);
    case 'UPDATE_GRID':
      return reducerUpdateGrid(cloneState(state), action.data);
    case 'START_GAME':
      return reducerStartGame(cloneState(state), action.data);
    case 'ADD_WALL_LINE':
      return reducerAddWallLine(cloneState(state));
    default:
      return state;
  }
};

export {reducer, initPlayerState};
