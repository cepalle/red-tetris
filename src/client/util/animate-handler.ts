import {PIECES_MOVE} from "../../common/pieces";
import {logger} from "./logger-handler";

const animateClock = (dispatch, animate) => {
  if (animate) dispatch(PIECES_MOVE(PIECES_MOVE.DOWN));
  logger(["animateClock"])
};

export {animateClock};
