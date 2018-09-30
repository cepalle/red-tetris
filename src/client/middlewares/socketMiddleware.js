import {
  emitGenFlow, emitHome, emitJoinRoom, emitPlayerCompleteLine, emitPlayerLoose, emitQuitGame,
  emitStartPlaying, emitTetrisPlacePiece,
} from "../util/socket-handler";
import {logger_middleware} from "../util/logger-handler";
import {
  updateEmiteCompleteLine,
  updateEmiteJoinRoom,
  updateEmiteLoose,
  updateEmiteUpdateGrid
} from "../actions/action-creators";
import {socketEmit} from "../util/socket";

const connectionResponseHandler = (state, emit) => {
  logger_middleware(["CONNECTION_RESPONSE"]);

  if (state.roomName && state.playerName) {
    emitJoinRoom(state.roomName, state.playerName, emit);
  } else {
    emitHome(emit);
  }
};

const sendStartGameHandler = (state, emit) => {
  logger_middleware(["SEND_START_GAME"]);

  if (!state.animate && state.roomName && state.playerName) {
    emitStartPlaying(state.roomName, state.params, emit);
  }
};

const emitQuitGameHandler = (state, emit) => {
  logger_middleware(["EMIT_QUIT_GAME"]);

  if (state.roomName && state.playerName) {
    emitQuitGame(state.roomName, state.playerName, emit);
  }
};

const nextGenFlowHandler = (state, next, emit) => {
  if (state.piecesFlow.length < 8 && state.animate) {
    logger_middleware(["emitGenFlow"]);

    emitGenFlow(state.roomName, emit);
  }
};

const nextLooseHandler = (state, next, emit) => {
  if (state.EmitLoose) {
    logger_middleware(["EmitLoose"]);

    emitPlayerLoose(state.roomName, state.playerName, emit);
    next(updateEmiteLoose(false))
  }
};

const nextJoinRoomHandler = (state, next, emit) => {
  if (state.EmitJoinRoom) {
    logger_middleware(["EmitJoinRoom"]);

    emitJoinRoom(state.roomName, state.playerName, emit);
    next(updateEmiteJoinRoom(false))
  }
};

const nextUpdateGridHandler = (state, next, emit) => {
  if (state.EmitUpdateGrid) {
    logger_middleware(["EmitUpdateGrid"]);

    emitTetrisPlacePiece(
      state.roomName,
      state.playerName,
      state.playerStates.find(e => e.playerName === state.playerName).grid,
      emit
    );
    next(updateEmiteUpdateGrid(false))
  }
};

const nextCompleteLineHandler = (state, next, emit) => {
  if (state.EmitCompleteLine > 0) {
    emitPlayerCompleteLine(state.roomName, state.playerName, state.EmitCompleteLine, emit);

    next(updateEmiteCompleteLine(0))
  }
};

const socketMiddleware = store => next => action => {
  switch (action.type) {
    case 'CONNECTION_RESPONSE':
      connectionResponseHandler(store.getState(), socketEmit);
      return next(action);
    case 'SEND_START_GAME':
      sendStartGameHandler(store.getState(), socketEmit);
      return next(action);
    case 'EMIT_QUIT_GAME':
      emitQuitGameHandler(store.getState(), socketEmit);
      return next(action);
    default:
      break;
  }

  let result = next(action);

  nextGenFlowHandler(store.getState(), next, socketEmit);
  nextLooseHandler(store.getState(), next, socketEmit);
  nextJoinRoomHandler(store.getState(), next, socketEmit);
  nextUpdateGridHandler(store.getState(), next, socketEmit);
  nextCompleteLineHandler(store.getState(), next, socketEmit);

  return result;
};

export {socketMiddleware};
