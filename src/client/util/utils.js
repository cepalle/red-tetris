const isInUsers = (users, username) => {
  return users.some(e => e.playerName === username);
};

const isInPlayerStates = (playerStates, playerName) => {
  return playerStates.some(e => e.playerName === playerName);
};

const clonePlayerStates = playerStates => playerStates.map(playerState => Object.assign({}, {
    grid: playerState.grid.map(l => l.map(e => e)),
    playerName: playerState.playerName,
    isMaster: playerState.isMaster,
    hasLoose: playerState.hasLoose,
    hasWin: playerState.hasWin
  }))
;

const cloneState = state => Object.assign({}, {
    playerStates: clonePlayerStates(state.playerStates),
    playerName: state.playerName,
    roomName: state.roomName,
    piecesFlow: state.piecesFlow.map(e => Object.assign({}, e, {pos: Object.assign({}, e.pos)})),
    error: Object.assign({}, state.error)
  })
;

const randNumber = (min, max) => Math.floor(Math.random() * max) + min;

const getColorNum = c => (c + 9) % 9;

export {isInUsers, isInPlayerStates, cloneState, clonePlayerStates, randNumber, getColorNum};
