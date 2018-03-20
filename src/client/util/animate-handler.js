import {store} from "../middlewares/store";
import {movePiece} from "../actions/action-creators";
import {PIECES_MOVE} from "../../common/pieces";

let animate = {
  value: false
};

let nbFarme = 0;

const animateClock = () => {
  if (animate.value) {
    nbFarme++;
  } else {
    nbFarme = 0;
  }
  if (nbFarme === 30) {
    store.dispatch(movePiece(PIECES_MOVE.DOWN));
    nbFarme = 0;
  }

  requestAnimationFrame(animateClock);
};

animateClock();

export {animate};
