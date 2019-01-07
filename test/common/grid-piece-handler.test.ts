import {expect} from 'chai';
import {describe, it} from 'mocha';
import {calScore, GRID_WIDTH, initPose} from '../../src/common/grid-piece-handler';

describe('grid-piece-handler.test.ts', () => {

  it('initPose', () => {
    const result: { x: number; y: number } = initPose();
    expect(result.y).to.equal(0);
    expect(result.x <= GRID_WIDTH - 1).to.equal(true);
    expect(result.x >= 0).to.equal(true);
  });

  it('calScore ', () => {
    calScore(0);
    calScore(1);
    calScore(2);
    calScore(3);
    calScore(4);
  });

});
