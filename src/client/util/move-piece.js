import * as part from "../../common/parts";

const COLLISION_TYPE = {
  PIECE: "collision_piece",
  WALL_RIGHT: "collision_wall_right",
  WALL_LEFT: "collision_wall_left",
  WALL_BOTTOM: "collision_wall_bottom",
  WALL_TOP: "collision_top",
};

const hasCollision = (grid, piece, loc) => {
  let collisionType = undefined;
  console.log(piece);
  piece.forEach((line, y) => line.forEach((number, x) => {
    const gx = x + loc.x;
    const gy = y + loc.y;
    if (gy < 0 && number !== 0)
      collisionType = COLLISION_TYPE.WALL_TOP;
    else if (gy >= part.GRID_HEIGHT && number !== 0)
      collisionType = COLLISION_TYPE.WALL_BOTTOM;
    else if (gx < 0 && number !== 0)
      collisionType = COLLISION_TYPE.WALL_LEFT;
    else if (gx >= part.GRID_WIDTH && number !== 0)
      collisionType = COLLISION_TYPE.WALL_RIGHT;
    else if (number !== 0 && grid[gy][gx] !== 0)
      collisionType = COLLISION_TYPE.PIECE;
  }));
  return collisionType;
};

const placePiece = (grid, piece, loc, state) => {
  piece.forEach((line, y) => line.forEach((number, x) => {
    const gx = x + loc.x;
    const gy = y + loc.y;
    if (number !== 0) {
      grid[gy][gx] = number;
      state.curPartCoords.push({x: gx, y: gy});
    }
  }));
};

const eraseLastPiece = (grid, state) => state.curPartCoords.forEach(e => {grid[e.y][e.x] = 0;});

export { hasCollision, eraseLastPiece, placePiece, COLLISION_TYPE}
