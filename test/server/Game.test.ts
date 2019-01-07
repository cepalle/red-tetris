import {expect} from 'chai';
import {describe, it} from 'mocha';
import {ADD_PLAYER, EnumActionRoomStore} from '../../src/server/Game';

describe('Game.test.ts', () => {

  it('ADD_PLAYER', () => {
    const test = ADD_PLAYER('playerName', {} as any);
    expect(test.type).to.equal(EnumActionRoomStore.ADD_PLAYER);
  });

});
