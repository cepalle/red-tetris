const PIECES = [1, 2, 3, 4, 5, 6, 7];

const PIECES_NUM = {
  empty: 0,
  _1:1,
  _2:2,
  _3:3,
  _4:4,
  _5:5,
  _6:6,
  _7:7,
  wall:8,
  preview:9,
  wall_malus:10,
  wall_loose:11,
  wall_win:12,
};

const PIECES_MOVE = {
  ROT_RIGHT: "PIECES_ROT_RIGHT",
  ROT_LEFT: "PIECES_ROT_LEFT",
  RIGHT: "PIECES_MOVE_RIGHT",
  LEFT: "PIECES_MOVE_LEFT",
  DOWN: "PIECES_MOVE_DOWN",
  DROP: "PIECES_DROP",
  SWITCH: "PIECE_SWITCH",
};

const PIECES_DESCR = [
  [
    {
      info: {x: 0, y: -1, width: 4},
      piece: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {x: -2, y: 0, width: 1},
      piece: [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ]
    },
    {
      info: {x: 0, y: -2, width: 4},
      piece: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0, width: 1},
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
      info: {x: 0, y: 0, width: 3},
      piece: [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0, width: 2},
      piece: [
        [0, 2, 2],
        [0, 2, 0],
        [0, 2, 0],
      ]
    },
    {
      info: {x: 0, y: -1, width: 3},
      piece: [
        [0, 0, 0],
        [2, 2, 2],
        [0, 0, 2],
      ]
    },
    {
      info: {x: 0, y: 0, width: 2},
      piece: [
        [0, 2, 0],
        [0, 2, 0],
        [2, 2, 0],
      ]
    },
  ],
  [
    {
      info: {x: 0, y: 0, width: 3},
      piece: [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0, width: 2},
      piece: [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
      ]
    },
    {
      info: {x: 0, y: -1, width: 3},
      piece: [
        [0, 0, 0],
        [3, 3, 3],
        [3, 0, 0],
      ]
    },
    {
      info: {x: 0, y: 0, width: 2},
      piece: [
        [3, 3, 0],
        [0, 3, 0],
        [0, 3, 0],
      ]
    },
  ],
  [
    {
      info: {x: -1, y: 0, width: 4},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0, width: 4},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0, width: 4},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0, width: 4},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
  ],
  [
    {
      info: {x: 0, y: 0, width: 3},
      piece: [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0, width: 2},
      piece: [
        [0, 5, 0],
        [0, 5, 5],
        [0, 0, 5],
      ]
    },
    {
      info: {x: 0, y: -1, width: 3},
      piece: [
        [0, 0, 0],
        [0, 5, 5],
        [5, 5, 0],
      ]
    },
    {
      info: {x: 0, y: 0, width: 2},
      piece: [
        [5, 0, 0],
        [5, 5, 0],
        [0, 5, 0],
      ]
    },
  ],
  [
    {
      info: {x: 0, y: 0, width: 3},
      piece: [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0, width: 2},
      piece: [
        [0, 6, 0],
        [0, 6, 6],
        [0, 6, 0],
      ]
    },
    {
      info: {x: 0, y: -1, width: 3},
      piece: [
        [0, 0, 0],
        [6, 6, 6],
        [0, 6, 0],
      ]
    },
    {
      info: {x: 0, y: 0, width: 2},
      piece: [
        [0, 6, 0],
        [6, 6, 0],
        [0, 6, 0],
      ]
    },
  ],
  [
    {
      info: {x: 0, y: 0, width: 3},
      piece: [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
      ]
    },
    {
      info: {x: -1, y: 0, width: 2},
      piece: [
        [0, 0, 7],
        [0, 7, 7],
        [0, 7, 0],
      ]
    },
    {
      info: {x: 0, y: -1, width: 3},
      piece: [
        [0, 0, 0],
        [7, 7, 0],
        [0, 7, 7],
      ]
    },
    {
      info: {x: 0, y: 0, width: 2},
      piece: [
        [0, 7, 0],
        [7, 7, 0],
        [7, 0, 0],
      ]
    },
  ],
];

const getPiece = (pieces, rot = 0) => PIECES_DESCR[pieces - 1][rot].piece;
const getPieceMask = (pieces, rot = 0) => PIECES_DESCR[pieces - 1][rot].info;

module.exports = {
  PIECES,
  PIECES_DESCR,
  PIECES_MOVE,
  getPiece,
  getPieceMask,
  PIECES_NUM
};
