import {gridAddWall, gridDelLine, updatePiecePos, placePiece} from "../util/grid-piece-handler";
import {logger_reducer} from "../util/logger-handler";
import {initPlayerState} from "./reducer";
import {asLoose, ifWinSet} from "../util/loose-win-handler";
import {GRID_HEIGHT} from "../../common/grid";


/**
 * Synchronize players with players.
 * @param {Object} state
 * @param {Array<player>} players
 */
const reducerUpdatePlayers = (state, {players}) => {
  logger_reducer(["updatePlayers"]);

  if (!players.some(e => e.master) ||
    !players.some(e => e.playerName === state.playerName)) {
    return state;
  }

  const filterNotInPlayers = state.playerStates.filter(el => players.some(e => e.playerName === el.playerName));
  const concatNewUsers = filterNotInPlayers.concat(
    players.filter(el => !filterNotInPlayers.some(e => e.playerName === el.playerName)).map(el =>
      initPlayerState(el.playerName, el.master, state.gridHeight)
    )
  );

  const newState = {
    ...state,
    playerStates: concatNewUsers.map(playerState => ({
      ...playerState,
      player: players.find(e => e.playerName === playerState.playerName)
    })),
  };
  return ifWinSet(newState);
};

/**
 * Update the grid with the move of the part.
 * @param {Object} state
 * @param {Object} move
 */
const reducerMovePiece = (state, {move}) => {
  logger_reducer(["movePiece"]);

  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);
  if (!player ||
    player.loose ||
    player.spectator ||
    player.win ||
    !state.animate ||
    state.piecesFlow.length < 2) {
    return state;
  }

  let needNext;
  let newPiecesFlow;
  [needNext, newPiecesFlow] = updatePiecePos(player.grid, state.piecesFlow, move);

  if (needNext) {
    const newGrid = placePiece(player.grid, newPiecesFlow[0]);
    newPiecesFlow.shift();

    const [newGrid2, nbLineDel] = gridDelLine(newGrid);

    const loose = asLoose(newGrid2);

    const newState = {
      ...state,
      piecesFlow: newPiecesFlow,
      playerStates: state.playerStates.map(el => (el.playerName === state.playerName) ?
        {...el, grid: newGrid2, loose: loose} : el
      ),
      animate: state.animate && !loose,
      EmitLoose: loose,
      EmitUpdateGrid: true,
      EmitCompleteLine: nbLineDel,
    };

    return ifWinSet(newState);
  }
  return {
    ...state,
    piecesFlow: newPiecesFlow,
  };
};

/**
 * Restart grid of player and flow, set le pieces to the flow and start game.
 * @param {Object} state
 * @param {Array<int>} pieces
 * @param {Params} params
 */
const reducerStartGame = (state, {pieces, params}) => {
  logger_reducer(["startGame"]);

  let newGridHeight = GRID_HEIGHT;
  if (params.groundResizer) {
    newGridHeight += (state.playerStates.length - 1) * 2;
  }
  return {
    ...state,
    piecesFlow: pieces,
    params: params,
    gridHeight: newGridHeight,
    playerStates: state.playerStates.map(playerState =>
      initPlayerState(playerState.playerName, playerState.master, newGridHeight)
    ),
    animate: true,
  };
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
    || !state.playerStates.some(e => e.playerName === state.playerName)) {
    return state
  }

  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);
  const newGrid = gridAddWall(player.grid, amount);
  const loose = asLoose(newGrid);

  const newState = {
    ...state,
    playerStates: state.playerStates.map(el => (el.playerName === state.playerName) ?
      {...el, grid: newGrid, loose: loose} : el
    ),
    animate: state.animate && !loose,
    EmitLoose: loose,
    EmitUpdateGrid: true,
  };

  return ifWinSet(newState);
};

/**
 * Add a line unbreakable.
 * @param {Object} state
 * @param {string} roomName
 * @param {string} playerName
 */
const reducerUpdateRoomPlayerName = (state, {roomName, playerName}) => {
  logger_reducer(["updateRoomPlayerName"]);

  if (!roomName || !playerName) {
    return state;
  }

  return {
    ...state,
    playerStates: [initPlayerState(playerName)],
    roomName: roomName,
    playerName: playerName,
    EmitJoinRoom: true,
  };
};

export {
  reducerAddWallLine,
  reducerMovePiece,
  reducerStartGame,
  reducerUpdatePlayers,
  reducerUpdateRoomPlayerName,
}
