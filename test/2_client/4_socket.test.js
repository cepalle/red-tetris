import {
  emitJoinRoom,
  emitStartPlaying,
  emitGenFlow,
  emitTetrisPlacePiece,
  emitPlayerLoose,
  emitPlayerCompleteLine,
  cbPacketPlayerJoin,
  cbPacketPlayerQuit,
  cbPacketPlayerPromoted,
  cbPacketPlayerLose,
  cbPacketGameStart,
  cbPacketGenFlow,
  cbPacketPlayerCompleteLine,
  cbPacketTetrisPlacePiece,
  cbJoinRoomResponse,
  cbQuitRoomResponse,
  cbStartPlayingResponse,
  cbConnectionResponse,
  cbTetrisPlacePieceResponse,
  cbPlayerLooseResponse,
  cbPlayerCompleteLineResponse,
  cbGenFlowResponse,
  emitHome,
  emitQuitGame,
} from "../../src/client/util/socket-handler";
import Game from "../../src/server/data/game/Game";
import GameManager from "../../src/server/data/game/GameManager";

describe('socket test', () => {
  it('reducerUpdateGrid', () => {
    emitGenFlow("room");
    emitPlayerLoose("room101", "player42");
    emitPlayerCompleteLine("qwefad", "dadas", 10);
    emitQuitGame("grwse", "dqdsa");

    cbPacketPlayerJoin({});
    cbPacketPlayerQuit({});
    cbPacketPlayerPromoted({});
    cbPacketPlayerLose({});

    cbPacketGenFlow({});
    cbPacketPlayerCompleteLine({});
    cbPacketTetrisPlacePiece({});
    cbJoinRoomResponse({});
    cbQuitRoomResponse({});
    cbStartPlayingResponse({});
    cbTetrisPlacePieceResponse({});
    cbPlayerCompleteLineResponse({});
    cbGenFlowResponse({});
  });
});
