import {emitJoinRoom, emitStartPlaying} from "../util/socket-handler";
import {logger_middleware} from "../util/logger-handler";


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
  return next(action);
};

export {socketMiddleware};
