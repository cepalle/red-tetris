import GlobalSocketHandler from "../../../src/server/handlers/GlobalSocketHandler";
import {expect, assert} from "chai";
import io from 'socket.io-client';
import socketDefs from "../../../src/common/socket-definitions";
import GameManager from "../../../src/server/data/game/GameManager"

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
      socket.emit(socketDefs.JOIN_GAME, {roomName:"test", playerName:"player"});
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
      socket.emit(socketDefs.JOIN_GAME, {roomName:"test", playerName:"player"});
      setTimeout(() => socket2.emit(socketDefs.JOIN_GAME, {roomName:"test", playerName:"player"}), 10);
    });
    it('should not add player because game already started', function (done) {
      const socket = io('http://localhost:4433');
      const socket2 = io('http://localhost:4433');
      socket.on(socketDefs.JOIN_GAME_RESPONSE, (data) => {
        if (!data.success) done(data.error);
      });
      socket2.on(socketDefs.JOIN_GAME_RESPONSE, (data) => {
        if (data.success) done("Error because room already started");
        else done();
        GameManager.rooms = [];
        socket.disconnect();
        socket2.disconnect();
      });
      socket.emit(socketDefs.JOIN_GAME, {roomName:"test1", playerName:"player"});
      socket.emit(socketDefs.START_PLAYING, {roomName:"test1"});
      setTimeout(() => socket2.emit(socketDefs.JOIN_GAME, {roomName:"test1", playerName:"player2"}), 10);
    });
  });
});
