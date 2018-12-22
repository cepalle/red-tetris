import {gridAddWall, gridDelLine, updatePiecePos, placePiece} from '../util/grid-piece-handler';
import {loggerReducer} from '../util/logger-handler';
import {initPlayerState, IState} from './reducer';
import {asLoose, ifWinSet} from '../util/loose-win-handler';
import {GRID_HEIGHT} from '../../common/grid';
import {
  IAddWallLine,
  IPiecesMove,
  IRecvStartGame,
  IUpadtePlayers,
  IUpdateRoomPlayerName,
} from '@src/client/actions/action-creators';

/**
 * Synchronize players with players.
 */
const reducerUpdatePlayers = (state: IState, action: IUpadtePlayers) => {
  loggerReducer(['UPDATE_PLAYERS']);

  const {players} = action;

  if (!players.some(e => e.master) ||
    !players.some(e => e.playerName === state.playerName)) {
    return state;
  }

  const filterNotInPlayers = state.playerStates.filter(el => players.some(e => e.playerName === el.playerName));
  const concatNewUsers = filterNotInPlayers.concat(
    players.filter(el => !filterNotInPlayers.some(e => e.playerName === el.playerName)).map(el =>
      initPlayerState(el.playerName, el.master, state.gridHeight),
    ),
  );

  const newState = {
    ...state,
    playerStates: concatNewUsers.map(playerState => ({
      ...playerState,
      player: players.find(e => e.playerName === playerState.playerName),
    })),
  };
  return ifWinSet(newState);
};

/**
 * Update the grid with the move of the part.
 */
const reducerMovePiece = (state: IState, action: IPiecesMove) => {
  loggerReducer(['ENUM_PIECES_MOVE']);

  const {move} = action;

  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);
  if (!player ||
    player.loose ||
    player.spectator ||
    player.win ||
    !state.animate ||
    state.piecesFlow.length < 2) {
    return state;
  }

  const {bool, flow} = updatePiecePos(player.grid, state.piecesFlow, move);

  if (bool) {
    const newGrid = placePiece(player.grid, flow[0]);
    flow.shift();

    const {grid, nbLineToSend} = gridDelLine(newGrid);

    const loose = asLoose(grid);

    const newState = {
      ...state,
      piecesFlow: flow,
      playerStates: state.playerStates.map(el => (el.playerName === state.playerName) ?
        {...el, grid: grid, loose: loose} : el,
      ),
      animate: state.animate && !loose,
      EmitLoose: loose,
      EmitUpdateGrid: true,
      EmitCompleteLine: nbLineToSend,
    };

    return ifWinSet(newState);
  }
  return {
    ...state,
    piecesFlow: flow,
  };
};

/**
 * Restart grid of player and flow, set le pieces to the flow and start game.
 */
const reducerStartGame = (state: IState, action: IRecvStartGame) => {
  loggerReducer(['RECV_START_GAME']);

  const {pieces, params} = action;

  const newGridHeight = (params.groundResizer) ?
    GRID_HEIGHT + (state.playerStates.length - 1) * 2 :
    GRID_HEIGHT;

  return {
    ...state,
    piecesFlow: pieces,
    params: params,
    gridHeight: newGridHeight,
    playerStates: state.playerStates.map(playerState =>
      initPlayerState(playerState.playerName, playerState.master, newGridHeight),
    ),
    animate: true,
  };
};

/**
 * Add a line unbreakable.
 */
const reducerAddWallLine = (state: IState, action: IAddWallLine) => {
  loggerReducer(['ADD_WALL_LINE']);

  const {amount} = action;

  if (state.piecesFlow.length < 1
    || !state.animate
    || amount <= 0
    || !state.playerStates.some(e => e.playerName === state.playerName)) {
    return state;
  }

  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);
  const newGrid = gridAddWall(player.grid, amount);
  const loose = asLoose(newGrid);

  const newState = {
    ...state,
    playerStates: state.playerStates.map(el => (el.playerName === state.playerName) ?
      {...el, grid: newGrid, loose: loose} : el,
    ),
    animate: state.animate && !loose,
    EmitLoose: loose,
    EmitUpdateGrid: true,
  };

  return ifWinSet(newState);
};

/**
 * Add a line unbreakable.
 */
const reducerUpdateRoomPlayerName = (state: IState, action: IUpdateRoomPlayerName) => {
  loggerReducer(['UPDATE_ROOM_PLAYER_NAME']);

  const {roomName, playerName} = action;

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
};
