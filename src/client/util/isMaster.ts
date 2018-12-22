import {IPlayerState} from '@src/client/reducers/reducer';

const isMaster = (playerStates: IPlayerState[], playerName: string): boolean => {
  const player = playerStates.find(e => e.playerName === playerName);
  if (player === undefined) {
    return false;
  }
  return player.master;
};

export {
  isMaster,
};
