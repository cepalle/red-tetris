import {IPlayer} from '../server/RoomManager';

// --- TYPE

interface IPos {
  readonly x: number,
  readonly y: number
}

interface IPiece {
  readonly num: number,
  readonly rot: number,
}

enum ENUM_PIECES_MOVE {
  ROT_RIGHT = 'PIECES_ROT_RIGHT',
  ROT_LEFT = 'PIECES_ROT_LEFT',
  RIGHT = 'PIECES_MOVE_RIGHT',
  LEFT = 'PIECES_MOVE_LEFT',
  DOWN = 'PIECES_MOVE_DOWN',
  DROP = 'PIECES_DROP',
  SWITCH = 'PIECE_SWITCH',
}

enum ENUM_PIECES {
  empty = 0,
  n1 = 1,
  n2 = 2,
  n3 = 3,
  n4 = 4,
  n5 = 5,
  n6 = 6,
  n7 = 7,
  wall,
  preview,
  wall_malus,
  wall_loose,
  wall_win,
  wall_spect,
}

// --- PIECE

interface IPieceInfo {
  x: number,
  y: number,
  width: number
}

interface IPiecesDescr {
  info: IPieceInfo,
  piece: ENUM_PIECES[][],
}

const PIECES_DESCR: IPiecesDescr[][] = [
  [
    {
      info: {x: 0, y: -1, width: 4},
      piece: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    {
      info: {x: -2, y: 0, width: 1},
      piece: [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    },
    {
      info: {x: 0, y: -2, width: 4},
      piece: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
    },
    {
      info: {x: -1, y: 0, width: 1},
      piece: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
    },
  ],
  [
    {
      info: {x: 0, y: 0, width: 3},
      piece: [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0],
      ],
    },
    {
      info: {x: -1, y: 0, width: 2},
      piece: [
        [0, 2, 2],
        [0, 2, 0],
        [0, 2, 0],
      ],
    },
    {
      info: {x: 0, y: -1, width: 3},
      piece: [
        [0, 0, 0],
        [2, 2, 2],
        [0, 0, 2],
      ],
    },
    {
      info: {x: 0, y: 0, width: 2},
      piece: [
        [0, 2, 0],
        [0, 2, 0],
        [2, 2, 0],
      ],
    },
  ],
  [
    {
      info: {x: 0, y: 0, width: 3},
      piece: [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0],
      ],
    },
    {
      info: {x: -1, y: 0, width: 2},
      piece: [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
      ],
    },
    {
      info: {x: 0, y: -1, width: 3},
      piece: [
        [0, 0, 0],
        [3, 3, 3],
        [3, 0, 0],
      ],
    },
    {
      info: {x: 0, y: 0, width: 2},
      piece: [
        [3, 3, 0],
        [0, 3, 0],
        [0, 3, 0],
      ],
    },
  ],
  [
    {
      info: {x: -1, y: 0, width: 4},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ],
    },
    {
      info: {x: -1, y: 0, width: 4},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ],
    },
    {
      info: {x: -1, y: 0, width: 4},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ],
    },
    {
      info: {x: -1, y: 0, width: 4},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ],
    },
  ],
  [
    {
      info: {x: 0, y: 0, width: 3},
      piece: [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0],
      ],
    },
    {
      info: {x: -1, y: 0, width: 2},
      piece: [
        [0, 5, 0],
        [0, 5, 5],
        [0, 0, 5],
      ],
    },
    {
      info: {x: 0, y: -1, width: 3},
      piece: [
        [0, 0, 0],
        [0, 5, 5],
        [5, 5, 0],
      ],
    },
    {
      info: {x: 0, y: 0, width: 2},
      piece: [
        [5, 0, 0],
        [5, 5, 0],
        [0, 5, 0],
      ],
    },
  ],
  [
    {
      info: {x: 0, y: 0, width: 3},
      piece: [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0],
      ],
    },
    {
      info: {x: -1, y: 0, width: 2},
      piece: [
        [0, 6, 0],
        [0, 6, 6],
        [0, 6, 0],
      ],
    },
    {
      info: {x: 0, y: -1, width: 3},
      piece: [
        [0, 0, 0],
        [6, 6, 6],
        [0, 6, 0],
      ],
    },
    {
      info: {x: 0, y: 0, width: 2},
      piece: [
        [0, 6, 0],
        [6, 6, 0],
        [0, 6, 0],
      ],
    },
  ],
  [
    {
      info: {x: 0, y: 0, width: 3},
      piece: [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
      ],
    },
    {
      info: {x: -1, y: 0, width: 2},
      piece: [
        [0, 0, 7],
        [0, 7, 7],
        [0, 7, 0],
      ],
    },
    {
      info: {x: 0, y: -1, width: 3},
      piece: [
        [0, 0, 0],
        [7, 7, 0],
        [0, 7, 7],
      ],
    },
    {
      info: {x: 0, y: 0, width: 2},
      piece: [
        [0, 7, 0],
        [7, 7, 0],
        [7, 0, 0],
      ],
    },
  ],
];

