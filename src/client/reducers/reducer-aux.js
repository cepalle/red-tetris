import {gridAddWall, gridDelLine, updatePiecePos} from "../util/grid-piece-handler";
import * as socketApi from "../util/socket-handler";
import {logger_reducer} from "../util/logger-handler";
import {initPlayerState} from "./reducer";
import {ifLooseEmitSet, ifWinSet} from "../util/end-loose-win-handler";
import {animate} from "../util/animate-handler";
import {emitGenFlow} from "../util/socket-handler";
import {eraseCurPiece, placePiece} from "../util/grid-piece-handler";

/**
 * Add pieces to the state.piecesFlow.
 * @param {Object} state
 * @param {Array<int>} pieces
 */
const reducerPartsFlow = (state, pieces) => {
  logger_reducer(["piecesFlow", pieces]);

  state.piecesFlow = state.piecesFlow.concat(pieces);
  return state;
};

/**
 * Set error to state.error.
 * @param {Object} state
 * @param {type, message} error
 */
const reducerError = (state, error) => {
  logger_reducer(["error", error]);

  state.error = error;
  return state;
};

/**
 * Synchronize players with players.
 * @param {Object} state
 * @param {Array<user>} users
 */
const reducerUpdateUsers = (state, users) => {
  logger_reducer(["updateUsers", users]);

  let filterNotInUsers = state.playerStates.filter(el => users.some(e => e.playerName === el.playerName));
  let filterAddNewUsers = filterNotInUsers.concat(
    users.filter(el => !filterNotInUsers.some(e => e.playerName === el.playerName)).map(el =>
      initPlayerState(el.playerName)
    )
  );

  let playerMaster = users.find(el => el.master);
  if (!playerMaster) {
    logger_reducer(["no player master!"]);
    return undefined;
  }
  state.playerStates = filterAddNewUsers.map(el => {
    el.isMaster = el.playerName === playerMaster.playerName;
    return el;
  });

  state.playerStates = state.playerStates.map(playerState => {
    const user = users.find(e => e.playerName === playerState.playerName);
    playerState.hasLoose = user.loose;
    return playerState;
  });

  ifWinSet(state);

  return state;
};

/**
 * Update the grid with the move of the part.
 * @param {Object} state
 * @param {Object} move
 */
const reducerMovePiece = (state, move) => {
  logger_reducer(["movePiece", move]);

  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);
  if (player.hasLoose || !animate.value || player.hasWin) {
    return state;
  }

  if (state.piecesFlow.length < 4) {
    emitGenFlow();
    if (state.piecesFlow.length === 0) {
      logger_reducer(["movePiece piecesFlow is empty"]);
      return state;
    }
  }

  eraseCurPiece(state);
  let needNext = updatePiecePos(state, move);
  placePiece(state);

  if (needNext) {
    gridDelLine(state);
    state.piecesFlow.shift();
    socketApi.emitTetrisPlacePiece(
      state.playerStates.find(playerState => playerState.playerName === state.playerName).grid,
      state.playerName
    );
    ifLooseEmitSet(state);
  }
  return state;
};

/**
 * Update the grid of the player that as change.
 * @param {Object} state
 * @param {grid, playerName}
 */
const reducerUpdateGrid = (state, {grid, playerName}) => {
  logger_reducer(["updateGrid", {grid, playerName}]);

  state.playerStates = state.playerStates.map(el => {
    if (el.playerName === playerName) {
      el.grid = grid
    }
    return el;
  });
  return state;
};

/**
 * Restart grid of player and flow, set le pieces to the flow and start game.
 * @param {Object} state
 * @param {Array<int>} pieces
 */
const reducerStartGame = (state, pieces) => {
  logger_reducer(["startGame", pieces]);

  state.playerStates = state.playerStates.map(playerState =>
    initPlayerState(playerState.playerName, playerState.isMaster)
  );
  state.piecesFlow = pieces;
  state.curPiecePos = {};
  animate.value = true;
  return state;
};

/**
 * Add a line unbreakable.
 * @param {Object} state
 */
const reducerAddWallLine = state => {
  logger_reducer(["addWallLine", state]);

  gridAddWall(state);
  return state;
};


export {
  reducerPartsFlow,
  reducerAddWallLine,
  reducerError,
  reducerMovePiece,
  reducerStartGame,
  reducerUpdateGrid,
  reducerUpdateUsers
}