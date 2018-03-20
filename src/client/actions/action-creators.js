/**
 * Create action for add pieces to the state.piecesFlow.
 * @param {[pieces]} pieces
 */
const addPiecesFlow = pieces => {
  return {
    type: 'ADD_PIECES_FLOW',
    pieces: pieces
  };
};

/**
 * Create a action for set error to state.error.
 * @param {type, message} error
 */
const addError = error => {
  return {
    type: 'ADD_ERROR',
    error: error
  }
};

/**
 * Create a action for synchronize players with users.
 * @param {Array<player>} players
 */
const updatePlayers = players => {
  return {
    type: 'UPDATE_PLAYERS',
    players: players
  }
};

/**
 * Create a action for update the grid with the move of the part.
 * @param {string} move
 */
const movePiece = move => {
  return {
    type: 'PIECES_MOVE',
    move: move
  }
};

/**
 * Create a action for update the grid of the player that as change.
 * @param {string} playerName
 * @param {Array<Array<int>>} grid
 */
const updateGrid = (grid, playerName) => {
  return {
    type: 'UPDATE_GRID',
    grid: grid,
    playerName: playerName
  }
};

/**
 * Restart grid of player and flow, set le pieces to the flow and start game.
 * @param {[pieces]} pieces
 */
const startGame = pieces => {
  return {
    type: 'RECV_START_GAME',
    pieces: pieces
  }
};

/**
 * Add a line unbreakable.
 */
const addWallLine = () => {
  return {
    type: 'ADD_WALL_LINE'
  }
};

/**
 * Add a line unbreakable.
 */
const connectionResponse = () => {
  return {
    type: 'CONNECTION_RESPONSE'
  }
};

/**
 * Add a line unbreakable.
 */
const sendStartGame = () => {
  return {
    type: 'SEND_START_GAME'
  }
};


export {
  addPiecesFlow,
  addError,
  updatePlayers,
  movePiece,
  updateGrid,
  startGame,
  addWallLine,
  connectionResponse,
  sendStartGame
};
