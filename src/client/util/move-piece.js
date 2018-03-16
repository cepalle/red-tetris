import {GRID_HEIGHT, GRID_WIDTH} from "../redux/init-state";
import {getPiece, getPieceMask, PIECES_MOVE} from "../../common/pieces";
import {randNumber} from "./utils";

const COLLISION_TYPE = {
  PIECE: "collision_piece",
  WALL_RIGHT: "collision_wall_right",
  WALL_LEFT: "collision_wall_left",
  WALL_BOTTOM: "collision_wall_bottom",
  WALL_TOP: "collision_top",
};

const hasCollision = (grid, piece, loc) => {
  let collisionType = undefined;
  piece.forEach((line, y) => line.forEach((number, x) => {
    const gx = x + loc.x;
    const gy = y + loc.y;

    if (gy < 0 && number !== 0)
      collisionType = COLLISION_TYPE.WALL_TOP;
    else if (gy >= GRID_HEIGHT && number !== 0)
      collisionType = COLLISION_TYPE.WALL_BOTTOM;
    else if (gx < 0 && number !== 0)
      collisionType = COLLISION_TYPE.WALL_LEFT;
    else if (gx >= GRID_WIDTH && number !== 0)
      collisionType = COLLISION_TYPE.WALL_RIGHT;
    else if (number !== 0 && grid[gy][gx] !== 0)
      collisionType = COLLISION_TYPE.PIECE;
  }));
  return collisionType;
};

const placePiece = state => {
  const grid = state.playerStates.find(playerState => playerState.playerName === state.playerName).grid;
  const piece = getPiece(state.piecesFlow[0], state.curPieceRot);
  const loc = state.curPiecePos;
  piece.forEach((line, y) =>
    line.forEach((number, x) => {
        const gx = x + loc.x;
        const gy = y + loc.y;
        if (number !== 0) {
          grid[gy][gx] = number;
        }
      }
    )
  );
};

const eraseCurPiece = state => {
  const grid = state.playerStates.find(playerState => playerState.playerName === state.playerName).grid;
  const piece = getPiece(state.piecesFlow[0], state.curPieceRot);
  const loc = state.curPiecePos;
  piece.forEach((line, i) =>
    line.forEach((p, j) => {
        if (p !== 0) {
          grid[loc.y + i][loc.x + j] = 0;
        }
      }
    )
  );
};

const newLoc = (loc, move) => {
  if (move === PIECES_MOVE.DOWN)
    return {x: loc.x, y: loc.y + 1};
  else if (move === PIECES_MOVE.LEFT)
    return {x: loc.x - 1, y: loc.y};
  else if (move === PIECES_MOVE.RIGHT)
    return {x: loc.x + 1, y: loc.y};
  return {x: loc.x, y: loc.y};
};

const prepareAndPlaceNewPiece = state => {
  state.curPieceRot = randNumber(0, 3);
  const mask = getPieceMask(state.piecesFlow[0], state.curPieceRot);
  state.curPiecePos = {
    x: randNumber(mask.x, GRID_WIDTH - 1 - 4), // change with new mask
    y: mask.y
  };
  placePiece(state);
};

const updatePiecePos = (state, move) => {
  let collisionType;
  let loc = newLoc(state.curPiecePos, move);
  let needNext = false;
  const grid = state.playerStates.find(playerState => playerState.playerName === state.playerName).grid;
  const piece = getPiece(state.piecesFlow[0], state.curPieceRot);

  if (move !== PIECES_MOVE.ROT_RIGHT && move !== PIECES_MOVE.ROT_LEFT) {
    if (!(collisionType = hasCollision(grid, piece, loc))) {
      state.curPiecePos = loc;
    } else if (collisionType && move === PIECES_MOVE.DOWN) {
      needNext = true;
    }
  }
  return needNext;
};

export {hasCollision, eraseCurPiece, placePiece, COLLISION_TYPE, newLoc, prepareAndPlaceNewPiece, updatePiecePos}
