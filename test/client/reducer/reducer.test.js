/*
import {
  addError, addPiecesFlow, addWallLine, movePiece, startGame, updateGrid,
  updatePlayers
} from "../../../src/client/actions/action-creators";
import {GRID_HEIGHT, GRID_WIDTH} from "../../../src/common/grid";
import {reducer} from "../../../src/client/reducers/reducer";
import {expect} from "chai";
import {PIECES_MOVE} from "../../../src/common/pieces";
import {getState} from "../state.test";

describe('reducer', () => {
  describe('#reducerPiecesFlow', () => {
    it('should reduce action ', () => {

      store.dispatch(addPiecesFlow([{
        num: 2,
        rot: 3,
        pos: {x: 2, y: 10},
      }]));

      let newState = reducer(getState(), addPiecesFlow([{
        num: 2,
        rot: 3,
        pos: {x: 2, y: 10},
      }]));
      expect(newState.piecesFlow[2].num).to.equal(2);

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
    });
  });
});
*/
