const clonePlayerStates = playerStates => playerStates.map(playerState =>
    Object.assign(
      {},
      playerState,
      {grid: playerState.grid.map(l => l.map(e => e))}
    )
  )
;

const cloneState = state =>
  Object.assign(
    {},
    state,
    {
      playerStates: clonePlayerStates(state.playerStates),
      piecesFlow: state.piecesFlow.map(e => Object.assign({}, e, {pos: Object.assign({}, e.pos)})),
      error: Object.assign({}, state.error)
    }
  )
;


export {cloneState, clonePlayerStates};
