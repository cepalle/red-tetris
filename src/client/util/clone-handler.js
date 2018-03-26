const clonePlayerStates = playerStates => playerStates.map(playerState =>
    Object.assign(
      {},
      playerState,
      {grid: playerState.grid.map(l => l.map(e => e))}
    )
  )
;

const clonePiece = piece => Object.assign({}, piece, {pos: Object.assign({}, piece.pos)});

/* Shalow copie games */
const cloneState = state =>
  Object.assign(
    {},
    state,
    {
      playerStates: clonePlayerStates(state.playerStates),
      piecesFlow: state.piecesFlow.map(p => clonePiece(p)),
      error: Object.assign({}, state.error)
    }
  )
;


export {cloneState, clonePlayerStates, clonePiece};
