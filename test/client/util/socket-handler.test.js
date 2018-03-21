import {
  cbConnectionResponse, cbGenFlowResponse,
  cbJoinRoomResponse,
  cbPacketGameStart, cbPacketGenFlow, cbPacketPlayerCompleteLine,
  cbPacketPlayerJoin, cbPacketPlayerLose, cbPacketPlayerPromoted,
  cbPacketPlayerQuit, cbPacketTetrisPlacePiece, cbPlayerCompleteLineResponse, cbPlayerLooseResponse, cbQuitRoomResponse,
  cbStartPlayingResponse,
  cbTetrisPlacePieceResponse, emitPlayerLoose
} from "../../../src/client/util/socket-handler"
import Player from "../../../src/server/data/player/Player"
import {store} from "../../../src/client/middlewares/store"
import {GRID_HEIGHT, GRID_WIDTH} from "../../../src/common/grid"

describe('socket-handler', () => {
  describe('#callback-test', () => {
    it('callback-test', () => {

      let game = {
        game: {
          players: [new Player(
            store.getState().playerName, "", 0, true
          )]
        }
      }
      let error = {
        error: {
          message: "msg",
          type: "type",
        }
      }
      let pieces = {
        pieces: [
          {
            num: 2,
            rot: 3,
            pos: {x: 2, y: 10},
          },
          {
            num: 2,
            rot: 3,
            pos: {x: 2, y: 10},
          },
          {
            num: 2,
            rot: 3,
            pos: {x: 2, y: 10},
          }
        ]
      }
      cbPacketPlayerJoin(game);
      cbPacketPlayerQuit(game);
      cbPacketPlayerPromoted(game);
      cbPacketPlayerLose(game);
      cbPacketGameStart(pieces);
      cbPacketGenFlow(pieces);
      cbPacketPlayerCompleteLine();

      let grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(1));
      cbPacketTetrisPlacePiece({
        grid: grid,
        playerName: store.getState().playerName
      });
      cbJoinRoomResponse(error);
      cbJoinRoomResponse(game);
      cbQuitRoomResponse(error);
      cbQuitRoomResponse(game);
      cbStartPlayingResponse(error);
      cbConnectionResponse(error);
      cbTetrisPlacePieceResponse(error);
      cbPlayerLooseResponse(error);
      cbPlayerCompleteLineResponse(error);
      cbGenFlowResponse(error);

      emitPlayerLoose("slslls", "ssas");
    });
  });
});
