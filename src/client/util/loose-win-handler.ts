import {ENUM_PIECES} from '@src/client/util/grid-piece-handler';
import {IPlayerState, IState} from '@src/client/reducers/reducer';

const playerAsWin = (playerStates: IPlayerState[]): string | undefined => {
  const playersCanplay = playerStates.filter(e => !e.loose && !e.spectator);
  const playersNotSpect = playerStates.filter(e => !e.spectator);

  return (playersNotSpect.length > 1 && playersCanplay.length === 1) ?
    playersCanplay[0].playerName :
    undefined;
};

// Middelware ?
const ifWinSet = (state: IState): IState => {
  const playerWin = playerAsWin(state.playerStates);

  if (playerWin) {
    return {
      ...state,
      playerStates: state.playerStates.map(el => (el.playerName === playerWin) ? {...el, win: true} : el),
      animate: false,
    };
  }
  return state;
};

// all check useful ?
const asLoose = (grid: ENUM_PIECES[][]): boolean => {
  return (grid[0].some(e => e !== ENUM_PIECES.empty) ||
    grid[1].some(e => e !== ENUM_PIECES.empty) ||
    grid[2].some(e => e !== ENUM_PIECES.empty) ||
    grid[3].some(e => e !== ENUM_PIECES.empty));
};

export {asLoose, ifWinSet};
