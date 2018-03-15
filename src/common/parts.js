const PARTS = [1, 2, 3, 4, 5, 6, 7];

const PARTS_MOVE = {
  ROT_RIGHT: "PARTS_ROT_RIGHT",
  ROT_LEFT: "PARTS_ROT_LEFT",
  RIGHT: "PARTS_MOVE_RIGHT",
  LEFT: "PARTS_MOVE_LEFT",
  DOWN: "PARTS_MOVE_DOWN"
}

const PARTS_DESCR = [
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

const getPiece = (parts, rot = 0) => PARTS_DESCR[parts][rot].piece;
const getPieceObj = (parts, rot = 0) => PARTS_DESCR[parts][rot];
const getPieceMask = (parts, rot = 0) => PARTS_DESCR[parts][rot].info;
const updateDirection = (loc, direction) => {
  if (direction === PARTS_MOVE.DOWN)
    loc.y++;
  else if (direction === PARTS_MOVE.LEFT)
    loc.x--;
  else if (direction === PARTS_MOVE.RIGHT)
    loc.x++;
};

module.exports = {
  PARTS,
  PARTS_DESCR,
  PARTS_MOVE,
  getPiece, getPieceMask, getPieceObj, updateDirection
};
