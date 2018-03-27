import {gridAddWall, gridDelLine, updatePiecePos, placePiece} from "../util/grid-piece-handler";
import {logger_reducer} from "../util/logger-handler";
import {initPlayerState} from "./reducer";
import {ifLooseSet, ifWinSet} from "../util/loose-win-handler";
import {cloneState} from "../util/clone-handler";

/**
 * Add pieces to the getState.piecesFlow.
 * @param {Object} state
 * @param {Array<int>} pieces
 */
const reducerPiecesFlow = (state, {pieces}) => {
  logger_reducer(["piecesFlow"]);

  const newState = cloneState(state);
  newState.piecesFlow = newState.piecesFlow.concat(pieces);
  return newState;
};

/**
 * Set error to getState.error.
 * @param {Object} state
 * @param {type, message} error
 */
const reducerError = (state, {error}) => {
  logger_reducer(["error"]);

  const newState = cloneState(state);
  newState.error = error;
  return newState;
};

/**
 * Synchronize players with players.
 * @param {Object} state
 * @param {Array<player>} players
 */
const reducerUpdateUsers = (state, {players}) => {
  logger_reducer(["updatePlayers"]);

  if (!players.some(e => e.master) ||
    !players.some(e => e.playerName === state.playerName)) {
    return state;
  }

  const newState = cloneState(state);

  let filterNotInUsers = newState.playerStates.filter(el => players.some(e => e.playerName === el.playerName));
  let filterAddNewUsers = filterNotInUsers.concat(
    players.filter(el => !filterNotInUsers.some(e => e.playerName === el.playerName)).map(el =>
      initPlayerState(el.playerName)
    )
  );

  /* UPDATE */
  newState.playerStates = filterAddNewUsers.map(playerState => {
    const player = players.find(e => e.playerName === playerState.playerName);
    return Object.assign(playerState, player);
  });

  ifWinSet(newState);

  return newState;
};

/**
 * Update the grid with the move of the part.
 * @param {Object} state
 * @param {Object} move
 */
const reducerMovePiece = (state, {move}) => {
  logger_reducer(["movePiece"]);

  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);
  if (player.loose ||
    !state.animate ||
    player.win ||
    state.piecesFlow.length < 1 ||
    !players.some(e => e.playerName === state.playerName)) {
    return state;
  }

  const newState = cloneState(state);
  const newPlayer = newState.playerStates.find(playerState => playerState.playerName === newState.playerName);
  let needNext;
  [needNext, newState.piecesFlow[0]] = updatePiecePos(newPlayer.grid, newState.piecesFlow[0], move);

  if (needNext) {
    newPlayer.grid = placePiece(newPlayer.grid, newState.piecesFlow[0]);
    let nbLineDel;
    [newPlayer.grid, nbLineDel] = gridDelLine(newPlayer.grid);
    newState.piecesFlow.shift();

    newState.EmitCompleteLine = nbLineDel;
    newState.EmitUpdateGrid = true;
    ifLooseSet(newState);
  }
  return newState;
};

/**
 * Update the grid of the player that as change.
 * @param {Object} state
 * @param {grid, playerName}
 */
const reducerUpdateGrid = (state, {grid, playerName}) => {
  logger_reducer(["updateGrid"]);

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
const reducerStartGame = (state, {pieces}) => {
  logger_reducer(["startGame"]);

  const newState = cloneState(state);

  newState.playerStates = newState.playerStates.map(playerState =>
    initPlayerState(playerState.playerName, playerState.master)
  );
  newState.piecesFlow = pieces;
  newState.animate = true;
  return newState;
};

/**
 * Add a line unbreakable.
 * @param {Object} state
 * @param {int} amount
 */
const reducerAddWallLine = (state, {amount}) => {
  logger_reducer(["addWallLine"]);

  if (state.piecesFlow.length < 1
    || !state.animate
    || amount <= 0
    || !players.some(e => e.playerName === state.playerName)) {
    return state
  }

  return gridAddWall(state, amount);
};

/**
 * Add a line unbreakable.
 * @param {Object} state
 * @param {string} roomName
 * @param {string} playerName
 */
const reducerUpdateRoomPlayerName = (state, {roomName, playerName}) => {
  logger_reducer(["updateRoomPlayerName"]);

  const newState = cloneState(state);
  newState.playerStates = [initPlayerState(playerName)];
  newState.roomName = roomName;
  newState.playerName = playerName;
  newState.EmitJoinRoom = true;

  return newState;
};

/**
 * Add a line unbreakable.
 * @param {Object} state
 * @param {games} games
 */
const reducerUpdateGames = (state, {games}) => {
  logger_reducer(["updateRoomPlayerName"]);

  const newState = cloneState(state);
  newState.games = games;

  return newState;
};


export {
  reducerPiecesFlow,
  reducerAddWallLine,
  reducerError,
  reducerMovePiece,
  reducerStartGame,
  reducerUpdateGrid,
  reducerUpdateUsers,
  reducerUpdateRoomPlayerName,
  reducerUpdateGames
}
