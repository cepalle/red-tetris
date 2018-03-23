import {
  emitGenFlow, emitJoinRoom, emitPlayerCompleteLine, emitPlayerLoose,
  emitStartPlaying, emitTetrisPlacePiece
} from "../util/socket-handler";
import {logger_middleware} from "../util/logger-handler";
import {animate} from "../util/animate-handler";


const socketMiddleware = store => next => action => {
  switch (action.type) {
    case 'CONNECTION_RESPONSE':
      logger_middleware(["CONNECTION_RESPONSE"]);

      emitJoinRoom(store.getState().roomName, store.getState().playerName);
      break;
    case 'SEND_START_GAME':
      logger_middleware(["SEND_START_GAME"]);

      if (!animate.value) {
        emitStartPlaying(store.getState().roomName);
      }
      break;
    default:
      break;
  }

  const result = next(action);
  const state = store.getState();

  if (state.piecesFlow.length < 6 && animate.value) {
    logger_middleware(["emitGenFlow"]);

    emitGenFlow(state.roomName);
  }

  if (state.EmitLoose) {
    logger_middleware(["EmitLoose"]);
    state.EmitLoose = false;

    emitPlayerLoose(state.roomName, state.playerName);
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
    for (let i = 0; i < state.EmitCompleteLine; i++) {
      emitPlayerCompleteLine(state.roomName, state.playerName);
    }
    state.EmitCompleteLine = 0;
  }

  return result;
};

export {socketMiddleware};
