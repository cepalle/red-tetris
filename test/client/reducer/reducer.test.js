import {store} from "../../../src/client/middlewares/store";
import {
  addError, addPiecesFlow, addWallLine, movePiece, startGame, updateGrid,
  updatePlayers
} from "../../../src/client/actions/action-creators";
import Piece from "../../../src/server/data/piece/Piece";
import {expect} from "chai";
import {GRID_WIDTH, GRID_HEIGHT} from "../../../src/common/grid";
import {PIECES_MOVE} from "../../../src/common/pieces";

describe('reducer', () => {
  describe('#reducerPiecesFlow', () => {
    it('should reduce action ', () => {

      store.dispatch(addPiecesFlow([new Piece(2, 1, {x:0, y:0})]));
      expect(store.getState().piecesFlow[0].num).to.equal(2);

      store.dispatch(addError({
        message: "msg",
        type: "type",
      }));
      expect(store.getState().error.message).to.equal("msg");
      expect(store.getState().error.type).to.equal("type");

      //store.dispatch(updatePlayers());
      //expect(store.getState()).to.equal(2);

      store.dispatch(movePiece(PIECES_MOVE.DOWN));
      //need expect

      let grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(1));
      store.dispatch(updateGrid(grid, store.getState().playerName));
      expect(store.getState().playerStates[0].grid[0][0]).to.equal(1);

      store.dispatch(startGame([{
        num: 2,
        rot: 3,
        pos: {x: 2, y: 10},
      }]));
      expect(store.getState().piecesFlow[0].num).to.equal(2);

      store.dispatch(addWallLine());
      expect(store.getState().playerStates[0].grid[GRID_HEIGHT - 1][0]).to.equal(-1);
    });
  });
});
