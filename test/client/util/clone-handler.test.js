import {cloneState} from "../../../src/client/util/clone-handler";
import {expect} from "chai"
import {GRID_HEIGHT, GRID_WIDTH} from "../../../src/common/grid";


describe('clone-handler', () => {
  describe('#cloneState', () => {
    it('should clone the State', () => {
      const state = {
        playerStates: [
          {
            grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0)),
            playerName: "playerName",
            isMaster: true,
            hasLoose: false,
            hasWin: false,
          },
          {
            grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0)),
            playerName: "playerName2",
            isMaster: false,
            hasLoose: false,
            hasWin: false,
          },
        ],
        piecesFlow: [
          {
            num: 1,
            rot: 0,
            pos: {x: 0, y: 0},
          },
          {
            num: 5,
            rot: 3,
            pos: {x: 1, y: 2},
          },
        ],
        error: {message: "rererer", type: "dff"},
        playerName: "playerName",
        roomName: "roonName",
        EmitLoose: false,
        EmitUpdateGrid: false,
        EmitCompleteLine: 0,
        SetAnimateTrue: false,
        SetAnimateFalse: false,
      };
      const newState = cloneState(state);

      expect(state === newState).to.equal(false);
      expect(state.playerStates === newState.playerStates).to.equal(false);
      for (let i = 0; i < state.playerStates.length; i++) {
        expect(state.playerStates[i].grid === newState.playerStates[i].grid).to.equal(false);
        for (let j = 0; j < state.playerStates[i].grid.length; j++) {
          expect(state.playerStates[i].grid[j] === newState.playerStates[i].grid[j]).to.equal(false);
          for (let k = 0; k < state.playerStates[i].grid[j].length; k++) {
            expect(state.playerStates[i].grid[j][k] === newState.playerStates[i].grid[j][k]).to.equal(true);
          }
        }
        expect(state.playerStates[i].playerName === newState.playerStates[i].playerName).to.equal(true);
        expect(state.playerStates[i].isMaster === newState.playerStates[i].isMaster).to.equal(true);
        expect(state.playerStates[i].hasLoose === newState.playerStates[i].hasLoose).to.equal(true);
        expect(state.playerStates[i].hasWin === newState.playerStates[i].hasWin).to.equal(true);
      }
      expect(state.piecesFlow === newState.piecesFlow).to.equal(false);
      for (let i = 0; i < state.piecesFlow; i++) {
        expect(state.piecesFlow[i] === newState.piecesFlow[i]).to.equal(false);
        expect(state.piecesFlow[i].num === newState.piecesFlow[i].num).to.equal(true);
        expect(state.piecesFlow[i].rot === newState.piecesFlow[i].rot).to.equal(true);
        expect(state.piecesFlow[i].pos === newState.piecesFlow[i].pos).to.equal(false);
        expect(state.piecesFlow[i].pos.x === newState.piecesFlow[i].pos.x).to.equal(true);
        expect(state.piecesFlow[i].pos.y === newState.piecesFlow[i].pos.y).to.equal(true);
      }
      expect(state.error === newState.error).to.equal(false);
      if (state.error) {
        expect(state.error.message === newState.error.message).to.equal(true);
        expect(state.error.type === newState.error.type).to.equal(true);
      }
    });
  });
});
