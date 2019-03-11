import {IDataState} from '../redux/reducer';

const isPlaying = (state: IDataState): boolean => {
  if (state.playerName === undefined || state.roomState === undefined) {
    return false;
  }

  const player = state.roomState.players.find((p) => p.playerName === state.playerName);
  if (player === undefined) {
    return false;
  }

  return player.playing;
};

export {
  isPlaying,
};
