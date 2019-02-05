import {gridAddWall, gridDelLine, updatePiecePos, placePiece} from "../util/grid-piece-handler";
import {logger_reducer} from "../util/logger-handler";
import {initPlayerState} from "./reducer";
import {asLoose, ifWinSet} from "../util/loose-win-handler";
import {GRID_HEIGHT} from "../../common/grid";

/**
 * Add pieces to the getState.piecesFlow.
 * @param {Object} state
 * @param {Array<int>} pieces
 */
const reducerPiecesFlow = (state, {pieces}) => {
  logger_reducer(["piecesFlow"]);

  return Object.assign({}, state, {
    piecesFlow: state.piecesFlow.concat(pieces)
  });
};

/**
 * Set error to getState.error.
 * @param {Object} state
 * @param {type, message} error
 */
const reducerError = (state, {error}) => {
  logger_reducer(["error"]);

  if (error.type === "PLAYER_ALREADY_IN_ROOM") {
    return Object.assign({}, state, {
      error: error,
      playerName: "",
      roomName: "",
    });
  }

  return Object.assign({}, state, {error: error});
};

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

  let filterNotInPlayers = state.playerStates.filter(el => players.some(e => e.playerName === el.playerName));
  let concatNewUsers = filterNotInPlayers.concat(
    players.filter(el => !filterNotInPlayers.some(e => e.playerName === el.playerName)).map(el =>
      initPlayerState(el.playerName, el.master, state.gridHeight)
    )
  );

  const newState = Object.assign({}, state, {
    playerStates: concatNewUsers.map(playerState => {
      const player = players.find(e => e.playerName === playerState.playerName);
      return Object.assign(playerState, player);
    }),
  });
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
    let newGrid = placePiece(player.grid, newPiecesFlow[0]);
    newPiecesFlow.shift();

    let nbLineDel;
    [newGrid, nbLineDel] = gridDelLine(newGrid);

    const loose = asLoose(newGrid);

    const newState = Object.assign({}, state, {
      piecesFlow: newPiecesFlow,
      playerStates: state.playerStates.map(el => {
        if (el.playerName === state.playerName) {
          return Object.assign({}, el, {
            grid: newGrid,
            loose: loose
          });
        }
        return el;
      }),
      animate: state.animate && !loose,
      EmitLoose: loose,
      EmitUpdateGrid: true,
      EmitCompleteLine: nbLineDel,
    });

    return ifWinSet(newState);
  }
  return Object.assign({}, state, {
    piecesFlow: newPiecesFlow,
  });
};

/**
 * Update the grid of the player that as change.
 * @param {Object} state
 * @param {grid, playerName}
 */
const reducerUpdateGrid = (state, {grid, playerName}) => {
  logger_reducer(["updateGrid"]);

  return Object.assign({}, state, {
    playerStates: state.playerStates.map(el => {
      if (el.playerName === playerName) {
        return Object.assign({}, el, {grid: grid});
      }
      return el;
    })
  });
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
  return Object.assign({}, state, {
    piecesFlow: pieces,
    params: params,
    gridHeight: newGridHeight,
    playerStates: state.playerStates.map(playerState =>
      initPlayerState(playerState.playerName, playerState.master, newGridHeight)
    ),
    animate: true,
  });
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

  const newState = Object.assign({}, state, {
    playerStates: state.playerStates.map(el => {
      if (el.playerName === state.playerName) {
        return Object.assign({}, el, {
          grid: newGrid,
          loose: loose
        });
      }
      return el;
    }),
    animate: state.animate && !loose,
    EmitLoose: loose,
    EmitUpdateGrid: true,
  });

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

  return Object.assign({}, state, {
    playerStates: [initPlayerState(playerName)],
    roomName: roomName,
    playerName: playerName,
    EmitJoinRoom: true,
  });
};

/**
 * Add a line unbreakable.
 * @param {Object} state
 * @param {games} games
 */
const reducerUpdateGames = (state, {games}) => {
  logger_reducer(["updateRoomPlayerName"]);

  return Object.assign({}, state, {
    games: games
  });
};

/**
 * Toggle params.groundResizer.
 * @param {Object} state
 */
const reducerToggleGroundResizer = state => {
  logger_reducer(["reducerToggleGroundResizer"]);

  return Object.assign({}, state, {
    params: Object.assign({}, state.params, {
      groundResizer: !state.params.groundResizer,
    }),
  });
};

/**
 * Toggle params.groundAddWallLine.
 * @param {Object} state
 */
const reducerToggleAddWallLine = state => {
  logger_reducer(["reducerToggleAddWallLine"]);

  return Object.assign({}, state, {
    params: Object.assign({}, state.params, {
      addWallLine: !state.params.addWallLine,
    }),
  });
};

export {
  reducerPiecesFlow,
  reducerAddWallLine,
  reducerError,
  reducerMovePiece,
  reducerStartGame,
  reducerUpdateGrid,
  reducerUpdatePlayers,
  reducerUpdateRoomPlayerName,
  reducerUpdateGames,
  reducerToggleGroundResizer,
  reducerToggleAddWallLine,
}
