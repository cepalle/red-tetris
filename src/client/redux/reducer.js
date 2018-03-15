import {logger_reducer} from "../logger";
import {initialState, initPlayerState} from "./initial-state";
import {isInUsers, isInPlayerStates} from "../util/utils";
import {cloneState} from "../util/utils";
import {getPiece, getPieceMask, getPieceObj, updateDirection} from "../../common/parts";
import * as utilMovePiece from "../util/move-piece";
import {eraseLastPiece} from "../util/move-piece";
import {placePiece} from "../util/move-piece";

/**
 * Add parts to the state.partsFlow.
 * @param {state} state
 * @param {Array<int>} parts
 */
const reducerPartsFlow = (state, parts) => {
  logger_reducer(["partsFlow", parts]);

  state.partsFlow = state.partsFlow.concat(parts)
  return state;
};

/**
 * Set error to state.error.
 * @param {state} state
 * @param {type, message} error
 */
const reducerError = (state, error) => {
  logger_reducer(["error", error]);

  state.error = error
  return state;
};

/**
 * Synchronize players with users.
 * @param {state} state
 * @param {Array<user>} users
 */
const reducerUpdateUsers = (state, users) => {
  logger_reducer(["updateUsers", users]);

  let filterNotInUsers = state.playerStates.filter(el => isInUsers(users, el.playerName));
  let filterAddNewUsers = filterNotInUsers.concat(
    users.filter(el => !isInPlayerStates(filterNotInUsers, el.username)).map(el => initPlayerState(el.username))
  );

  let playerMaster = users.filter(el => el.master);
  if (playerMaster.length !== 1) {
    logger_reducer(["no player master!"]);
    return undefined;
  }
  state.playerStates = filterAddNewUsers.map(el => {
    el.isMaster = el.playerName === playerMaster[0].username;
    return el;
  });

  return state;
};

/**
 * Update the grid with the move of the part.
 * @param {state} state
 * @param {PARTS_MOVE} move
 */
const reducerMovePart = (state, move) => {
  logger_reducer(["movePart", move]);

  const piece = getPiece(state.partsFlow[0] - 1, state.curPartRot);
  const loc = Object.assign({}, state.curPartPos);
  const grid = state.playerStates.find(playerState => playerState.playerName === state.playerName).grid;
  const gridCopy = grid.map(l => l.map(e => e));
  eraseLastPiece(gridCopy, state);
  let collisionType;
  updateDirection(loc, move);
  if (!(collisionType = utilMovePiece.hasCollision(gridCopy, piece, loc))) {
    state.curPartPos = loc;
    eraseLastPiece(grid, state);
    placePiece(grid, piece, loc, state);
  }
  else
    console.log("With a colision .. " + collisionType);

  return Object.assign({}, state);
};

/**
 * Update the grid of the player that as change.
 * @param {state} state
 * @param {grid, playerName}
 */
const reducerUpdateGrid = (state, {grid, playerName}) => {
  logger_reducer(["updateGrid", {grid, playerName}]);

  state.playerStates = state.playerStates.map(el => {
    if (el.playerName === playerName) {
      el.grid = grid
    }
    return el;
  });
  return state;
};


//----------------------------------------------------------------------------
//
// SWITCH REDUCER
//
//----------------------------------------------------------------------------

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PARTS_FLOW':
      return reducerPartsFlow(cloneState(state), action.data);
    case 'ADD_ERROR':
      return reducerError(cloneState(state), action.data);
    case 'UPDATE_USERS':
      return reducerUpdateUsers(cloneState(state), action.data);
    case 'MOVE_PART':
      return reducerMovePart(cloneState(state), action.data);
    case 'UPDATE_GRID':
      return reducerUpdateGrid(cloneState(state), action.data);
    default:
      return state;
  }
};

export {reducer};
