import {store} from "../../src/client/middlewares/store";
import {
  addError, addPiecesFlow, connectionResponse, movePiece, sendStartGame,
  toggleGroundResizer, toggleAddWallLine, emitQuitGame, updateRoomPlayerName
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
      preventDefault: () => undefined,
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
      preventDefault: () => undefined,
    };
    eventHandler(event);
    event.keyCode = 13;
    eventHandler(event);
    event.keyCode = 32;
    eventHandler(event);
    event.keyCode = 37;
    eventHandler(event);
    event.keyCode = 38;
    eventHandler(event);
    event.keyCode = 39;
    eventHandler(event);
    event.keyCode = 40;
    eventHandler(event);
    event.keyCode = 83;
    eventHandler(event);
    event.keyCode = 67;
    eventHandler(event);
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
});
