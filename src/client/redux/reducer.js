import {logger_reducer} from "../logger";
import {initialState, initPlayerState} from "./initial-state";
import {isInUsers, isInPlayerStates} from "../utils";

const reducerPartsFlow = (state, data) => {
  logger_reducer(["partsFlow", data]);

  return Object.assign({}, state, {partsFlow: state.partsFlow.concat(data)});
};

const reducerError = (state, data) => {
  logger_reducer(["error", data]);

  return Object.assign({}, state, {error: Object.assign({}, data)});
};

const reducerUpdateUsers = (state, users) => {
  logger_reducer(["updateUsers", users]);

  let filterNotInUsers = state.playerStates.filter(el => isInUsers(users, el.playerName));
  let newPlayerStates = filterNotInUsers.concat(
    users.filter(el => !isInPlayerStates(filterNotInUsers, el.username)).map(el => initPlayerState(el.username))
  );

  let playerMaster = users.filter(el => el.master);
  if (playerMaster.length !== 1) {
    logger_reducer(["no player master!"]);
    return undefined;
  }
  newPlayerStates.map(el => {
    el.isMaster = el.playerName === playerMaster[0].username;
    return el;
  });

  return Object.assign({}, state, {playerStates: newPlayerStates});
};

const reducerMovePart = (state, direction) => {
  logger_reducer(["movePart", direction]);







//  return ///
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PARTS_FLOW':
      return reducerPartsFlow(state, action.data);
    case 'ADD_ERROR':
      return reducerError(state, action.data);
    case 'UPDATE_USERS':
      return reducerUpdateUsers(state, action.data);
    case 'MOVE_PART':
      return reducerMovePart(state, action.data);
    default:
      return state;
  }
};

export {reducer};
