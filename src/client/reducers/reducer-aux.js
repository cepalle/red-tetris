import {gridAddWall, gridDelLine, updatePiecePos} from "../util/grid-piece-handler";
import * as socketApi from "../util/socket-handler";
import {logger_reducer} from "../util/logger-handler";
import {initPlayerState} from "./reducer";
import {ifLooseEmitSet, ifWinSet} from "../util/end-loose-win-handler";
import {animate} from "../util/animate-handler";
import {emitGenFlow} from "../util/socket-handler";
import {eraseCurPiece, placePiece} from "../util/grid-piece-handler";
import {cloneState} from "../util/clone-handler";

/**
 * Add pieces to the state.piecesFlow.
 * @param {Object} state
 * @param {Array<int>} pieces
 */
const reducerPartsFlow = (state, {pieces}) => {
  logger_reducer(["piecesFlow", pieces]);

  const newState = cloneState(state);
  newState.piecesFlow = newState.piecesFlow.concat(pieces);
  return newState;
};

/**
 * Set error to state.error.
 * @param {Object} state
 * @param {type, message} error
 */
const reducerError = (state, {error}) => {
  logger_reducer(["error", error]);

  const newState = cloneState(state);
  newState.error = error;
  return newState;
};

/**
 * Synchronize players with players.
 * @param {Object} state
 * @param {Array<user>} players
 */
const reducerUpdateUsers = (state, {players}) => {
  logger_reducer(["updateUsers", players]);

  const newState = cloneState(state);

  let filterNotInUsers = newState.playerStates.filter(el => players.some(e => e.playerName === el.playerName));
  let filterAddNewUsers = filterNotInUsers.concat(
    players.filter(el => !filterNotInUsers.some(e => e.playerName === el.playerName)).map(el =>
      initPlayerState(el.playerName)
    )
  );

  let playerMaster = players.find(el => el.master);
  if (!playerMaster) {
    logger_reducer(["no player master!"]);
    return undefined;
  }
  newState.playerStates = filterAddNewUsers.map(el => {
    el.isMaster = el.playerName === playerMaster.playerName;
    return el;
  });

  newState.playerStates = newState.playerStates.map(playerState => {
    const user = players.find(e => e.playerName === playerState.playerName);
    playerState.hasLoose = user.loose;
    return playerState;
  });

  ifWinSet(newState);

  return newState;
};

// TODO NEED TO BE PURE
/**
 * Update the grid with the move of the part.
 * @param {Object} state
 * @param {Object} move
 */
const reducerMovePiece = (state, {move}) => {
  logger_reducer(["movePiece", move]);

  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);
  if (player.hasLoose || !animate.value || player.hasWin) {
    return state;
  }

  if (state.piecesFlow.length < 4) {
    emitGenFlow(state.roomName);
    if (state.piecesFlow.length === 0) {
      logger_reducer(["movePiece piecesFlow is empty"]);
      return state;
    }
  }

  const newState = cloneState(state);

  eraseCurPiece(newState);
  let needNext = updatePiecePos(newState, move);
  placePiece(newState);

  if (needNext) {
    gridDelLine(newState);
    newState.piecesFlow.shift();
    socketApi.emitTetrisPlacePiece(
      newState.roomName,
      newState.playerName,
      newState.playerStates.find(e => e.playerName === newState.playerName).grid
    );
    ifLooseEmitSet(newState);
  }
  return newState;
};

/**
 * Update the grid of the player that as change.
 * @param {Object} state
 * @param {grid, playerName}
 */
const reducerUpdateGrid = (state, {grid, playerName}) => {
  logger_reducer(["updateGrid", {grid, playerName}]);

  const newState = cloneState(state);

  newState.playerStates = newState.playerStates.map(el => {
    if (el.playerName === playerName) {
      el.grid = grid
    }
    return el;
  });
  return newState;
};

/**
 * Restart grid of player and flow, set le pieces to the flow and start game.
 * @param {Object} state
 * @param {Array<int>} pieces
 */
const reducerStartGame = (state, pieces) => {
  logger_reducer(["startGame", pieces]);

  const newState = cloneState(state);

  newState.playerStates = newState.playerStates.map(playerState =>
    initPlayerState(playerState.playerName, playerState.isMaster)
  );
  newState.piecesFlow = pieces;
  animate.value = true;
  return newState;
};

//TODO NEED TO BE PURE
/**
 * Add a line unbreakable.
 * @param {Object} state
 */
const reducerAddWallLine = state => {
  logger_reducer(["addWallLine", state]);

  const newState = cloneState(state);

  gridAddWall(newState);
  return newState;
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
