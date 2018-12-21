import {store} from "../../src/client/middlewares/store";
import {
  ADD_ERROR, ADD_PIECES_FLOW, CONNECTION_RESPONSE, PIECES_MOVE, SEND_START_GAME,
  TOGGLE_GROUND_RESIZER, TOGGLE_ADD_WALL_LINE, EMIT_QUIT_GAME, UPDATE_ROOM_PLAYER_NAME
} from "../../src/client/actions/action-creators";
import {PIECES_MOVE} from "../../src/common/pieces";
import {eventHandler} from "../../src/client/util/event-handler";

describe('store test', () => {
  it('dispatch error', () => {
    const er = {
      type: "TEST",
      message: "TEST_MESSAGE"
    };
    store.dispatch(ADD_ERROR(er));
  });
  it('dispatch toggle AddWallLine GroundResizer', () => {
    store.dispatch(TOGGLE_ADD_WALL_LINE());
    store.dispatch(TOGGLE_GROUND_RESIZER());
  });
  it('dispatch connectionResponse', () => {
    store.dispatch(CONNECTION_RESPONSE());
    store.dispatch(EMIT_QUIT_GAME());
    store.dispatch(CONNECTION_RESPONSE());
  });
  it('dispatch connectionResponse', () => {
    store.dispatch(CONNECTION_RESPONSE());
    store.dispatch(EMIT_QUIT_GAME());
    store.dispatch(CONNECTION_RESPONSE());
  });
  it('dispatch sendStartGame', () => {
    store.dispatch(SEND_START_GAME());
  });
  it('dispatch eventHandler no Name', () => {
    const event = {
      keyCode: 0,
      preventDefault: () => undefined,
    };
    eventHandler(event);
  });
  it('dispatch updateRoomPlayerName', () => {
    store.dispatch(UPDATE_ROOM_PLAYER_NAME("roomName", "playerName"));
  });
  it('dispatch sendStartGame', () => {
    store.dispatch(SEND_START_GAME());
  });
  it('dispatch no flow', () => {
    store.dispatch(PIECES_MOVE(PIECES_MOVE.DOWN));
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
    store.dispatch(ADD_PIECES_FLOW(pieces));
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
    store.dispatch(PIECES_MOVE(PIECES_MOVE.ROT_LEFT));
    for (let i = 0; i < 15; i++) {
      store.dispatch(PIECES_MOVE(PIECES_MOVE.LEFT));
    }
    for (let i = 0; i < 15; i++) {
      store.dispatch(PIECES_MOVE(PIECES_MOVE.RIGHT));
    }
    store.dispatch(PIECES_MOVE(PIECES_MOVE.SWITCH));
  });
  it('middleware', () => {
    store.getState().EmitLoose = true;
    store.getState().EmitCompleteLine = true;
    store.dispatch(PIECES_MOVE(PIECES_MOVE.SWITCH));
  });
});
