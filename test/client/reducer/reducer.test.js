import {store} from "../../../src/client/middlewares/store";
import {addPiecesFlow} from "../../../src/client/actions/action-creators";
import Piece from "../../../src/server/data/piece/Piece";
import {expect} from "chai";

describe('reducer', () => {
  describe('#reducerPiecesFlow', () => {
    it('should reduce action ', () => {

      store.dispatch(addPiecesFlow([new Piece(2, 1, {x:0, y:0})]));
      expect(store.getState().piecesFlow[0].num).to.equal(2);

      /*
      let newState = reducer(getState(), addPiecesFlow([{
        num: 2,
        rot: 3,
        pos: {x: 2, y: 10},
      }]));
      newState = reducer(getState(), addError({
        message: "msg",
        type: "type",
      }));
      expect(newState.error.message).to.equal("msg");
      expect(newState.error.type).to.equal("type");

      newState = reducer(getState(), updatePlayers([{
        num: 2,
        rot: 3,
        pos: {x: 2, y: 10},
      }]));
      expect(newState.piecesFlow[2].num).to.equal(2);

      newState = reducer(getState(), movePiece(PIECES_MOVE.DOWN));
      expect(newState.piecesFlow[0].pos.x).to.equal(1);

      let grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(1));
      newState = reducer(getState(), updateGrid(grid, getState.playerName));
      expect(newState.playerStates[0].grid[0][0]).to.equal(1);

      newState = reducer(getState(), startGame([{
        num: 2,
        rot: 3,
        pos: {x: 2, y: 10},
      }]));
      expect(newState.piecesFlow[2].num).to.equal(2);

      newState = reducer(getState(), addWallLine());
      //expect(newState.piecesFlow[2].num).to.equal(2);
      */
    });
  });
});
