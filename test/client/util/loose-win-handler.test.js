import {ifLooseSet} from "../../../src/client/util/loose-win-handler";
import {expect} from "chai";
import {getState} from "../state.test";

describe('end-loose-win-handler', () => {
  describe('#ifLooseSet', () => {
    it('should getCorrectColorNum', () => {
      let newState = getState();
      ifLooseSet(newState);
      expect(newState.playerStates[0].hasLoose).to.equal(false);
      expect(newState.playerStates[0].hasWin).to.equal(false);
      expect(newState.playerStates[1].hasLoose).to.equal(false);
      expect(newState.playerStates[1].hasWin).to.equal(false);

      newState.playerStates[0].grid[3][0] = 1;
      ifLooseSet(newState);
      expect(newState.playerStates[0].hasLoose).to.equal(true);
      expect(newState.playerStates[0].hasWin).to.equal(false);
      expect(newState.playerStates[1].hasLoose).to.equal(false);
      expect(newState.playerStates[1].hasWin).to.equal(true);
      expect(newState.SetAnimateFalse).to.equal(true);
      expect(newState.EmitLoose).to.equal(true);
    });
  });
});
