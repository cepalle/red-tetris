require("../../../../src/server/util/ArraysUtil");
import Game from "../../../../src/server/data/game/Game";
import GameManager from "../../../../src/server/data/game/GameManager";

var assert = require('chai').assert;
var expect = require('chai').expect;

describe('GameManager', function () {
  describe('#addGame', function () {
    it('should create a game', function () {
      const room = GameManager.addGame("hey");
      assert.notEqual(room, false);
      expect(GameManager).to.have.property('rooms').with.lengthOf(1);
      GameManager.addGame("hey2");
      expect(GameManager).to.have.property('rooms').with.lengthOf(2);
      GameManager.rooms = [];
    });
    it('should not create a game', function () {
      const room = GameManager.addGame("hey");
      const room1 = GameManager.addGame("hey");
      assert.notEqual(room, false);
      assert.equal(room1, false);
      expect(GameManager).to.have.property('rooms').with.lengthOf(1);
      GameManager.rooms = [];
    });
  });

  describe('#getGame', function () {
    it('should return a game', function () {
      const room = GameManager.addGame("hey");
      assert.equal(GameManager.getGame("hey"), room);
      GameManager.rooms = [];
    });
    it('should return undefined', function () {
      assert.equal(GameManager.getGame("hey"), undefined);
    });
  });

  describe('#getGameId', function () {
    it('should return a game', function () {
      const room = GameManager.addGame("hey");
      room.addPlayer("l", "123");
      assert.equal(GameManager.getGameById("123"), room);
      GameManager.rooms = [];
    });
    it('should return undefined', function () {
      assert.equal(GameManager.getGameById("123"), undefined);
    });
  });

  describe('#hasGame', function () {
    it('should return true', function () {
      GameManager.addGame("hey");
      GameManager.addGame("hey2");
      assert.equal(GameManager.hasGame("hey"), true);
      assert.equal(GameManager.hasGame("hey2"), true);
      GameManager.rooms = [];
    });
    it('should return false', function () {
      assert.equal(GameManager.hasGame("hey"), false);
      assert.equal(GameManager.hasGame({}), false);
      GameManager.rooms = [];
    });
  });

  describe('#deleteGame', function () {
    it('should delete the game', function () {
      GameManager.addGame("hey");
      GameManager.deleteGame("hey");
      expect(GameManager).to.have.property('rooms').with.lengthOf(0);
      GameManager.rooms = [];
    });
    it('should delete multiples games', function () {
      GameManager.addGame("hey");
      GameManager.addGame("hey2");
      const res1 = GameManager.deleteGame("hey");
      assert.equal(res1, true);
      expect(GameManager).to.have.property('rooms').with.lengthOf(1);
      const res2 = GameManager.deleteGame("hey2");
      assert.equal(res2, true);
      expect(GameManager).to.have.property('rooms').with.lengthOf(0);
      GameManager.rooms = [];
    });
    it('should not delete anything', function () {
      GameManager.addGame("hey");
      const res = GameManager.deleteGame("123");
      assert.equal(res, false);
      expect(GameManager).to.have.property('rooms').with.lengthOf(1);
      GameManager.rooms = [];
    });
  });
});
