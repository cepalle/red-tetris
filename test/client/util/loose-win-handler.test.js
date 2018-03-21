import {GRID_HEIGHT, GRID_WIDTH} from "../../../src/common/grid";
import {ifLooseSet} from "../../../src/client/util/loose-win-handler";
import {expect} from "chai";

describe('end-loose-win-handler', () => {
  describe('#getColorNum', () => {
    it('should getCorrectColorNum', () => {

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

      ifLooseSet(state);
      expect(state.playerStates[0].hasLoose).to.equal(false);
      expect(state.playerStates[0].hasWin).to.equal(false);
      expect(state.playerStates[1].hasLoose).to.equal(false);
      expect(state.playerStates[1].hasWin).to.equal(false);

      state.playerStates[0].grid[3][0] = 1;
      ifLooseSet(state);
      expect(state.playerStates[0].hasLoose).to.equal(true);
      expect(state.playerStates[0].hasWin).to.equal(false);
      expect(state.playerStates[1].hasLoose).to.equal(false);
      expect(state.playerStates[1].hasWin).to.equal(true);
      expect(state.SetAnimateFalse).to.equal(true);
      expect(state.EmitLoose).to.equal(true);
    });
  });
});
