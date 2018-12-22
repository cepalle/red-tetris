import {GRID_WIDTH} from "../../common/grid";
import {getPiece, PIECES_NUM} from "../../common/pieces";
import {IPiece, IPos} from "../reducers/reducer";

enum COLLISION_TYPE {
  PIECE = "collision_piece",
  WALL_RIGHT = "collision_wall_right",
  WALL_LEFT = "collision_wall_left",
  WALL_BOTTOM = "collision_wall_bottom",
  WALL_TOP = "collision_top",
}

enum PIECES_MOVE {
  ROT_RIGHT = "PIECES_ROT_RIGHT",
  ROT_LEFT = "PIECES_ROT_LEFT",
  RIGHT = "PIECES_MOVE_RIGHT",
  LEFT = "PIECES_MOVE_LEFT",
  DOWN = "PIECES_MOVE_DOWN",
  DROP = "PIECES_DROP",
  SWITCH = "PIECE_SWITCH",
}

const PRIO_COLLISION = [
  COLLISION_TYPE.WALL_TOP,
  COLLISION_TYPE.PIECE,
  COLLISION_TYPE.WALL_BOTTOM,
  COLLISION_TYPE.WALL_RIGHT,
  COLLISION_TYPE.WALL_LEFT
];

const hasCollision = (grid: number[][], piece, loc: IPos): COLLISION_TYPE | undefined => {
  let collisionType = undefined;
  piece.forEach((line, y) => line.forEach((number, x) => {
    const gx = x + loc.x;
    const gy = y + loc.y;

    if (gy < 0 && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.WALL_TOP)) {
        collisionType = COLLISION_TYPE.WALL_TOP;
      }
    } else if (gy >= grid.length && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.WALL_BOTTOM)) {
        collisionType = COLLISION_TYPE.WALL_BOTTOM;
      }
    } else if (gx < 0 && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.WALL_LEFT)) {
        collisionType = COLLISION_TYPE.WALL_LEFT;
      }
    } else if (gx >= GRID_WIDTH && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.WALL_RIGHT)) {
        collisionType = COLLISION_TYPE.WALL_RIGHT;
      }
    } else if (number !== 0 && grid[gy][gx] !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.PIECE)) {
        collisionType = COLLISION_TYPE.PIECE;
      }
    }
  }));
  return collisionType;
};

const placePiece = (grid: number[][], piece: IPiece, isPreview = false): number[][] => {
  const pieceDescr: number[][] = getPiece(piece.num, piece.rot);

  return grid.map((line, y) => line.map((number, x) => {
    if (y >= piece.pos.y &&
      x >= piece.pos.x &&
      y < piece.pos.y + pieceDescr.length &&
      x < piece.pos.x + pieceDescr.length &&
      pieceDescr[y - piece.pos.y][x - piece.pos.x] !== 0
    ) {
      return (isPreview) ? PIECES_NUM.preview : pieceDescr[y - piece.pos.y][x - piece.pos.x]
    }
    return x;
  }));
};

const placePiecePreview = (grid: number[][], piece: IPiece) => {
  const pieceDescr = getPiece(piece.num, piece.rot);
  let loc = piece.pos;

  while (!hasCollision(grid, pieceDescr, loc)) {
    loc = {...loc, y: loc.y - 1};
  }
  if (loc.y > 0) {
    loc = {...loc, y: loc.y - 1};
  }
  return placePiece(grid, {...piece, pos: loc}, true)
};

const movePose = (pos: IPos, move: PIECES_MOVE): IPos => {
  switch (move) {
    case PIECES_MOVE.DOWN:
      return {x: pos.x, y: pos.y + 1};
    case PIECES_MOVE.LEFT:
      return {x: pos.x - 1, y: pos.y};
    case PIECES_MOVE.RIGHT:
      return {x: pos.x + 1, y: pos.y};
    default:
      return pos;
  }
};

const moveRot = (rot: number, move: PIECES_MOVE): number => {
  if (move === PIECES_MOVE.ROT_RIGHT) {
    return (rot + 1) % 4;
  }
  if (move === PIECES_MOVE.ROT_LEFT) {
    return (rot + 3) % 4;
  }
  return rot;
};

const updatePieceSwitch = (grid: number[][], flow: IPiece[]): { bool: boolean, flow: IPiece[] } => {
  if (flow.length < 2) {
    return {bool: false, flow}
  }

  const [p1, p2, ...rest] = flow;

  const newP1 = moveCollision({...p1, pos: p2.pos}, grid);
  const newP2 = moveCollision({...p2, pos: p1.pos}, grid);

  return {bool: false, flow: [newP2, newP1, ...rest]};
};

