require("../../../../src/server/util/ArraysUtil");
import Game from "../../../../src/server/data/game/Game";

var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Game', function () {

  describe('#constructor', function () {
    it('should be a Game', function () {
      const g = new Game("newGame");
      expect(g).to.have.property('players').with.lengthOf(0);
      expect(g).to.have.property('name').with.eq("newGame");
      expect(g).to.have.property("waiting").with.eq(true);
    });
  });

  describe('#addPlayer', function () {

    it('should add a player to the Game', function () {
      const g = new Game("newGame");
      const player = g.addPlayer("Alexis", "36", false);
      expect(g).to.have.property('players').with.lengthOf(1);
      const playerFinded = g.players.find(e => e === player);
      assert.equal(player, playerFinded);
    });
    it('should add a lot of players to the Game', function () {
      const g = new Game("newGame");
      const player = g.addPlayer("Alexis", "36", false);
      g.addPlayer("Alexis1", "336", false);
      g.addPlayer("Alexis2", "436", false);
      g.addPlayer("Alexis3", "536", false);
      expect(g).to.have.property('players').with.lengthOf(4);
      const playerFinded = g.players.find(e => e === player);
      assert.equal(player, playerFinded);
    });

    it('should not add a player to the Game because invalid argument', function () {
      const g = new Game("newGame");
      const player = g.addPlayer(undefined, "36", false);
      expect(g).to.have.property('players').with.lengthOf(0);
    });
    it('should not add the second player because they have the same name', function () {
      const g = new Game("newGame");
      g.addPlayer("Alexis", "36", false);
      g.addPlayer("Alexis", "58", false);
      expect(g).to.have.property('players').with.lengthOf(1);
    });
    it('should not add the second player because they have the same id', function () {
      const g = new Game("newGame");
      g.addPlayer("Alexis", "36", false);
      g.addPlayer("Alexis2", "36", false);
      expect(g).to.have.property('players').with.lengthOf(1);
    });
  });

  describe('#removePlayer', function () {
    it('should remove the player from the game', function () {
      const g = new Game("newGame");
      const p1 = g.addPlayer("Alexis", "36", false);
      const p2 = g.removePlayer("Alexis");
      assert.equal(p1, p2);
      expect(g).to.have.property('players').with.lengthOf(0);
    });
    it('should remove the good player from the game', function () {
      const g = new Game("newGame");
      const p1 = g.addPlayer("Alexis", "36", false);
      const p3 = g.addPlayer("Kevin", "37", false);
      const p2 = g.removePlayer("Alexis");
      assert.equal(p1, p2);
      expect(g).to.have.property('players').with.lengthOf(1);
      assert.equal(g.players[0], p3);
    });

    it('should promote a new player', function () {
      const g = new Game();
      g.addPlayer("Alex", "123", true);
      g.addPlayer("Alex1", "1234", false);
      g.removePlayer("Alex");
      assert.equal(g.players.filter(e => e.master === true).length, 1);
    });

    it('should do nothing', function () {
      const g = new Game("newGame");
      const p = g.removePlayer("Alexis");
      assert.equal(p, undefined);
    });
    it('should not remove the one element', function () {
      const g = new Game("newGame");
      g.addPlayer("Alexis", "4556");
      const p2 = g.removePlayer("AlexisUndefined");
      assert.equal(p2, undefined);
      expect(g).to.have.property('players').with.lengthOf(1);
    });
  });

  describe('#getPlayer', function () {
    it('should return a player', function () {
      const g = new Game("newGame");
      const p = g.addPlayer("Alexis", "123");
      assert.equal(p, g.getPlayer("123"));
    });

    it('should not return a player', function () {
      const g = new Game("newGame");
      g.addPlayer("Alexis", "123");
      assert.equal(g.getPlayer("456"), undefined);
    });
  });

  describe('#containId', function () {
    it('should return true', function () {
      const g = new Game("newGame");
      g.addPlayer("Alexis", "123");
      assert.equal(g.containId("123"), true);
    });

    it('should return false', function () {
      const g = new Game("newGame");
      g.addPlayer("Alexis", "123");
      assert.equal(g.containId("456"), false);
    });
  });

  describe('#containPlayer', function () {
    it('should return true', function () {
      const g = new Game("newGame");
      g.addPlayer("Alexis", "123");
      assert.equal(g.containPlayer("Alexis"), true);
    });

    it('should return false', function () {
      const g = new Game("newGame");
      g.addPlayer("Alexis", "123");
      assert.equal(g.containPlayer("alexis"), false);
    });
  });

  describe('#gameHasEnd', function () {
    it('should return true alone', function () {
      const g = new Game("newGame");
      const p = g.addPlayer("Alex", "123");
      p.loose = true;
      assert.equal(g.gameHasEnd(), true);
    });
    it('should return true many players', function () {
      const g = new Game("newGame");
      const p = g.addPlayer("Alex", "123");
      const p4 = g.addPlayer("Alex3", "1235");
      const p2 = g.addPlayer("Alex2", "1234");
      p.loose = true;
      p4.loose = true;
      assert.equal(g.gameHasEnd(), true);
    });

    it('should return set all player lose to false', function () {
      const g = new Game("newGame");
      g.addPlayer("Alex", "123");
      g.addPlayer("Alex2", "1234");
      g.gameHasEnd();
      assert.equal(g.players.filter(e => e.loose === true).length, 0);
    });

    it('should return false because my players didn\'t loose', function () {
      const g = new Game("newGame");
      g.addPlayer("Alex", "123");
      const p = g.addPlayer("Alex3", "1235");
      g.addPlayer("Alex2", "1234");
      p.loose = true;
      assert.equal(g.gameHasEnd(), false);
    });
    it('should return false because the only player didn\'t loose', function () {
      const g = new Game("newGame");
      g.addPlayer("Alex", "123");
      assert.equal(g.gameHasEnd(), false);
    });
  });



  describe('#setWaiting', function () {
    it('should set waiting state to the waiting state desired', function () {
      const g = new Game("newGame");
      g.setWaiting(true);
      assert.equal(g.waiting, true);
      g.setWaiting(false);
      assert.equal(g.waiting, false);
    });
  });

  describe('#promoteNewPlayer', function () {
    it('should not promote a new player because no players available', function () {
      const g = new Game("hey");
      g.promoteNewPlayer();
      assert.equal(g.players.filter(e => e.master === true).length, 0);
    });
    it('should not promote because a player is already master', function () {
      const g = new Game("hey");
      g.addPlayer("123", "456", true);
      g.addPlayer("1234", "4565", false);
      g.promoteNewPlayer();
      assert.equal(g.players.filter(e => e.master === true).length, 1);
    });
    it('should promote because no master in the game', function () {
      const g = new Game("hey");
      g.addPlayer("123", "456", false);
      g.addPlayer("1234", "4565", false);
      g.promoteNewPlayer();
      assert.equal(g.players.filter(e => e.master === true).length, 1);
    });
  });

  describe('#canJoin', function () {
    it('should return waiting state', function () {
      const g = new Game("hey");
      assert.equal(g.canJoin(), true);
      g.setWaiting(false);
      assert.equal(g.canJoin(), false);
    });
  });
});
