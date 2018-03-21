import {getColorNum} from "../../../src/client/util/css-handler";
import {expect} from "chai";

describe('css-handler', () => {
  describe('#getColorNum', () => {
    it('should getCorrectColorNum', () => {
      expect(getColorNum(-1)).to.equal(8);
      expect(getColorNum(4)).to.equal(4);
      expect(getColorNum(9)).to.equal(0);
    });
  });
});
