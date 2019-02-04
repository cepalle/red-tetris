import app from "../../../src/server/App"
import GlobalSocketHandler from "../../../src/server/handlers/GlobalSocketHandler";
import {expect, assert} from "chai";
import io from 'socket.io-client';
import socketDefs from "../../../src/common/socket-definitions";
import GameManager from "../../../src/server/data/game/GameManager";


describe('Socket tests', function () {

  describe('GlobalSocketHandler', function () {
    describe('#emitConnection', function () {
      it('should emit a connection', function (done) {
        const socket = io('http://localhost:4433');
        socket.on(socketDefs.CONNECTION_RESPONSE, () => {
          done();
          socket.disconnect();
        });
      });
    });

    describe("placePiece", () => {
      it("should send the piece placed", function (done) {
        const socket = io('http://localhost:4433');
        const socket2 = io('http://localhost:4433');
        socket.emit(socketDefs.JOIN_GAME, {roomName: "test4", playerName: "player"});
        socket2.emit(socketDefs.JOIN_GAME, {roomName: "test4", playerName: "player2"});
        socket.on(socketDefs.PACKET_TETRIS_PLACE_PIECE, (data) => {
          if (data.grid) done();
          else done("Error while receiving packet on tetris place piece")
        });
        setTimeout(() => socket2.emit(socketDefs.START_PLAYING, {}), 50);
        setTimeout(() => socket2.emit(socketDefs.TETRIS_PLACE_PIECE, {grid: [[]], playerName: "player2"}), 70);
      })
    });
  });
  describe('RoomSocketHandler', function () {
    describe('#joinRoom', function () {

      it('should create a room and return success', function (done) {
        const socket = io('http://localhost:4433');
        socket.on(socketDefs.JOIN_GAME_RESPONSE, (data) => {
          if (data.success)
            done();
          else
            done(data.error);
          GameManager.rooms = [];
          socket.disconnect();
        });
        socket.emit(socketDefs.JOIN_GAME, {roomName: "test", playerName: "player"});
      });
      it('should not add the player because already in game', function (done) {
        const socket = io('http://localhost:4433');
        const socket2 = io('http://localhost:4433');
        socket.on(socketDefs.JOIN_GAME_RESPONSE, (data) => {
          if (!data.success) done(data.error);
        });
        socket2.on(socketDefs.JOIN_GAME_RESPONSE, (data) => {
          if (data.success) done("Error because room already with this name");
          else done();
          socket.disconnect();
          socket2.disconnect();
          GameManager.rooms = [];
        });
        socket.emit(socketDefs.JOIN_GAME, {roomName: "test", playerName: "player"});
        setTimeout(() => socket2.emit(socketDefs.JOIN_GAME, {roomName: "test", playerName: "player"}), 10);
      });
      it('should add player in  spectator because game already started', function (done) {
        const socket = io('http://localhost:4433');
        const socket2 = io('http://localhost:4433');
        socket.on(socketDefs.JOIN_GAME_RESPONSE, (data) => {
          if (!data.success) done(data.error);
        });
        socket2.on(socketDefs.JOIN_GAME_RESPONSE, (data) => {
          if (data.success) {
            assert.equal(GameManager.getGame("test1").players.find(e => e.playerName === "player2").spectator, true);
            done()
          } else done("play is normally in spectator");
          GameManager.rooms = [];
          socket.disconnect();
          socket2.disconnect();
        });
        socket.emit(socketDefs.JOIN_GAME, {roomName: "test1", playerName: "player"});
        socket.emit(socketDefs.START_PLAYING, {roomName: "test1"});
        setTimeout(() => socket2.emit(socketDefs.JOIN_GAME, {roomName: "test1", playerName: "player2"}), 50);
      });
    });

    describe("#quitRoom", function () {
      it("should quit player", function (done) {
        const socket = io('http://localhost:4433');
        socket.emit(socketDefs.JOIN_GAME, {roomName: "test3", playerName: "player"});
        setTimeout(() => socket.emit(socketDefs.QUIT_GAME, {roomName: "test3", playerName: "player"}), 50);
        setTimeout(() => {
          assert.isUndefined(GameManager.getGame("test3"));
          done();
        }, 150);
      });
      it("should not quit player", function (done) {
        const socket = io('http://localhost:4433');
        socket.emit(socketDefs.JOIN_GAME, {roomName: "test3", playerName: "player"});
        setTimeout(() => socket.emit(socketDefs.QUIT_GAME, {roomName: "test3", playerName: "player2"}), 50);
        setTimeout(() => {
          assert.isNotNull(GameManager.getGame("test3"));
          GameManager.rooms = [];
          done();
        }, 150);
      })
    });
  });
  describe("TetrisSocketHandler", function () {
    describe("placePiece", () => {
      it("should send the piece placed", function (done) {
        const socket = io('http://localhost:4433');
        const socket2 = io('http://localhost:4433');
        socket.emit(socketDefs.JOIN_GAME, {roomName:"test4", playerName:"player"});
        socket2.emit(socketDefs.JOIN_GAME, {roomName:"test4", playerName:"player2"});
        socket.on(socketDefs.PACKET_TETRIS_PLACE_PIECE, (data) => {
          if (data.grid) done();
          else done("Error while receiving packet on tetris place piece")
        });
        setTimeout(() => socket2.emit(socketDefs.START_PLAYING, {}), 50);
        setTimeout(() => socket2.emit(socketDefs.TETRIS_PLACE_PIECE, {grid: [[]], playerName: "player2"}), 70);
      })
    })
  });

  after(() => {
    Object.values(app.io.of("/").connected).forEach(e => e.disconnect());
    app.io.close();
    app.server.close();
  })
});

