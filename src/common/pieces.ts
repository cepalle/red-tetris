import {ENUM_PIECES} from '@src/client/util/grid-piece-handler';

const Pieces = [1, 2, 3, 4, 5, 6, 7];

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

export {
  Pieces,
  getPiece,
  getPieceInfo,
  IPiecesDescr,
  IPieceInfo,
};
