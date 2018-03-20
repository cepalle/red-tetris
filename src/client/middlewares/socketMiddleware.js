import {emitJoinRoom} from "../util/socket-handler";

const socketMiddleware = store => next => action => {
  switch (action.type) {
    case 'CONNECTION_RESPONSE':
      emitJoinRoom(store.getState().roomName, store.getState().playerName);
      break;
    default:
      break;
  }
  return next(action);
};

export {socketMiddleware};