const getPiece = (pieces: ENUM_PIECES, rot = 0): ENUM_PIECES[][] => PIECES_DESCR[pieces - 1][rot].piece;
const getPieceInfo = (pieces: ENUM_PIECES, rot = 0): IPieceInfo => PIECES_DESCR[pieces - 1][rot].info;

// --- GRID

const GRID_HEIGHT = 24;
const GRID_WIDTH = 10;

enum ENUM_COLLISION_TYPE {
  PIECE = 'collision_piece',
  WALL_RIGHT = 'collision_wall_right',
  WALL_LEFT = 'collision_wall_left',
  WALL_BOTTOM = 'collision_wall_bottom',
  WALL_TOP = 'collision_top',
}

const PRIO_COLLISION = [
  ENUM_COLLISION_TYPE.WALL_TOP,
  ENUM_COLLISION_TYPE.PIECE,
  ENUM_COLLISION_TYPE.WALL_BOTTOM,
  ENUM_COLLISION_TYPE.WALL_RIGHT,
  ENUM_COLLISION_TYPE.WALL_LEFT,
];

const chooseWallType = (player: IPlayer): ENUM_PIECES => {
  return (
    player.lost ?
      ENUM_PIECES.wall_loose :
      player.win ?
        ENUM_PIECES.wall_win :
        player.isSpectator ?
          ENUM_PIECES.wall_spect :
          ENUM_PIECES.wall
  );
};

const hasCollision = (grid: number[][], piece: ENUM_PIECES[][], loc: IPos): ENUM_COLLISION_TYPE | undefined => {
  let collisionType: ENUM_COLLISION_TYPE | undefined = undefined;

  const comp = (col1: ENUM_COLLISION_TYPE | undefined, col2: ENUM_COLLISION_TYPE): boolean => {
    if (col1 === undefined) {
      return true;
    }
    return PRIO_COLLISION.indexOf(col1) < PRIO_COLLISION.indexOf(col2);
  };

  piece.forEach((line, y) => line.forEach((nb, x) => {
    const gx = x + loc.x;
    const gy = y + loc.y;

    if (gy < 0 && nb !== 0) {
      if (comp(collisionType, ENUM_COLLISION_TYPE.WALL_TOP)) {
        collisionType = ENUM_COLLISION_TYPE.WALL_TOP;
      }
    } else if (gy >= grid.length && nb !== 0) {
      if (comp(collisionType, ENUM_COLLISION_TYPE.WALL_BOTTOM)) {
        collisionType = ENUM_COLLISION_TYPE.WALL_BOTTOM;
      }
    } else if (gx < 0 && nb !== 0) {
      if (comp(collisionType, ENUM_COLLISION_TYPE.WALL_LEFT)) {
        collisionType = ENUM_COLLISION_TYPE.WALL_LEFT;
      }
    } else if (gx >= GRID_WIDTH && nb !== 0) {
      if (comp(collisionType, ENUM_COLLISION_TYPE.WALL_RIGHT)) {
        collisionType = ENUM_COLLISION_TYPE.WALL_RIGHT;
      }
    } else if (nb !== 0 && grid[gy][gx] !== 0) {
      if (comp(collisionType, ENUM_COLLISION_TYPE.PIECE)) {
        collisionType = ENUM_COLLISION_TYPE.PIECE;
      }
    }
  }));
  return collisionType;
};

