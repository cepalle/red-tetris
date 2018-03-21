import {expect} from "chai";
import {
  COLLISION_TYPE, eraseCurPiece, gridAddWall, gridDelLine, hasCollision, newLoc,
  placePiece, updatePiecePos
} from "../../../src/client/util/grid-piece-handler";
import {GRID_HEIGHT, GRID_WIDTH} from "../../../src/common/grid";
import {PIECES_MOVE} from "../../../src/common/pieces";
import {getState} from "../state.test";


describe('grid-piece-handler', () => {
  describe('#hasCollision', () => {
    it('should detect good COLLISION', () => {

      const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0));
      const piece = [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      const loc = {x: 0, y: 0};

      expect(hasCollision(grid, piece, loc)).to.equal(undefined);
      grid[1][0] = 1;
      expect(hasCollision(grid, piece, loc)).to.equal(COLLISION_TYPE.PIECE);
      grid[1][0] = 1;
      loc.x = -1;
      expect(hasCollision(grid, piece, loc)).to.equal(COLLISION_TYPE.WALL_LEFT);
      loc.x = 99;
      expect(hasCollision(grid, piece, loc)).to.equal(COLLISION_TYPE.WALL_RIGHT);
      loc.x = 0;
      loc.y = -5;
      expect(hasCollision(grid, piece, loc)).to.equal(COLLISION_TYPE.WALL_TOP);
      loc.y = 99;
      expect(hasCollision(grid, piece, loc)).to.equal(COLLISION_TYPE.WALL_BOTTOM);
    });
  });

  describe('#placePiece and eraseCurPiece', () => {
    it('should place piece and erase piece', () => {

      let newState = placePiece(getState());
      expect(newState.playerStates[0].grid[1][0]).to.equal(1);
      expect(newState.playerStates[0].grid[1][1]).to.equal(1);
      expect(newState.playerStates[0].grid[1][2]).to.equal(1);
      expect(newState.playerStates[0].grid[1][3]).to.equal(1);

      newState = eraseCurPiece(newState);
      expect(newState.playerStates[0].grid[1][0]).to.equal(0);
      expect(newState.playerStates[0].grid[1][1]).to.equal(0);
      expect(newState.playerStates[0].grid[1][2]).to.equal(0);
      expect(newState.playerStates[0].grid[1][3]).to.equal(0);
    });
  });

  describe('#newLoc', () => {
    it('should return the new loc', () => {

      let loc = {x: 0, y: 0};
      loc = newLoc(loc, PIECES_MOVE.DOWN);
      expect(loc.y).to.equal(1);
      loc = newLoc(loc, PIECES_MOVE.LEFT);
      expect(loc.x).to.equal(-1);
      loc = newLoc(loc, PIECES_MOVE.RIGHT);
      expect(loc.x).to.equal(0);
      loc = newLoc(loc, undefined);
      expect(loc.x).to.equal(0);
    });
  });

  describe('#gridDelLine', () => {
    it('should del a line', () => {
      let newState = getState();
      newState.playerStates[0].grid[0] = Array(GRID_WIDTH).fill(1);
      let nbLineDel;
      [newState, nbLineDel] = gridDelLine(newState);
      expect(newState.playerStates[0].grid[0][0]).to.equal(0);
      expect(nbLineDel).to.equal(1);
    });
  });

  describe('#gridAddWall', () => {
    it('should a wall line', () => {
      let newState = getState();
      newState.playerStates[0].grid[0] = Array(GRID_WIDTH).fill(1);
      newState = gridAddWall(newState);
      expect(newState.playerStates[0].grid[GRID_HEIGHT - 1][0]).to.equal(-1);
    });
  });

  describe('#updatePiecePos', () => {
    it('should update the piece', () => {
      let newState;
      let needNext;
      [needNext, newState] = updatePiecePos(getState(), PIECES_MOVE.DOWN);
      expect(newState.piecesFlow[0].pos.y).to.equal(1);
      expect(needNext).to.equal(false);
      [needNext, newState] = updatePiecePos(getState(), PIECES_MOVE.ROT_RIGHT);
      expect(newState.piecesFlow[0].rot).to.equal(1);
      expect(needNext).to.equal(false);
      [needNext, newState] = updatePiecePos(getState(), PIECES_MOVE.ROT_LEFT);
      expect(newState.piecesFlow[0].rot).to.equal(3);
      expect(needNext).to.equal(false);
      [needNext, newState] = updatePiecePos(getState(), PIECES_MOVE.DROP);
      expect(newState.piecesFlow[0].pos.y).to.equal(GRID_HEIGHT - 2);
      expect(needNext).to.equal(true);
      [needNext, newState] = updatePiecePos(newState, PIECES_MOVE.DOWN);
      expect(newState.piecesFlow[0].pos.y).to.equal(GRID_HEIGHT - 2);
      expect(needNext).to.equal(true);
    });
  });

});
