import {IPlayerClient} from '@src/common/socketEventClient';
import {IOptionGame, IPlayer} from '@src/common/ITypeRoomManager';

// --- TYPE

interface IPos {
  readonly x: number,
  readonly y: number
}

interface IPiece {
  readonly num: number,
  readonly rot: number,
}

const initPose = () => {
  return {
    x: Math.floor(GRID_WIDTH / 2),
    y: 0,
  };
};

enum ENUM_PIECES_MOVE {
  ROT_RIGHT = 'ROT_RIGHT',
  ROT_LEFT = 'ROT_LEFT',
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
  DOWN = 'DOWN',
  DROP = 'DROP',
  SWITCH = 'SWITCH',
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
  readonly x: number,
  readonly y: number,
  readonly width: number
}

interface IPiecesDescr {
  readonly info: IPieceInfo,
  readonly piece: ENUM_PIECES[][],
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
// const getPieceInfo = (pieces: ENUM_PIECES, rot = 0): IPieceInfo => PIECES_DESCR[pieces - 1][rot].info;

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

const chooseWallType = (player: IPlayerClient): ENUM_PIECES => {
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

const hasCollision = (grid: ENUM_PIECES[][], piece: ENUM_PIECES[][], loc: IPos): ENUM_COLLISION_TYPE | undefined => {
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

const placePiece = (grid: ENUM_PIECES[][], piece: IPiece, pos: IPos, isPreview = false): ENUM_PIECES[][] => {
  const pieceDescr: ENUM_PIECES[][] = getPiece(piece.num, piece.rot);

  return grid.map((line, y) => line.map((nb, x) => {
    if (y >= pos.y &&
      x >= pos.x &&
      y < pos.y + pieceDescr.length &&
      x < pos.x + pieceDescr.length &&
      pieceDescr[y - pos.y][x - pos.x] !== 0
    ) {
      return (isPreview) ? ENUM_PIECES.preview : pieceDescr[y - pos.y][x - pos.x];
    }
    return nb;
  }));
};

const placePiecePreview = (grid: ENUM_PIECES[][], piece: IPiece, pos: IPos): ENUM_PIECES[][] => {
  const pieceDescr = getPiece(piece.num, piece.rot);
  let loc = pos;

  while (hasCollision(grid, pieceDescr, loc) === undefined) {
    loc = {...loc, y: loc.y + 1};
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

const moveCollision = (
  grid: ENUM_PIECES[][],
  posPiece: IPos,
  piece: IPiece,
): IPos => {
  const newPieceDescr = getPiece(piece.num, piece.rot);

  let collisionType = hasCollision(grid, newPieceDescr, posPiece);

  let newPos = posPiece;
  while (collisionType !== undefined && collisionType !== ENUM_COLLISION_TYPE.WALL_TOP) {
    newPos = {
      ...newPos,
      ...(collisionType === ENUM_COLLISION_TYPE.WALL_LEFT ? {x: newPos.x + 1} :
          collisionType === ENUM_COLLISION_TYPE.WALL_RIGHT ? {x: newPos.x - 1} :
            {y: newPos.y - 1}
      ),
    };
    collisionType = hasCollision(grid, newPieceDescr, newPos);
  }
  return newPos;
};

const updatePieceRot = (
  grid: ENUM_PIECES[][],
  posPiece: IPos,
  piece: IPiece,
  move: ENUM_PIECES_MOVE.ROT_LEFT | ENUM_PIECES_MOVE.ROT_RIGHT,
): { piecePlaced: boolean; pos: IPos; piece: IPiece } => {

  const newPiece = {
    ...piece,
    rot: moveRot(piece.rot, move),
  };

  const newPosPiece: IPos = moveCollision(grid, posPiece, newPiece);

  return {piecePlaced: false, pos: newPosPiece, piece: newPiece};
};

const updatePiecePos = (
  grid: ENUM_PIECES[][],
  posPiece: IPos,
  piece: IPiece,
  move: ENUM_PIECES_MOVE,
): { piecePlaced: boolean; pos: IPos; piece: IPiece } => {

  if (move === ENUM_PIECES_MOVE.ROT_LEFT || move === ENUM_PIECES_MOVE.ROT_RIGHT) {
    return updatePieceRot(grid, posPiece, piece, move);
  }
  if (move === ENUM_PIECES_MOVE.DROP) {
    const newPieceDescr = getPiece(piece.num, piece.rot);

    let newPos = posPiece;
    while (hasCollision(grid, newPieceDescr, newPos) === undefined) {
      newPos = {
        ...newPos,
        y: newPos.y + 1,
      };
    }
    newPos = {
      ...newPos,
      y: newPos.y - 1,
    };
    return {piecePlaced: true, pos: newPos, piece};
  }
  if (move === ENUM_PIECES_MOVE.RIGHT || move === ENUM_PIECES_MOVE.LEFT) {
    const newPieceDescr = getPiece(piece.num, piece.rot);
    const newpose = movePose(posPiece, move);
    const col = hasCollision(grid, newPieceDescr, newpose);

    return {
      piecePlaced: false,
      pos: (col === undefined) ? newpose : posPiece,
      piece,
    };
  }
  if (move === ENUM_PIECES_MOVE.DOWN) {
    const newPieceDescr = getPiece(piece.num, piece.rot);
    const newpose = movePose(posPiece, move);
    const col = hasCollision(grid, newPieceDescr, newpose);

    if (col === undefined) {
      return {
        piecePlaced: false,
        pos: newpose,
        piece,
      };
    }
    return {
      piecePlaced: true,
      pos: posPiece,
      piece,
    };
  }

  return {piecePlaced: false, pos: posPiece, piece};
};

const gridDelLine = (grid: ENUM_PIECES[][]): { grid: ENUM_PIECES[][]; nbLineToAdd: number } => {

  let nbToSend = 0;

  let newGrid = grid.map((line, y) => {
    const asEmpty = line.some((el) => el === ENUM_PIECES.empty);
    const asWall = line.some((el) => el === ENUM_PIECES.wall_malus);

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
    nbLineToAdd: nbToSend,
  };
};

const gridAddWall = (grid: ENUM_PIECES[][], amount: number, posX: number): ENUM_PIECES[][] => {
  const toAdd = Array(GRID_WIDTH).fill(ENUM_PIECES.wall_malus);
  toAdd[posX] = ENUM_PIECES.empty;

  let newGrid = grid;
  for (let i = 0; i < amount; i++) {
    newGrid = [...grid, toAdd];
    newGrid.shift();
  }

  return newGrid;
};

const calScore = (nbLine: number) => {
  if (nbLine <= 0) {
    return 0;
  }
  if (nbLine === 1) {
    return 40;
  }
  if (nbLine === 2) {
    return 100;
  }
  if (nbLine === 3) {
    return 200;
  }
  return 500;
};

const moveHandler = (
  players: IPlayer[],
  move: ENUM_PIECES_MOVE,
  socketId: string,
  optionGame: IOptionGame,
): IPlayer[] => {

  const player = players.find((p) => p.socket.id === socketId);
  if (player === undefined) {
    return players;
  }

  if (move === ENUM_PIECES_MOVE.SWITCH) {
    if (player.flow.length < 2) {
      return players;
    }

    const [frst, scnd, ...rest] = player.flow;
    const newFlow = [scnd, frst, ...rest];

    const piece1 = newFlow[0];
    const piecePos = player.posPiece;
    const gridP = player.grid;

    const newPose = moveCollision(gridP, piecePos, piece1);

    return players.map((p) => {
      if (p.socket.id === socketId) {
        return {
          ...p,
          flow: newFlow,
          posPiece: newPose,
        };
      }
      return p;
    });
  }

  const {pos, piece, piecePlaced} = updatePiecePos(player.grid, player.posPiece, player.flow[0], move);
  const nwFlow = player.flow.map((pi, i) => (i === 0) ? piece : pi);

  if (!piecePlaced) {
    return players.map((p) => {
      if (p.socket.id === socketId) {
        return {
          ...p,
          posPiece: pos,
          flow: nwFlow,
        };
      }
      return p;
    });
  }

  let newPlayer = {
    ...player,
    grid: placePiece(player.grid, nwFlow[0], pos),
    flow: nwFlow.filter((f, i) => i > 0),
    posPiece: initPose(),
  };

  const {grid, nbLineToAdd} = gridDelLine(newPlayer.grid);

  // update score with line del
  newPlayer = {
    ...newPlayer,
    score: newPlayer.score + calScore(nbLineToAdd),
    nbLineCompleted: newPlayer.nbLineCompleted + nbLineToAdd,
  };

  const posX = Math.floor(Math.random() * GRID_WIDTH);

  // add malus wall
  return players.map((p) => {
    if (p.socket.id === socketId) {
      return {
        ...newPlayer,
        grid: grid,
      };
    } else {
      const newGrid = (optionGame.addWallLine) ? gridAddWall(p.grid, nbLineToAdd, posX) : p.grid;
      return {
        ...p,
        grid: newGrid,
        posPiece: moveCollision(newGrid, p.posPiece, p.flow[0]),
      };
    }
  });

};

const gridInit = (gridHeight: number): ENUM_PIECES[][] => {
  return Array(gridHeight).fill(0).map(() =>
    Array(GRID_WIDTH).fill(ENUM_PIECES.empty),
  );
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
  initPose,
  moveHandler,
  gridInit,
  calScore,
};
