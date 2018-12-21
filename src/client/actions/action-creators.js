/**
 * Create action for add pieces to the state.piecesFlow.
 * @param {[pieces]} pieces
 */
const ADD_PIECES_FLOW = pieces => {
  return {
    type: 'ADD_PIECES_FLOW',
    pieces: pieces
  };
};

/**
 * Create a action for set error to getState.error.
 * @param {type, message} error
 */
const ADD_ERROR = error => {
  return {
    type: 'ADD_ERROR',
    error: error
  }
};

/**
 * Create a action for synchronize players with users.
 * @param {Array<player>} players
 */
const UPDATE_PLAYERS = players => {
  return {
    type: 'UPDATE_PLAYERS',
    players: players
  }
};

/**
 * Create a action for update the grid with the move of the part.
 * @param {string} move
 */
const PIECES_MOVE = move => {
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
const UPDATE_GRID = (grid, playerName) => {
  return {
    type: 'UPDATE_GRID',
    grid: grid,
    playerName: playerName
  }
};

/**
 * Restart grid of player and flow, set le pieces to the flow and start game.
 * @param {[pieces]} pieces
 * @param {Params} params
 */
const RECV_START_GAME = (pieces, params) => {
  return {
    type: 'RECV_START_GAME',
    pieces: pieces,
    params: params
  }
};

/**
 * Add a line unbreakable.
 */
const ADD_WALL_LINE = (amount) => {
  return {
    type: 'ADD_WALL_LINE',
    amount: amount
  }
};

/**
 * Add a line unbreakable.
 */
const CONNECTION_RESPONSE = () => {
  return {
    type: 'CONNECTION_RESPONSE'
  }
};

/**
 * Add a line unbreakable.
 */
const SEND_START_GAME = () => {
  return {
    type: 'SEND_START_GAME'
  }
};

/**
 * update room and player name.
 */
const UPDATE_ROOM_PLAYER_NAME = (roomName, playerName) => {
  return {
    type: 'UPDATE_ROOM_PLAYER_NAME',
    roomName: roomName,
    playerName: playerName
  }
};

/**
 * update rooms name for home.
 */
const UPDATE_GAMES = games => {
  return {
    type: 'UPDATE_GAMES',
    games: games,
  }
};

/**
 * send to the server QUIT_GAME.
 */
const EMIT_QUIT_GAME = () => {
  return {
    type: 'EMIT_QUIT_GAME',
  }
};

/**
 * send to the server QUIT_GAME.
 */
const TOGGLE_ADD_WALL_LINE = () => {
  return {
    type: 'TOGGLE_ADD_WALL_LINE',
  }
};

/**
 * send to the server QUIT_GAME.
 */
const TOGGLE_GROUND_RESIZER = () => {
  return {
    type: 'TOGGLE_GROUND_RESIZER',
  }
};

const UPDATE_EMITE_LOOSE = (bool) => {
  return {
    type: 'UPDATE_EMITE_LOOSE',
    bool
  }
};

const UPDATE_EMITE_JOIN_ROOM = (bool) => {
  return {
    type: 'UPDATE_EMITE_JOIN_ROOM',
    bool
  }
};

const UPDATE_EMITE_UPDATE_GRID = (bool) => {
  return {
    type: 'UPDATE_EMITE_UPDATE_GRID',
    bool
  }
};

const UPDATE_EMITE_COMPLETE_LINE = (nb) => {
  return {
    type: 'UPDATE_EMITE_COMPLETE_LINE',
    nb
  }
};

const CLEAN_ERROR = () => {
  return {
    type: 'CLEAN_ERROR'
  }
};

const UPDATE_SOCKET_IS_CONNECT = (bool) => {
  return {
    type: 'UPDATE_SOCKET_IS_CONNECT',
    bool
  }
};

export {
  ADD_PIECES_FLOW,
  ADD_ERROR,
  UPDATE_PLAYERS,
  PIECES_MOVE,
  UPDATE_GRID,
  RECV_START_GAME,
  ADD_WALL_LINE,
  CONNECTION_RESPONSE,
  SEND_START_GAME,
  UPDATE_ROOM_PLAYER_NAME,
  UPDATE_GAMES,
  EMIT_QUIT_GAME,
  TOGGLE_ADD_WALL_LINE,
  TOGGLE_GROUND_RESIZER,
  UPDATE_EMITE_LOOSE,
  UPDATE_EMITE_JOIN_ROOM,
  UPDATE_EMITE_UPDATE_GRID,
  UPDATE_EMITE_COMPLETE_LINE,
  CLEAN_ERROR,
  UPDATE_SOCKET_IS_CONNECT,
};