const updatePieceRot = (grid: number[][], flow: IPiece[], move: PIECES_MOVE): { bool: boolean, flow: IPiece[] } => {
  if (flow.length < 1) {
    return {bool: false, flow}
  }

  const [first, ...rest] = flow;

  const newPiece: IPiece = moveCollision({
    ...first,
    rot: moveRot(first.rot, move),
    pos: movePose(first.pos, move)
  }, grid);

  return {bool: false, flow: [newPiece, ...rest]};
};

// Can block ?
const moveCollision = (piece: IPiece, grid: number[][]): IPiece => {
  const newPieceDescr = getPiece(piece.num, piece.rot);

  let collisionType = hasCollision(grid, newPieceDescr, piece.pos);

  let newPiece = piece;
  while (collisionType && collisionType !== COLLISION_TYPE.WALL_TOP) {
    newPiece = {
      ...newPiece,
      pos: {
        ...newPiece.pos,
        ...(
          collisionType === COLLISION_TYPE.WALL_LEFT ?
            {x: newPiece.pos.x + 1} :
            collisionType === COLLISION_TYPE.WALL_RIGHT ?
              {x: newPiece.pos.x - 1} :
              {y: newPiece.pos.y - 1}
        )
      }
    };
    collisionType = hasCollision(grid, newPieceDescr, newPiece.pos);
  }
  return newPiece;
};

const updatePiecePos = (grid: number[][], Flow: IPiece[], move: PIECES_MOVE): { bool: boolean, flow: IPiece[] } => {

  const [cur, ...rest] = Flow;

  if (move === PIECES_MOVE.ROT_LEFT || move === PIECES_MOVE.ROT_RIGHT) {
    return updatePieceRot(grid, Flow, move);
  }
  if (move === PIECES_MOVE.DROP) {
    const newPieceDescr = getPiece(cur.num, cur.rot);

    let newCur = cur;
    while (!hasCollision(grid, newPieceDescr, newCur.pos)) {
      newCur = {
        ...newCur,
        pos: {
          ...newCur.pos,
          y: newCur.pos.y + 1
        }
      };
    }
    newCur = {
      ...newCur,
      pos: {
        ...newCur.pos,
        y: newCur.pos.y - 1
      }
    };
    return {bool: true, flow: [newCur, ...rest]}
  }
  if (move === PIECES_MOVE.RIGHT || move === PIECES_MOVE.LEFT) {
    const newCur = {
      ...cur,
      pos: movePose(cur.pos, move)
    };
    const newPieceDescr = getPiece(newCur.num, newCur.rot);

    return {
      bool: false,
      flow: (!hasCollision(grid, newPieceDescr, newCur.pos)) ? [newCur, ...rest] : Flow,
    }
  }
  if (move === PIECES_MOVE.DOWN) {
    const newCur = {
      ...cur,
      pos: movePose(cur.pos, move)
    };
    const newPieceDescr = getPiece(newCur.num, newCur.rot);

    if (!hasCollision(grid, newPieceDescr, newCur.pos)) {
      return {
        bool: false,
        flow: [newCur, ...rest]
      };
    }
    return {
      bool: true,
      flow: Flow
    };
  }
  return updatePieceSwitch(grid, Flow);
};

const gridDelLine = (grid: number[][]) => {

  let nbWall = 0;
  let lineToDel = [];
  let newGrid = grid.map(l => l.map(e => e));

  newGrid.forEach((line, i) => {
    let asEmpty = false;
    let asWall = false;
    line.forEach(el => {
      if (el === PIECES_NUM.empty) {
        asEmpty = true;
      }
      if (el === PIECES_NUM.wall_malus) {
        asWall = true;
      }
    });
    if (!asEmpty) {
      lineToDel.push(i);
      if (asWall) {
        nbWall++;
      }
    }
  });

  newGrid = newGrid.filter((line, i) => !lineToDel.includes(i));
  while (newGrid.length < grid.length) {
    newGrid = [Array(GRID_WIDTH).fill(PIECES_NUM.empty), ...newGrid];
  }

  return [newGrid, lineToDel.length - nbWall];
};

const gridAddWall = (grid, amount) => {
  const pos_x = Math.floor(Math.random() * GRID_WIDTH);
  const newGrid = grid.map(l => l.map(e => e));

  for (let i = 0; i < amount; i++) {
    newGrid.push(Array(GRID_WIDTH).fill(PIECES_NUM.wall_malus));
    newGrid.shift();
    newGrid[newGrid.length - 1][pos_x] = PIECES_NUM.empty;
  }

  return newGrid;
};


export {
  hasCollision,
  placePiece,
  COLLISION_TYPE,
  movePose,
  updatePiecePos,
  gridDelLine,
  gridAddWall,
  placePiecePreview
}
