import "../../../src/server/App"
import GlobalSocketHandler from "../../../src/server/handlers/GlobalSocketHandler";
import {expect, assert} from "chai";
import io from 'socket.io-client';
import socketDefs from "../../../src/common/socketEvent";

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
});
