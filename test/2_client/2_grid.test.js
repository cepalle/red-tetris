import {store} from "../../src/client/middlewares/store";
import {gridAddWall, placePiecePreview} from "../../src/client/util/grid-piece-handler";

describe('grid handler test', () => {
  it('dispatch gridAddWall', () => {
    const newState = Object.assign({}, store.getState());
    gridAddWall(newState.playerStates[0].grid, 10);
  });
  it('dispatch gridAddWall', () => {
    const newState = Object.assign({}, store.getState());
    const grid = newState.playerStates[0].grid;
    const piece = newState.piecesFlow[0];
    placePiecePreview(grid, piece)
  });
});
