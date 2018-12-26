import {IState} from '@src/client/reducers/reducer';

const isPlaying = (state: IState): boolean => {
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
