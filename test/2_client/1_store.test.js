import {store} from "../../src/client/middlewares/store";
import {
  addError,
  addPiecesFlow,
  connectionResponse,
  movePiece,
  sendStartGame,
  toggleGroundResizer,
  toggleAddWallLine,
  emitQuitGame,
  updateRoomPlayerName,
  updateEmiteUpdateGrid,
  updateSocketIsConnect
} from "../../src/client/actions/action-creators";
import {PIECES_MOVE} from "../../src/common/pieces";
import {eventHandler} from "../../src/client/util/event-handler";

describe('store test', () => {
  it('dispatch error', () => {
    const er = {
      type: "TEST",
      message: "TEST_MESSAGE"
    };
    store.dispatch(addError(er));
  });
  it('dispatch toggle AddWallLine GroundResizer', () => {
    store.dispatch(toggleAddWallLine());
    store.dispatch(toggleGroundResizer());
  });
  it('dispatch connectionResponse', () => {
    store.dispatch(connectionResponse());
    store.dispatch(emitQuitGame());
    store.dispatch(connectionResponse());
  });
  it('dispatch connectionResponse', () => {
    store.dispatch(connectionResponse());
    store.dispatch(emitQuitGame());
    store.dispatch(connectionResponse());
  });
  it('dispatch sendStartGame', () => {
    store.dispatch(sendStartGame());
  });
  it('dispatch eventHandler no Name', () => {
    const event = {
      keyCode: 0,
      preventDefault: () => {},
    };
    eventHandler(event);
  });
  it('dispatch updateRoomPlayerName', () => {
    store.dispatch(updateRoomPlayerName("roomName", "playerName"));
  });
  it('dispatch sendStartGame', () => {
    store.dispatch(sendStartGame());
  });
  it('dispatch no flow', () => {
    store.dispatch(movePiece(PIECES_MOVE.DOWN));
  });
  it('dispatch add Flow', () => {
    const pieces = [
      {
        num: 1,
        rot: 1,
        pos: {x: 5, y: 10}
      },
      {
        num: 1,
        rot: 1,
        pos: {x: 5, y: 10}
      },
      {
        num: 1,
        rot: 1,
        pos: {x: 5, y: 10}
      },
      {
        num: 1,
        rot: 1,
        pos: {x: 5, y: 10}
      },
      {
        num: 1,
        rot: 1,
        pos: {x: 5, y: 10}
      },
    ];
    store.dispatch(addPiecesFlow(pieces));
  });
  it('dispatch eventHandler with Name', () => {
    const event = {
      keyCode: 0,
      preventDefault: () => {},
    };
    eventHandler(event, false, () => {});
    event.keyCode = 13;
    eventHandler(event, false, () => {});
    event.keyCode = 32;
    eventHandler(event, false, () => {});
    event.keyCode = 37;
    eventHandler(event, false, () => {});
    event.keyCode = 38;
    eventHandler(event, false, () => {});
    event.keyCode = 39;
    eventHandler(event, false, () => {});
    event.keyCode = 40;
    eventHandler(event, false, () => {});
    event.keyCode = 83;
    eventHandler(event, false, () => {});
    event.keyCode = 67;
    eventHandler(event, false, () => {});
  });
  it('dispatch move', () => {
    store.dispatch(movePiece(PIECES_MOVE.ROT_LEFT));
    for (let i = 0; i < 15; i++) {
      store.dispatch(movePiece(PIECES_MOVE.LEFT));
    }
    for (let i = 0; i < 15; i++) {
      store.dispatch(movePiece(PIECES_MOVE.RIGHT));
    }
    store.dispatch(movePiece(PIECES_MOVE.SWITCH));
  });

  it('dispatch UPDATE_EMITE_UPDATE_GRID', () => {
    store.dispatch(updateEmiteUpdateGrid(true));
  });

  it('dispatch UPDATE_SOCKET_IS_CONNECT', () => {
    store.dispatch(updateSocketIsConnect(true));
  });

  it('middleware', () => {
    store.getState().EmitLoose = true;
    store.getState().EmitCompleteLine = true;
    store.dispatch(movePiece(PIECES_MOVE.SWITCH));
  });
});
