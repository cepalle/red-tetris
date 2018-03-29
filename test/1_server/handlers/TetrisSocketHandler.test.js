import "../../../src/server/App"
import GlobalSocketHandler from "../../../src/server/handlers/GlobalSocketHandler";
import {expect, assert} from "chai";
import io from 'socket.io-client';
import socketDefs from "../../../src/common/socket-definitions";
import GameManager from "../../../src/server/data/game/GameManager"


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