const placePiece = (grid: number[][], piece: IPiece, pos: IPos, isPreview = false): number[][] => {
  const pieceDescr: number[][] = getPiece(piece.num, piece.rot);

  return grid.map((line, y) => line.map((nb, x) => {
    if (y >= pos.y &&
      x >= pos.x &&
      y < pos.y + pieceDescr.length &&
      x < pos.x + pieceDescr.length &&
      pieceDescr[y - pos.y][x - pos.x] !== 0
    ) {
      return (isPreview) ? ENUM_PIECES.preview : pieceDescr[y - pos.y][x - pos.x];
    }
    return x;
  }));
};

const placePiecePreview = (grid: number[][], piece: IPiece, pos: IPos) => {
  const pieceDescr = getPiece(piece.num, piece.rot);
  let loc = pos;

  while (!hasCollision(grid, pieceDescr, loc)) {
    loc = {...loc, y: loc.y - 1};
  }
  if (loc.y > 0) {
    loc = {...loc, y: loc.y - 1};
  }
  return placePiece(grid, piece, loc, true);
};

const movePose = (pos: IPos, move: ENUM_PIECES_MOVE): IPos => {
  switch (move) {
    case ENUM_PIECES_MOVE.DOWN:
      return {x: pos.x, y: pos.y + 1};
    case ENUM_PIECES_MOVE.LEFT:
      return {x: pos.x - 1, y: pos.y};
    case ENUM_PIECES_MOVE.RIGHT:
      return {x: pos.x + 1, y: pos.y};
    default:
      return pos;
  }
};

const moveRot = (rot: number, move: ENUM_PIECES_MOVE): number => {
  if (move === ENUM_PIECES_MOVE.ROT_RIGHT) {
    return (rot + 1) % 4;
  }
  if (move === ENUM_PIECES_MOVE.ROT_LEFT) {
    return (rot + 3) % 4;
  }
  return rot;
};

const updatePieceSwitch = (grid: number[][], flow: IPiece[]): { bool: boolean; flow: IPiece[] } => {
  if (flow.length < 2) {
    return {bool: false, flow};
  }

  const [p1, p2, ...rest] = flow;

  const newP1 = moveCollision({...p1, pos: p2.pos}, grid);
  const newP2 = moveCollision({...p2, pos: p1.pos}, grid);

  return {bool: false, flow: [newP2, newP1, ...rest]};
};

const updatePieceRot = (
  grid: number[][],
  flow: IPiece[],
  move: ENUM_PIECES_MOVE,
): { bool: boolean; flow: IPiece[] } => {
  if (flow.length < 1) {
    return {bool: false, flow};
  }

  const [first, ...rest] = flow;

  const newPiece: IPiece = moveCollision({
    ...first,
    rot: moveRot(first.rot, move),
    pos: movePose(first.pos, move),
  }, grid);

  return {bool: false, flow: [newPiece, ...rest]};
};

// Can block ?
const moveCollision = (
  piece: IPiece,
  grid: number[][],
): IPiece => {
  const newPieceDescr = getPiece(piece.num, piece.rot);

  let collisionType = hasCollision(grid, newPieceDescr, piece.pos);

  let newPiece = piece;
  while (collisionType && collisionType !== ENUM_COLLISION_TYPE.WALL_TOP) {
    newPiece = {
      ...newPiece,
      pos: {
        ...newPiece.pos,
        ...(
          collisionType === ENUM_COLLISION_TYPE.WALL_LEFT ?
            {x: newPiece.pos.x + 1} :
            collisionType === ENUM_COLLISION_TYPE.WALL_RIGHT ?
              {x: newPiece.pos.x - 1} :
              {y: newPiece.pos.y - 1}
        ),
      },
    };
    collisionType = hasCollision(grid, newPieceDescr, newPiece.pos);
  }
  return newPiece;
};

