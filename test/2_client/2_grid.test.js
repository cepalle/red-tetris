import {cloneState} from "../../src/client/util/clone-handler";
import {store} from "../../src/client/middlewares/store";
import {gridAddWall, placePiecePreview} from "../../src/client/util/grid-piece-handler";

describe('grid handler test', () => {
  it('dispatch gridAddWall', () => {
    const newState = cloneState(store.getState());
    gridAddWall(newState, 10);
  });
  it('dispatch gridAddWall', () => {
    const newState = cloneState(store.getState());
    const grid = newState.playerStates[0].grid;
    const piece = newState.piecesFlow[0];
    placePiecePreview(grid, piece)
  });
});
