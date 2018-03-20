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


export {cloneState, clonePlayerStates};
