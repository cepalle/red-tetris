import {store} from "../middlewares/store";
import {movePiece} from "../actions/action-creators";
import {PIECES_MOVE} from "../../common/pieces";

let animate = {
  value: false
};

const animateClock = () => {
  if (animate.value) {
    store.dispatch(movePiece(PIECES_MOVE.DOWN));
  }

    window.setTimeout(() => animateClock(), 500);
};

animateClock();

export {animate};
