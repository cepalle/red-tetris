import {logger_reducer} from "../logger";
import {initialState, initPlayerState} from "./initial-state";
import {isInUsers, isInPlayerStates} from "../util/utils";
import {getPiece, getPieceMask, getPieceObj, PARTS_MOVE_DOWN, updateDirection} from "../../common/parts";
import * as utilMovePiece from "../util/move-piece";
import {eraseLastPiece} from "../util/move-piece";
import {placePiece} from "../util/move-piece";

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

  const piece = getPiece(state.partsFlow[0] - 1, state.curPartRot);
  const loc = Object.assign({}, state.curPartPos);
  const grid = state.playerStates.find(playerState => playerState.playerName === state.playerName).grid;
  const gridCopy = grid.map(l => l.map(e => e));
  eraseLastPiece(gridCopy, state);
  let collisionType;
  updateDirection(loc, direction);
  if (!(collisionType = utilMovePiece.hasCollision(gridCopy, piece, loc))) {
    state.curPartPos = loc;
    eraseLastPiece(grid, state);
    placePiece(grid, piece, loc, state);
  }
  else
    console.log("With a colision .. " + collisionType);

  return Object.assign({}, state);
};

const reducerUpdateGrid = (state, {grid, playerName}) => {
  logger_reducer(["movePart", {grid, playerName}]);

  let newPlayerStates = state.playerStates.map(el => {
    if (el.playerName === playerName) {
      el.grid = grid
    }
    return el;
  });
  return Object.assign({}, state, {playerStates: newPlayerStates});
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
    case 'UPDATE_GRID':
      return reducerUpdateGrid(state, action.data);
    default:
      return state;
  }
};

export {reducer};