const updatePiecePos = (
  grid: number[][],
  Flow: IPiece[],
  move: ENUM_PIECES_MOVE,
): { bool: boolean; flow: IPiece[] } => {

  const [cur, ...rest] = Flow;

  if (move === ENUM_PIECES_MOVE.ROT_LEFT || move === ENUM_PIECES_MOVE.ROT_RIGHT) {
    return updatePieceRot(grid, Flow, move);
  }
  if (move === ENUM_PIECES_MOVE.DROP) {
    const newPieceDescr = getPiece(cur.num, cur.rot);

    let newCur = cur;
    while (!hasCollision(grid, newPieceDescr, newCur.pos)) {
      newCur = {
        ...newCur,
        pos: {
          ...newCur.pos,
          y: newCur.pos.y + 1,
        },
      };
    }
    newCur = {
      ...newCur,
      pos: {
        ...newCur.pos,
        y: newCur.pos.y - 1,
      },
    };
    return {bool: true, flow: [newCur, ...rest]};
  }
  if (move === ENUM_PIECES_MOVE.RIGHT || move === ENUM_PIECES_MOVE.LEFT) {
    const newCur = {
      ...cur,
      pos: movePose(cur.pos, move),
    };
    const newPieceDescr = getPiece(newCur.num, newCur.rot);

    return {
      bool: false,
      flow: (!hasCollision(grid, newPieceDescr, newCur.pos)) ? [newCur, ...rest] : Flow,
    };
  }
  if (move === ENUM_PIECES_MOVE.DOWN) {
    const newCur = {
      ...cur,
      pos: movePose(cur.pos, move),
    };
    const newPieceDescr = getPiece(newCur.num, newCur.rot);

    if (!hasCollision(grid, newPieceDescr, newCur.pos)) {
      return {
        bool: false,
        flow: [newCur, ...rest],
      };
    }
    return {
      bool: true,
      flow: Flow,
    };
  }
  return updatePieceSwitch(grid, Flow);
};

const gridDelLine = (grid: ENUM_PIECES[][]): { grid: ENUM_PIECES[][]; nbLineToSend: number } => {

  let nbToSend = 0;

  let newGrid = grid.map((line, y) => {
    const asEmpty = line.some((el) => el === ENUM_PIECES.empty);
    const asWall = line.some((el) => el === ENUM_PIECES.wall);

    if (!asEmpty) {
      if (!asWall) {
        nbToSend++;
      }
      return undefined;
    }
    return line;
  }).filter((el) => el !== undefined) as ENUM_PIECES[][];

  while (newGrid.length < grid.length) {
    newGrid = [Array(GRID_WIDTH).fill(ENUM_PIECES.empty), ...newGrid];
  }

  return {
    grid: newGrid,
    nbLineToSend: nbToSend,
  };
};

const gridAddWall = (grid: ENUM_PIECES[][], amount: number): ENUM_PIECES[][] => {
  const posX = Math.floor(Math.random() * GRID_WIDTH);

  const toAdd = Array(GRID_WIDTH).fill(ENUM_PIECES.wall_malus);
  toAdd[posX] = ENUM_PIECES.empty;

  let newGrid = grid;
  for (let i = 0; i < amount; i++) {
    newGrid = [...grid, toAdd];
    newGrid.shift();
  }

  return newGrid;
};

export {
  GRID_HEIGHT,
  GRID_WIDTH,
  hasCollision,
  placePiece,
  ENUM_COLLISION_TYPE,
  movePose,
  updatePiecePos,
  gridDelLine,
  gridAddWall,
  placePiecePreview,
  ENUM_PIECES_MOVE,
  ENUM_PIECES,
  chooseWallType,
  IPiece,
  IPos,
};
