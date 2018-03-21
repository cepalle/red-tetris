import {eraseCurPiece} from "./grid-piece-handler";

const ifWinSet = state => {
  const playersNotLoose = state.playerStates.filter(e => !e.hasLoose);
  if (state.playerStates.length > 1 && playersNotLoose.length === 1) {
    playersNotLoose[0].hasWin = true;

    state.SetAnimateFalse = true;
  }
};

const ifLooseSet = state => {
  const newState = eraseCurPiece(state);
  const newPlayer = newState.playerStates.find(playerState => playerState.playerName === newState.playerName);
  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);
  if (newPlayer.grid[0].some(e => e !== 0) ||
    newPlayer.grid[1].some(e => e !== 0) ||
    newPlayer.grid[2].some(e => e !== 0) ||
    newPlayer.grid[3].some(e => e !== 0)) {
    player.hasLoose = true;

    state.SetAnimateFalse = true;
    state.EmitLoose = true;
    ifWinSet(state);
  }
};

export {ifLooseSet, ifWinSet}
