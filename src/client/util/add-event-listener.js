import {PIECES_MOVE} from "../../common/pieces"
import {store} from "../redux/store"
import {movePiece} from "../actions/action-creators"

const keyLeft = 37;
const keyUp = 38;
const keyRight = 39;
const keyDown = 40;
const keySpace = 32;

window.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case keyLeft:
      store.dispatch(movePiece(PIECES_MOVE.LEFT));
      break;

    case keyUp:
      store.dispatch(movePiece(PIECES_MOVE.ROT_RIGHT));
      break;

    case keyRight:
      store.dispatch(movePiece(PIECES_MOVE.RIGHT));
      break;

    case keyDown:
      store.dispatch(movePiece(PIECES_MOVE.DOWN));
      break;

    case keySpace:
      store.dispatch(movePiece(PIECES_MOVE.DROP));
      break;
  }
}, false);
