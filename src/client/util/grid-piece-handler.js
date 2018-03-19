import {GRID_HEIGHT, GRID_WIDTH} from "../redux/init-state";
import {getPiece, getPieceMask, PIECES_MOVE} from "../../common/pieces";
import {randNumber} from "./utils";
import {emitEndPlaying, emitPlayerCompleteLine, emitPlayerLoose} from "../socket/socket-api";
import {animate} from "./animate";

const COLLISION_TYPE = {
  PIECE: "collision_piece",
  WALL_RIGHT: "collision_wall_right",
  WALL_LEFT: "collision_wall_left",
  WALL_BOTTOM: "collision_wall_bottom",
  WALL_TOP: "collision_top",
};

const PRIO_COLLISION = [COLLISION_TYPE.WALL_TOP,
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
    x: randNumber(mask.x, GRID_WIDTH - mask.width - mask.x),
    y: 0
  };
  placePiece(state);
};

const updatePiecePos = (state, move) => {
  let collisionType;
  let loc = newLoc(state.curPiecePos, move);
  let needNext = false;
  const grid = state.playerStates.find(playerState => playerState.playerName === state.playerName).grid;
  let piece = getPiece(state.piecesFlow[0], state.curPieceRot);

  if (move !== PIECES_MOVE.ROT_RIGHT && move !== PIECES_MOVE.ROT_LEFT) {
    if (move === PIECES_MOVE.DROP) {
      needNext = true;
      while (!hasCollision(grid, piece, loc)) {
        loc.y++;
      }
      loc.y--;
      state.curPiecePos = loc;
    } else if (!(collisionType = hasCollision(grid, piece, loc))) {
      state.curPiecePos = loc;
    } else if (collisionType && move === PIECES_MOVE.DOWN) {
      needNext = true;
    }
  } else {

    if (move === PIECES_MOVE.ROT_RIGHT) {
      state.curPieceRot = (state.curPieceRot + 1) % 4;
    } else {
      state.curPieceRot = (state.curPieceRot + 3) % 4;
    }
    piece = getPiece(state.piecesFlow[0], state.curPieceRot);

    collisionType = hasCollision(grid, piece, state.curPiecePos);
    while (collisionType === COLLISION_TYPE.PIECE || collisionType === COLLISION_TYPE.WALL_LEFT
    || collisionType === COLLISION_TYPE.WALL_RIGHT || collisionType === COLLISION_TYPE.WALL_BOTTOM) {
      if (collisionType === COLLISION_TYPE.WALL_LEFT) {
        state.curPiecePos.x++;
      } else if (collisionType === COLLISION_TYPE.WALL_RIGHT) {
        state.curPiecePos.x--;
      } else {
        state.curPiecePos.y--;
      }
      collisionType = hasCollision(grid, piece, state.curPiecePos);
    }
  }
  return needNext;
};

const gridDelLine = state => {
  let lineToDel = [];
  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);

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
    emitPlayerCompleteLine();
    player.grid = [Array(GRID_WIDTH).fill(0), ...player.grid];
  }
};

const ifEndGame = state => {
  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);
  if (player.isMaster) {
    if (state.playerStates.length === 1) {
      if (player.hasLoose) {
        emitEndPlaying();
      }
    }
    if (state.playerStates.length > 1) {
      if (state.playerStates.filter(e => !e.hasLoose).length < 2) {
        emitEndPlaying();
      }
    }
  }
};

const ifLooseSet = state => {
  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);
  if (player.grid[3].some(e => e !== 0)) {
    animate.value = false;
    player.hasLoose = true;
    emitPlayerLoose();
    ifEndGame(state);
  }
};

const gridAddWall = state => {
  const player = state.playerStates.find(playerState => playerState.playerName === state.playerName);

  if (player.hasLoose) {
    return;
  }

  eraseCurPiece(state);
  player.grid = [...player.grid, Array(GRID_WIDTH).fill(-1)];
  player.grid.shift();
  if (Object.keys(state.curPiecePos).length > 0 && state.curPiecePos.y > 0) {
    state.curPiecePos.y--;
  }
  ifLooseSet(state);
  placePiece(state);
};


export {
  hasCollision,
  eraseCurPiece,
  placePiece,
  COLLISION_TYPE,
  newLoc,
  prepareAndPlaceNewPiece,
  updatePiecePos,
  gridDelLine,
  gridAddWall,
  ifLooseSet,
  ifEndGame
}
