import {animate} from "./animate"
import {emitEndPlaying, emitPlayerLoose} from "../socket/socket-api"

const ifEndGameEmit = state => {
  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);
  if (player.isMaster) {
    if (state.playerStates.length === 1) {
      if (player.hasLoose) {
        emitEndPlaying();
      }
    }
    if (state.playerStates.length > 1) {
      if (state.playerStates.filter(e => !e.hasLoose).length < 2) {
        emitEndPlaying();
      }
    }
  }
};

const ifWinSet = state => {
  const playersNotLoose = state.playerStates.filter(e => !e.hasLoose);
  if (state.playerStates.length > 1 && state.playerStates.filter(e => !e.hasLoose).length === 1) {
    animate.value = false;
    playersNotLoose[0].hasWin = true;
  }
  ifEndGameEmit(state);
};

const ifLooseEmitSet = state => {
  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);
  if (player.grid[3].some(e => e !== 0)) {
    animate.value = false;
    player.hasLoose = true;
    emitPlayerLoose();
    ifWinSet(state);
  }
};

export {ifLooseEmitSet, ifWinSet}
