import {expect} from "chai";
import {
  addError, addPiecesFlow, addWallLine, connectionResponse, movePiece, sendStartGame, startGame, updateGrid,
  updatePlayers
} from "../../../src/client/actions/action-creators";

describe('action-creators', () => {
  describe('#addPiecesFlow', () => {
    it('should create action addPiecesFlow', () => {
      let act = addPiecesFlow("test");
      expect(act.type).to.equal('ADD_PIECES_FLOW');
      expect(act.pieces).to.equal("test");
    });
    it('should create action addError', () => {
      let act = addError("test");
      expect(act.type).to.equal('ADD_ERROR');
      expect(act.error).to.equal("test");
    });
    it('should create action updatePlayers', () => {
      let act = updatePlayers("test");
      expect(act.type).to.equal('UPDATE_PLAYERS');
      expect(act.players).to.equal("test");
    });
    it('should create action movePiece', () => {
      let act = movePiece("test");
      expect(act.type).to.equal('PIECES_MOVE');
      expect(act.move).to.equal("test");
    });
    it('should create action updateGrid', () => {
      let act = updateGrid("test", "test2");
      expect(act.type).to.equal('UPDATE_GRID');
      expect(act.grid).to.equal("test");
      expect(act.playerName).to.equal("test2");
    });
    it('should create action startGame', () => {
      let act = startGame("test");
      expect(act.type).to.equal('RECV_START_GAME');
      expect(act.pieces).to.equal("test");
    });
    it('should create action addWallLine', () => {
      let act = addWallLine("test");
      expect(act.type).to.equal('ADD_WALL_LINE');
    });
    it('should create action connectionResponse', () => {
      let act = connectionResponse("test");
      expect(act.type).to.equal('CONNECTION_RESPONSE');
    });
    it('should create action sendStartGame', () => {
      let act = sendStartGame("test");
      expect(act.type).to.equal('SEND_START_GAME');
    });
  });
});
