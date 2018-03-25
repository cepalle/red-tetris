import {store} from "../middlewares/store";
import {movePiece} from "../actions/action-creators";
import {PIECES_MOVE} from "../../common/pieces";

const animateClock = () => {
  if (store.getState().animate) {
    store.dispatch(movePiece(PIECES_MOVE.DOWN));
  }

  window.setTimeout(() => animateClock(), 500);
};

export {animateClock};
