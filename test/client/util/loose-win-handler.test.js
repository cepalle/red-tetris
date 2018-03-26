import {ifLooseSet} from "../../../src/client/util/loose-win-handler";
import {expect} from "chai";
import {getState} from "../state.test";

describe('end-loose-win-handler', () => {
  describe('#ifLooseSet', () => {
    it('should getCorrectColorNum', () => {
      let newState = getState();
      ifLooseSet(newState);
      expect(newState.playerStates[0].loose).to.equal(false);
      expect(newState.playerStates[0].win).to.equal(false);
      expect(newState.playerStates[1].loose).to.equal(false);
      expect(newState.playerStates[1].win).to.equal(false);

      newState.playerStates[0].grid[3][0] = 1;
      ifLooseSet(newState);
      expect(newState.playerStates[0].loose).to.equal(true);
      expect(newState.playerStates[0].win).to.equal(false);
      expect(newState.playerStates[1].loose).to.equal(false);
      expect(newState.playerStates[1].win).to.equal(true);
      expect(newState.SetAnimateFalse).to.equal(true);
      expect(newState.EmitLoose).to.equal(true);
    });
  });
});
