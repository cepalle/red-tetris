import {store} from "../../src/client/middlewares/store";
import {asLoose, ifWinSet} from "../../src/client/util/loose-win-handler";
import {clonePiece} from "../../src/client/util/clone-handler";
import {newRot} from "../../src/client/util/grid-piece-handler";

describe('loose-wim-hqndler test', () => {
  const state = store.getState();

  it('ifWinSet', () => {
    ifWinSet(state)
  });

  it('asLoose', () => {
    asLoose(state.playerStates[0].grid)
  });

  it('clonePiece', () => {
    clonePiece({
      pos: {x: 0, y: 0}
    })
  });

  it('newRot', () => {
    newRot({
      pos: {x: 0, y: 0}
    })
  });

});
