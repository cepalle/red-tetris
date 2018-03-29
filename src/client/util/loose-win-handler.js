import {logger} from "./logger-handler"
import {PIECES_NUM} from "../../common/pieces";

const ifWinSet = state => {
  const playersCanplay = state.playerStates.filter(e => !e.loose && !e.spectator);
  const playersNotSpect = state.playerStates.filter(e => !e.spectator);
  if (playersNotSpect.length > 1 && playersCanplay.length === 1) {
    playersCanplay[0].win = true;

    state.animate = false;
  }
};

const ifLooseSet = state => {
  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);
  if (player.grid[0].some(e => e !== PIECES_NUM.empty) ||
    player.grid[1].some(e => e !== PIECES_NUM.empty) ||
    player.grid[2].some(e => e !== PIECES_NUM.empty) ||
    player.grid[3].some(e => e !== PIECES_NUM.empty)) {
    player.loose = true;

    logger(["player loose grid:", player.grid]);
    state.animate = false;
    state.EmitLoose = true;
    ifWinSet(state);
  }
};

export {ifLooseSet, ifWinSet}
