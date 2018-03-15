/**
 * Create action for add parts to the state.partsFlow.
 * @param {Array<int>} parts
 */
const addPartsFlow = parts => {
  return {
    type: 'ADD_PARTS_FLOW',
    data: parts
  };
};

/**
 * Create a action for set error to state.error.
 * @param {type, message} error
 */
const addError = error => {
  return {
    type: 'ADD_ERROR',
    data: error
  }
};

/**
 * Create a action for synchronize players with users.
 * @param {Array<user>} users
 */
const updateUsers = users => {
  return {
    type: 'UPDATE_USERS',
    data: users
  }
};

/**
 * Create a action for update the grid with the move of the part.
 * @param {PARTS_MOVE} move
 */
const movePart = move => {
  return {
    type: 'MOVE_PART',
    data: move
  }
};

/**
 * Create a action for update the grid of the player that as change.
 * @param {grid, playerName} gridAndPlayer
 */
const updateGrid = gridAndPlayer => {
  return {
    type: 'UPDATE_GRID',
    data: gridAndPlayer
  }
};

export {addPartsFlow, addError, updateUsers, movePart, updateGrid};
