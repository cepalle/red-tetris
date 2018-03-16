const isInUsers = (users, username) => {
  return users.some(e => e.username === username);
};

const isInPlayerStates = (playerStates, playerName) => {
  return playerStates.some(e => e.playerName === playerName);
};

const clonePlayerStates = playerStates => playerStates.map(playerState => Object.assign({}, {
    grid: playerState.grid.map(l => l.map(e => e)),
    playerName: playerState.playerName,
    isMaster: playerState.isMaster,
  }))
;

const cloneState = state => Object.assign({}, {
    playerStates: clonePlayerStates(state.playerStates),
    playerName: state.playerName,
    roomName: state.roomName,
    partsFlow: state.partsFlow.map(e => e),
    curPartPos: Object.assign({}, state.curPartPos),
    curPartRot: state.curPartRot,
    curPartCoords: state.curPartCoords.map(e => e),
    error: Object.assign({}, state.error)
  })
;

const randNumber = (min, max) => Math.floor(Math.random() * max) + min;

export {isInUsers, isInPlayerStates, cloneState, clonePlayerStates, randNumber};
