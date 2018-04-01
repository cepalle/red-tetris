import {PIECES_NUM} from "../../common/pieces";

const playerAsWin = playerStates => {
  const playersCanplay = playerStates.filter(e => !e.loose && !e.spectator);
  const playersNotSpect = playerStates.filter(e => !e.spectator);
  if (playersNotSpect.length > 1 && playersCanplay.length === 1) {
    return playersCanplay[0].playerName;
  }
  return undefined;
};

const ifWinSet = state =>  {
  const playerWin = playerAsWin(state.playerStates);

  if (playerWin) {
    return Object.assign({}, state, {
      playerStates: state.playerStates.map(el => {
        if (el.playerName === playerWin) {
          return Object.assign({}, el, {
            win: true
          });
        }
        return el;
      }),
      animate: false,
    });
  }
  return state;
};

const asLoose = grid => {
  return (grid[0].some(e => e !== PIECES_NUM.empty) ||
    grid[1].some(e => e !== PIECES_NUM.empty) ||
    grid[2].some(e => e !== PIECES_NUM.empty) ||
    grid[3].some(e => e !== PIECES_NUM.empty));
};

export {asLoose, ifWinSet}
