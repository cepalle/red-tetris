import {
  emitGenFlow, emitJoinRoom, emitPlayerCompleteLine, emitPlayerLoose,
  emitStartPlaying
} from "../util/socket-handler";
import {logger_middleware, logger_reducer} from "../util/logger-handler";
import * as socketApi from "../util/socket-handler"
import {eraseCurPiece} from "../util/grid-piece-handler"


const socketMiddleware = store => next => action => {
  switch (action.type) {
    case 'CONNECTION_RESPONSE':
      logger_middleware(["CONNECTION_RESPONSE"]);
      emitJoinRoom(store.getState().roomName, store.getState().playerName);
      break;
    case 'SEND_START_GAME':
      logger_middleware(["SEND_START_GAME"]);
      emitStartPlaying(store.getState().roomName);
      break;
    default:
      break;
  }
  const result = next(action);
  const state = store.getState()

  if (state.piecesFlow.length < 6) {
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

    const stateErased = eraseCurPiece(state);
    socketApi.emitTetrisPlacePiece(
      stateErased.roomName,
      stateErased.playerName,
      stateErased.playerStates.find(e => e.playerName === stateErased.playerName).grid
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
