const ifWinSet = state => {
  const playersNotLoose = state.playerStates.filter(e => !e.hasLoose);
  if (state.playerStates.length > 1 && playersNotLoose.length === 1) {
    playersNotLoose[0].hasWin = true;

    state.SetAnimateFalse = true;
  }
};

const ifLooseSet = state => {
  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);
  if (player.grid[0].some(e => e !== 0) ||
    player.grid[1].some(e => e !== 0) ||
    player.grid[2].some(e => e !== 0) ||
    player.grid[3].some(e => e !== 0)) {
    player.hasLoose = true;

    console.log("player loose grid:", player.grid);
    state.SetAnimateFalse = true;
    state.EmitLoose = true;
    ifWinSet(state);
  }
};

export {ifLooseSet, ifWinSet}
