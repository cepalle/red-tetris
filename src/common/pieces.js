const PIECES = [1, 2, 3, 4, 5, 6, 7];

const PIECES_MOVE = {
  ROT_RIGHT: "PARTS_ROT_RIGHT",
  ROT_LEFT: "PARTS_ROT_LEFT",
  RIGHT: "PARTS_MOVE_RIGHT",
  LEFT: "PARTS_MOVE_LEFT",
  DOWN: "PARTS_MOVE_DOWN"
};

const PIECES_DESCR = [
  [
    {
      info: {x: 0, y: -1},
      piece: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {x: -2, y: 0},
      piece: [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ]
    },
    {
      info: {x: 0, y: -2},
      piece: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0},
      piece: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ]
    },
  ],
  [
    {
      info: {x: 0, y: 0},
      piece: [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0},
      piece: [
        [0, 2, 2],
        [0, 2, 0],
        [0, 2, 0],
      ]
    },
    {
      info: {x: 0, y: -1},
      piece: [
        [0, 0, 0],
        [2, 2, 2],
        [0, 0, 2],
      ]
    },
    {
      info: {x: 0, y: 0},
      piece: [
        [0, 2, 0],
        [0, 2, 0],
        [2, 2, 0],
      ]
    },
  ],
  [
    {
      info: {x: 0, y: 0},
      piece: [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0},
      piece: [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
      ]
    },
    {
      info: {x: 0, y: -1},
      piece: [
        [0, 0, 0],
        [3, 3, 3],
        [3, 0, 0],
      ]
    },
    {
      info: {x: 0, y: 0},
      piece: [
        [3, 3, 0],
        [0, 3, 0],
        [0, 3, 0],
      ]
    },
  ],
  [
    {
      info: {x: -1, y: 0},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
  ],
  [
    {
      info: {x: 0, y: 0},
      piece: [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0},
      piece: [
        [0, 5, 0],
        [0, 5, 5],
        [0, 0, 5],
      ]
    },
    {
      info: {x: 0, y: -1},
      piece: [
        [0, 0, 0],
        [0, 5, 5],
        [5, 5, 0],
      ]
    },
    {
      info: {x: 0, y: 0},
      piece: [
        [5, 0, 0],
        [5, 5, 0],
        [0, 5, 0],
      ]
    },
  ],
  [
    {
      info: {x: 0, y: 0},
      piece: [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0},
      piece: [
        [0, 6, 0],
        [0, 6, 6],
        [0, 6, 0],
      ]
    },
    {
      info: {x: 0, y: -1},
      piece: [
        [0, 0, 0],
        [6, 6, 6],
        [0, 6, 0],
      ]
    },
    {
      info: {x: 0, y: 0},
      piece: [
        [0, 6, 0],
        [6, 6, 0],
        [0, 6, 0],
      ]
    },
  ],
  [
    {
      info: {x: 0, y: 0},
      piece: [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0},
      piece: [
        [0, 0, 7],
        [0, 7, 7],
        [0, 7, 0],
      ]
    },
    {
      info: {x: 0, y: -1},
      piece: [
        [0, 0, 0],
        [7, 7, 0],
        [0, 7, 7],
      ]
    },
    {
      info: {x: 0, y: 0},
      piece: [
        [0, 7, 0],
        [7, 7, 0],
        [7, 0, 0],
      ]
    },
  ],
];

const getPiece = (pieces, rot = 0) => PIECES_DESCR[pieces - 1][rot].piece;
const getPieceObj = (pieces, rot = 0) => PIECES_DESCR[pieces - 1][rot];
const getPieceMask = (pieces, rot = 0) => PIECES_DESCR[pieces - 1][rot].info;

module.exports = {
  PIECES,
  PIECES_DESCR,
  PIECES_MOVE,
  getPiece,
  getPieceMask,
  getPieceObj
};
