import {
  emitGenFlow,
  emitHome,
  emitJoinRoom,
  emitPlayerCompleteLine,
  emitPlayerLoose,
  emitQuitGame,
  emitStartPlaying,
  emitTetrisPlacePiece,
} from '../util/socket-handler';
import {loggerMiddleware} from '../util/logger-handler';
import {
  EnumAction,
  ReduxAction,
  UPDATE_EMITE_COMPLETE_LINE,
  UPDATE_EMITE_JOIN_ROOM,
  UPDATE_EMITE_LOOSE,
  UPDATE_EMITE_UPDATE_GRID,
  UPDATE_SOCKET_IS_CONNECT,
} from '../actions/action-creators';
import {socketEmit, socketIsConnect} from '../util/socket';
import {Dispatch, Store} from 'redux';
import {IState} from '@src/client/reducers/reducer';

const connectionResponseHandler = (state: IState, emit) => {
  loggerMiddleware(['CONNECTION_RESPONSE']);

  if (state.roomName && state.playerName) {
    emitJoinRoom(state.roomName, state.playerName, emit);
  } else {
    emitHome(emit);
  }
};

const sendStartGameHandler = (state: IState, emit) => {
  loggerMiddleware(['SEND_START_GAME']);

  if (!state.animate && state.roomName && state.playerName) {
    emitStartPlaying(state.roomName, state.params, emit);
  }
};

const emitQuitGameHandler = (state: IState, emit) => {
  loggerMiddleware(['EMIT_QUIT_GAME']);

  if (state.roomName && state.playerName) {
    emitQuitGame(state.roomName, state.playerName, emit);
  }
};

const nextGenFlowHandler = (state: IState, next: Dispatch<ReduxAction>, emit) => {
  if (state.piecesFlow.length < 8 && state.animate) {
    loggerMiddleware(['emitGenFlow']);

    emitGenFlow(state.roomName, emit);
  }
};

const nextLooseHandler = (state: IState, next: Dispatch<ReduxAction>, emit) => {
  if (state.EmitLoose) {
    loggerMiddleware(['EmitLoose']);

    emitPlayerLoose(state.roomName, state.playerName, emit);
    next(UPDATE_EMITE_LOOSE(false));
  }
};

const nextJoinRoomHandler = (state: IState, next: Dispatch<ReduxAction>, emit) => {
  if (state.EmitJoinRoom) {
    loggerMiddleware(['EmitJoinRoom']);

    emitJoinRoom(state.roomName, state.playerName, emit);
    next(UPDATE_EMITE_JOIN_ROOM(false));
  }
};

const nextUpdateGridHandler = (state: IState, next: Dispatch<ReduxAction>, emit) => {
  if (state.EmitUpdateGrid) {
    loggerMiddleware(['EmitUpdateGrid']);

    emitTetrisPlacePiece(
      state.roomName,
      state.playerName,
      state.playerStates.find(e => e.playerName === state.playerName).grid,
      emit,
    );
    next(UPDATE_EMITE_UPDATE_GRID(false));
  }
};

const nextCompleteLineHandler = (state: IState, next: Dispatch<ReduxAction>, emit) => {
  if (state.EmitCompleteLine > 0) {
    emitPlayerCompleteLine(state.roomName, state.playerName, state.EmitCompleteLine, emit);

    next(UPDATE_EMITE_COMPLETE_LINE(0));
  }
};

const nextSocketIsConnect = (state: IState, next: Dispatch<ReduxAction>, socketIsConnect) => {
  if (socketIsConnect() !== state.socketIsConnect) {
    next(UPDATE_SOCKET_IS_CONNECT(socketIsConnect()));
  }
};

const socketMiddleware = (store: any) => (next: any) => (action: ReduxAction) => {
  switch (action.type) {
    case EnumAction.CONNECTION_RESPONSE:
      connectionResponseHandler(store.getState(), socketEmit);
      return next(action);
    case EnumAction.SEND_START_GAME:
      sendStartGameHandler(store.getState(), socketEmit);
      return next(action);
    case EnumAction.EMIT_QUIT_GAME:
      emitQuitGameHandler(store.getState(), socketEmit);
      return next(action);
    default:
      break;
  }

  const result = next(action);

  nextGenFlowHandler(store.getState(), next, socketEmit);
  nextLooseHandler(store.getState(), next, socketEmit);
  nextJoinRoomHandler(store.getState(), next, socketEmit);
  nextUpdateGridHandler(store.getState(), next, socketEmit);
  nextCompleteLineHandler(store.getState(), next, socketEmit);
  nextSocketIsConnect(store.getState(), next, socketIsConnect);

  return result;
};

export {socketMiddleware};
