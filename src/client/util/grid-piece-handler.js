import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";
import {getPiece, PIECES_MOVE} from "../../common/pieces";
import {cloneState} from "./clone-handler"
import {logger} from "./logger-handler"

const COLLISION_TYPE = {
  PIECE: "collision_piece",
  WALL_RIGHT: "collision_wall_right",
  WALL_LEFT: "collision_wall_left",
  WALL_BOTTOM: "collision_wall_bottom",
  WALL_TOP: "collision_top",
};

const PRIO_COLLISION = [
  COLLISION_TYPE.WALL_TOP,
  COLLISION_TYPE.PIECE,
  COLLISION_TYPE.WALL_BOTTOM,
  COLLISION_TYPE.WALL_RIGHT,
  COLLISION_TYPE.WALL_LEFT
];

const hasCollision = (grid, piece, loc) => {
  let collisionType = undefined;
  piece.forEach((line, y) => line.forEach((number, x) => {
    const gx = x + loc.x;
    const gy = y + loc.y;

    if (gy < 0 && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.WALL_TOP)) {
        collisionType = COLLISION_TYPE.WALL_TOP;
      }
    }
    else if (gy >= GRID_HEIGHT && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.WALL_BOTTOM)) {
        collisionType = COLLISION_TYPE.WALL_BOTTOM;
      }
    }
    else if (gx < 0 && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.WALL_LEFT)) {
        collisionType = COLLISION_TYPE.WALL_LEFT;
      }
    }
    else if (gx >= GRID_WIDTH && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.WALL_RIGHT)) {
        collisionType = COLLISION_TYPE.WALL_RIGHT;
      }
    }
    else if (number !== 0 && grid[gy][gx] !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.PIECE)) {
        collisionType = COLLISION_TYPE.PIECE;
      }
    }
  }));
  return collisionType;
};

const placePiece = (grid, piece) => {
  const newGrid = grid.map(l => l.map(e => e));
  const pieceDescr = getPiece(piece.num, piece.rot);
  pieceDescr.forEach((line, y) => {
      return line.forEach((number, x) => {
          const gx = x + piece.pos.x;
          const gy = y + piece.pos.y;
          if (number !== 0) {
            if (gx >= 0 && gy >= 0 &&
              gy < newGrid.length && gx < newGrid[gy].length) {
              newGrid[gy][gx] = number;
            } else {
              logger(["invalide placement:", grid, piece]);
            }
          }
        }
      )
    }
  );
  return newGrid;
};

const placePiecePreview = (grid, piece) => {
  const newGrid = grid.map(l => l.map(e => e));
  const pieceDescr = getPiece(piece.num, piece.rot);
  const loc = newLoc(piece.pos);

  while (!hasCollision(grid, pieceDescr, loc)) {
    loc.y++;
  }
  if (loc.y > 0) {
    loc.y--;
  }

  pieceDescr.forEach((line, y) =>
    line.forEach((number, x) => {
        const gx = x + loc.x;
        const gy = y + loc.y;
        if (number !== 0) {
          if (gx >= 0 && gy >= 0 &&
            gy < newGrid.length && gx < newGrid[gy].length) {
            newGrid[gy][gx] = -2;
          } else {
            logger(["invalide placement:", grid, piece]);
          }
        }
      }
    )
  );
  return newGrid;
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

const newRot = (rot, move) => {
  if (move === PIECES_MOVE.ROT_RIGHT) {
    return (rot + 1) % 4;
  }
  if (move === PIECES_MOVE.ROT_LEFT) {
    return (rot + 3) % 4;
  }
  return rot;
};

const updatePiecePos = (grid, piece, move) => {

  let collisionType;

  let newPiece = {
    num: piece.num,
    rot: newRot(piece.rot, move),
    pos: newLoc(piece.pos, move)
  };

  let newPieceDescr = getPiece(newPiece.num, newPiece.rot);

  if (move !== PIECES_MOVE.ROT_RIGHT && move !== PIECES_MOVE.ROT_LEFT) {
    if (move === PIECES_MOVE.DROP) {
      while (!hasCollision(grid, newPieceDescr, newPiece.pos)) {
        newPiece.pos.y++;
      }
      newPiece.pos.y--;
      return [true, newPiece];
    }
    if (!(collisionType = hasCollision(grid, newPieceDescr, newPiece.pos))) {
      return [false, newPiece];
    }
    if (collisionType && move === PIECES_MOVE.DOWN) {
      return [true, piece];
    }
    return [false, piece];
  } else {
    collisionType = hasCollision(grid, newPieceDescr, newPiece.pos);

    while (collisionType === COLLISION_TYPE.PIECE || collisionType === COLLISION_TYPE.WALL_LEFT
    || collisionType === COLLISION_TYPE.WALL_RIGHT || collisionType === COLLISION_TYPE.WALL_BOTTOM) {
      if (collisionType === COLLISION_TYPE.WALL_LEFT) {
        newPiece.pos.x++;
      } else if (collisionType === COLLISION_TYPE.WALL_RIGHT) {
        newPiece.pos.x--;
      } else {
        newPiece.pos.y--;
      }
      collisionType = hasCollision(grid, newPieceDescr, newPiece.pos);
    }
    return [false, newPiece];
  }
};

const gridDelLine = grid => {

  let lineToDel = [];
  let newGrid = grid.map(l => l.map(e => e));

  newGrid.forEach((line, i) => {
    let asEmpty = false;
    line.forEach(el => {
      if (el <= 0) {
        asEmpty = true;
      }
    });
    if (!asEmpty) {
      lineToDel.push(i);
    }
  });

  newGrid = newGrid.filter((line, i) => !lineToDel.includes(i));
  while (newGrid.length < GRID_HEIGHT) {
    newGrid = [Array(GRID_WIDTH).fill(0), ...newGrid];
  }
  return [newGrid, lineToDel.length];
};

const gridAddWall = state => {
  if (state.piecesFlow.length < 1) {
    return state
  }


  let player = state.playerStates.find(playerState => playerState.playerName === state.playerName);

  if (player.hasLoose) {
    return state;
  }

  let newState = cloneState(state);
  player = newState.playerStates.find(playerState => playerState.playerName === newState.playerName);

  player.grid = [...player.grid, Array(GRID_WIDTH).fill(-1)];
  player.grid.shift();
  if (newState.piecesFlow[0].pos.y > 0) {
    newState.piecesFlow[0].pos.y--;
  }

  return newState;
};


export {
  hasCollision,
  placePiece,
  COLLISION_TYPE,
  newLoc,
  updatePiecePos,
  gridDelLine,
  gridAddWall,
  placePiecePreview
}
