import {store} from "../../src/client/middlewares/store";
import {reducerUpdateGrid, reducerAddWallLine} from "../../src/client/reducers/reducer-aux";

describe('reducer test', () => {
  it('reducerUpdateGrid', () => {
    const obj = {
      grid:undefined,
      playerName: store.getState().playerName
    };
    reducerUpdateGrid(store.getState(), obj);
  });
  it('dispatch reducerAddWallLine', () => {
    const obj = {
      amount: 1
    };
    reducerAddWallLine(store.getState(), obj);
  });
});
