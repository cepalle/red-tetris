/**
 * Create action for add pieces to the state.piecesFlow.
 * @param {Array<int>} pieces
 */
const addPartsFlow = pieces => {
  return {
    type: 'ADD_PIECES_FLOW',
    data: pieces
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
 * @param {string} move
 */
const movePiece = move => {
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

/**
 * Restart grid of player and flow, set le pieces to the flow and start game.
 * @param {Array<int>} pieces
 */
const startGame = pieces => {
  return {
    type: 'START_GAME',
    data: pieces
  }
};

export {addPartsFlow, addError, updateUsers, movePiece, updateGrid, startGame};
