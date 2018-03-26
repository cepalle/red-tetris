import {
  emitGenFlow, emitHome, emitJoinRoom, emitPlayerCompleteLine, emitPlayerLoose,
  emitStartPlaying, emitTetrisPlacePiece
} from "../util/socket-handler";
import {logger_middleware} from "../util/logger-handler";


const socketMiddleware = store => next => action => {
  switch (action.type) {
    case 'CONNECTION_RESPONSE':
      logger_middleware(["CONNECTION_RESPONSE"]);

      if (store.getState().roomName && store.getState().playerName) {
        emitJoinRoom(store.getState().roomName, store.getState().playerName);
      } else {
        emitHome();

      }
      break;
    case 'SEND_START_GAME':
      logger_middleware(["SEND_START_GAME"]);

      if (!store.getState().animate &&
        store.getState().roomName &&
        store.getState().playerName) {
        emitStartPlaying(store.getState().roomName);
      }
      break;
    default:
      break;
  }

  const result = next(action);
  const state = store.getState();

  if (state.piecesFlow.length < 8 && state.animate) {
    logger_middleware(["emitGenFlow"]);

    emitGenFlow(state.roomName);
  }

  if (state.EmitLoose) {
    logger_middleware(["EmitLoose"]);
    state.EmitLoose = false;

    emitPlayerLoose(state.roomName, state.playerName);
  }

  if (state.EmitJoinRoom) {
    logger_middleware(["EmitJoinRoom"]);
    state.EmitJoinRoom = false;

    emitJoinRoom(state.roomName, state.playerName);
  }

  if (state.EmitUpdateGrid) {
    logger_middleware(["EmitUpdateGrid"]);
    state.EmitUpdateGrid = false;

    emitTetrisPlacePiece(
      state.roomName,
      state.playerName,
      state.playerStates.find(e => e.playerName === state.playerName).grid
    );
  }

  if (state.EmitCompleteLine > 0) {
    emitPlayerCompleteLine(state.roomName, state.playerName, state.EmitCompleteLine);
    state.EmitCompleteLine = 0;
  }

  return result;
};

export {socketMiddleware};
