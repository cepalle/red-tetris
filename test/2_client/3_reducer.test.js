import {store} from "../../src/client/middlewares/store";
import {
  reducerUpdateGrid,
  reducerAddWallLine,
  reducerUpdatePlayers,
  reducerUpdateGames, reducerStartGame
} from "../../src/client/reducers/reducer-aux";
import {initPlayerState} from "../../src/client/reducers/reducer"

describe('reducer test', () => {
  it('reducerUpdateGrid', () => {
    const obj = {
      grid: undefined,
      playerName: store.getState().playerName
    };
    reducerUpdateGrid(store.getState(), obj);
  });

  it('reducerAddWallLine', () => {
    const obj = {
      amount: 1
    };
    reducerAddWallLine(store.getState(), obj);
  });

  it('reducerUpdatePlayers', () => {
    const obj = {
      players: store.getState().playerStates.concat(initPlayerState("tetere", false)),
    };
    reducerUpdatePlayers(store.getState(), obj);
  });

  it('reducerUpdateGames', () => {
    reducerUpdateGames(store.getState(), {});
  });

  it('reducerStartGame', () => {
    reducerStartGame(store.getState(), {
      params: {
        groundResizer: true
      },
      pieces: []
    });
  });
});
