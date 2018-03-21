import {PIECES_MOVE} from "../../common/pieces"
import {store} from "../middlewares/store"
import {movePiece} from "../actions/action-creators"

const keyLeft = 37;
const keyUp = 38;
const keyRight = 39;
const keyDown = 40;
const keySpace = 32;

const eventHandler = (event) => {
  switch (event.keyCode) {
    case keyLeft:
      event.preventDefault();
      store.dispatch(movePiece(PIECES_MOVE.LEFT));
      break;

    case keyUp:
      event.preventDefault();
      store.dispatch(movePiece(PIECES_MOVE.ROT_RIGHT));
      break;

    case keyRight:
      event.preventDefault();
      store.dispatch(movePiece(PIECES_MOVE.RIGHT));
      break;

    case keyDown:
      event.preventDefault();
      store.dispatch(movePiece(PIECES_MOVE.DOWN));
      break;

    case keySpace:
      event.preventDefault();
      store.dispatch(movePiece(PIECES_MOVE.DROP));
      break;
  }
};

export {eventHandler};
