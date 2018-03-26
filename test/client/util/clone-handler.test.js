import {cloneState} from "../../../src/client/util/clone-handler";
import {expect} from "chai"
import {getState} from "../state.test";

describe('clone-handler', () => {
  describe('#cloneState', () => {
    it('should clone the State', () => {
      const newState = cloneState(getState());

      expect(getState() === newState).to.equal(false);
      expect(getState().playerStates === newState.playerStates).to.equal(false);
      for (let i = 0; i < getState().playerStates.length; i++) {
        expect(getState().playerStates[i].grid === newState.playerStates[i].grid).to.equal(false);
        for (let j = 0; j < getState().playerStates[i].grid.length; j++) {
          expect(getState().playerStates[i].grid[j] === newState.playerStates[i].grid[j]).to.equal(false);
          for (let k = 0; k < getState().playerStates[i].grid[j].length; k++) {
            expect(getState().playerStates[i].grid[j][k] === newState.playerStates[i].grid[j][k]).to.equal(true);
          }
        }
        expect(getState().playerStates[i].playerName === newState.playerStates[i].playerName).to.equal(true);
        expect(getState().playerStates[i].master === newState.playerStates[i].master).to.equal(true);
        expect(getState().playerStates[i].loose === newState.playerStates[i].loose).to.equal(true);
        expect(getState().playerStates[i].win === newState.playerStates[i].win).to.equal(true);
      }
      expect(getState.piecesFlow === newState.piecesFlow).to.equal(false);
      for (let i = 0; i < getState().piecesFlow; i++) {
        expect(getState().piecesFlow[i] === newState.piecesFlow[i]).to.equal(false);
        expect(getState().piecesFlow[i].num === newState.piecesFlow[i].num).to.equal(true);
        expect(getState().piecesFlow[i].rot === newState.piecesFlow[i].rot).to.equal(true);
        expect(getState().piecesFlow[i].pos === newState.piecesFlow[i].pos).to.equal(false);
        expect(getState().piecesFlow[i].pos.x === newState.piecesFlow[i].pos.x).to.equal(true);
        expect(getState().piecesFlow[i].pos.y === newState.piecesFlow[i].pos.y).to.equal(true);
      }
      expect(getState().error === newState.error).to.equal(false);
      if (getState().error) {
        expect(getState().error.message === newState.error.message).to.equal(true);
        expect(getState().error.type === newState.error.type).to.equal(true);
      }
    });
  });
});
