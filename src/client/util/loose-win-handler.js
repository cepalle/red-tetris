import {logger} from "./logger-handler"
import {PIECES_NUM} from "../../common/pieces";

const ifWinSet = state => {
  const playersNotLoose = state.playerStates.filter(e => !e.hasLoose);
  if (state.playerStates.length > 1 && playersNotLoose.length === 1) {
    playersNotLoose[0].hasWin = true;

    state.SetAnimateFalse = true;
  }
};

const ifLooseSet = state => {
  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);
  if (player.grid[0].some(e => e !== PIECES_NUM.empty) ||
    player.grid[1].some(e => e !== PIECES_NUM.empty) ||
    player.grid[2].some(e => e !== PIECES_NUM.empty) ||
    player.grid[3].some(e => e !== PIECES_NUM.empty)) {
    player.hasLoose = true;

    logger(["player loose grid:", player.grid]);
    state.SetAnimateFalse = true;
    state.EmitLoose = true;
    ifWinSet(state);
  }
};

export {ifLooseSet, ifWinSet}
