import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";
import {getPiece, PIECES_MOVE} from "../../common/pieces";
import {cloneState} from "./clone-handler"

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

const placePiece = state => {
  const newState = cloneState(state);

  const grid = newState.playerStates.find(playerState => playerState.playerName === newState.playerName).grid;
  const pieceDescr = getPiece(newState.piecesFlow[0].num, newState.piecesFlow[0].rot);
  const loc = newState.piecesFlow[0].pos;
  pieceDescr.forEach((line, y) =>
    line.forEach((number, x) => {
        const gx = x + loc.x;
        const gy = y + loc.y;
        if (number !== 0) {
          grid[gy][gx] = number;
        }
      }
    )
  );
  return newState;
};

const eraseCurPiece = state => {
  const newState = cloneState(state);

  const grid = newState.playerStates.find(playerState => playerState.playerName === newState.playerName).grid;
  const pieceDescr = getPiece(newState.piecesFlow[0].num, newState.piecesFlow[0].rot);
  const loc = newState.piecesFlow[0].pos;
  pieceDescr.forEach((line, i) =>
    line.forEach((p, j) => {
        if (p !== 0) {
          grid[loc.y + i][loc.x + j] = 0;
        }
      }
    )
  );
  return newState;
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

const updatePiecePos = (state, move) => {
  const newState = cloneState(state);

  let collisionType;
  let needNext = false;
  let loc = newLoc(newState.piecesFlow[0].pos, move);
  let pieceDescr = getPiece(newState.piecesFlow[0].num, newState.piecesFlow[0].rot);
  const grid = newState.playerStates.find(playerState => playerState.playerName === newState.playerName).grid;

  if (move !== PIECES_MOVE.ROT_RIGHT && move !== PIECES_MOVE.ROT_LEFT) {
    if (move === PIECES_MOVE.DROP) {
      needNext = true;
      while (!hasCollision(grid, pieceDescr, loc)) {
        loc.y++;
      }
      loc.y--;
      newState.piecesFlow[0].pos = loc;
    } else if (!(collisionType = hasCollision(grid, pieceDescr, loc))) {
      newState.piecesFlow[0].pos = loc;
    } else if (collisionType && move === PIECES_MOVE.DOWN) {
      needNext = true;
    }
  } else {
    if (move === PIECES_MOVE.ROT_RIGHT) {
      newState.piecesFlow[0].rot = (newState.piecesFlow[0].rot + 1) % 4;
    } else {
      newState.piecesFlow[0].rot = (newState.piecesFlow[0].rot + 3) % 4;
    }
    pieceDescr = getPiece(newState.piecesFlow[0].num, newState.piecesFlow[0].rot);

    collisionType = hasCollision(grid, pieceDescr, newState.piecesFlow[0].pos);
    while (collisionType === COLLISION_TYPE.PIECE || collisionType === COLLISION_TYPE.WALL_LEFT
    || collisionType === COLLISION_TYPE.WALL_RIGHT || collisionType === COLLISION_TYPE.WALL_BOTTOM) {
      if (collisionType === COLLISION_TYPE.WALL_LEFT) {
        newState.piecesFlow[0].pos.x++;
      } else if (collisionType === COLLISION_TYPE.WALL_RIGHT) {
        newState.piecesFlow[0].pos.x--;
      } else {
        newState.piecesFlow[0].pos.y--;
      }
      collisionType = hasCollision(grid, pieceDescr, newState.piecesFlow[0].pos);
    }
  }
  return [needNext, newState];
};

const gridDelLine = state => {
  const newState = cloneState(state);

  let lineToDel = [];
  const player = newState.playerStates.find(playerState => playerState.playerName === newState.playerName);

  player.grid.forEach((line, i) => {
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

  player.grid = player.grid.filter((line, i) => !lineToDel.includes(i));
  while (player.grid.length < GRID_HEIGHT) {
    player.grid = [Array(GRID_WIDTH).fill(0), ...player.grid];
  }
  return [newState, lineToDel.length];
};

const gridAddWall = state => {

  let player = state.playerStates.find(playerState => playerState.playerName === state.playerName);

  if (player.hasLoose) {
    return state;
  }

  let newState = eraseCurPiece(state);
  player = newState.playerStates.find(playerState => playerState.playerName === newState.playerName);

  player.grid = [...player.grid, Array(GRID_WIDTH).fill(-1)];
  player.grid.shift();
  if (newState.piecesFlow[0].pos.y > 0) {
    newState.piecesFlow[0].pos.y--;
  }
  newState = placePiece(newState);
  return newState;
};


export {
  hasCollision,
  eraseCurPiece,
  placePiece,
  COLLISION_TYPE,
  newLoc,
  updatePiecePos,
  gridDelLine,
  gridAddWall
}
