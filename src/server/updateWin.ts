import {IPlayer} from '@src/common/ITypeRoomManager';

const updateWin = (players: IPlayer[]): IPlayer[] => {

  if (players.filter((p) => !p.isSpectator).length > 1) {
    if (players.filter((p) => p.playing).length === 1) {
      return players.map((p) => {
        if (p.playing) {
          return {
            ...p,
            playing: false,
            win: true,
          };
        }
        return p;
      });
    }
  }

  return players;
};

export {
  updateWin,
};
