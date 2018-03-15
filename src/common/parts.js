const PARTS = [1, 2, 3, 4, 5, 6, 7];

const PARTS_ROT_RIGHT = "PARTS_ROT_RIGHT";
const PARTS_ROT_LEFT = "PARTS_ROT_LEFT";
const PARTS_MOVE_RIGHT = "PARTS_MOVE_RIGHT";
const PARTS_MOVE_LEFT = "PARTS_MOVE_LEFT";
const PARTS_MOVE_DOWN = "PARTS_MOVE_DOWN";

const PARTS_DESCR = [
  [
    {
      startMask: {x: 0, y:-1},
      piece: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      startMask: {x: -2, y: 0},
      piece: [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ]
    },
    {
      startMask: {x: 0, y: -2},
      piece: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ]
    },
    {
      startMask: {x: -1, y:0},
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
      startMask: {x: 0, y:0},
      piece: [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0],
      ]
    },
    {
      startMask: {x: -1, y: 0},
      piece: [
        [0, 2, 2],
        [0, 2, 0],
        [0, 2, 0],
      ]
    },
    {
      startMask: {x: 0, y: -1},
      piece: [
        [0, 0, 0],
        [2, 2, 2],
        [0, 0, 2],
      ]
    },
    {
      startMask: {x: 0, y: 0},
      piece: [
        [0, 2, 0],
        [0, 2, 0],
        [2, 2, 0],
      ]
    },
  ],
  [
    {
      startMask: {x: 0, y: 0},
      piece: [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0],
      ]
    },
    {
      startMask: {x: -1, y: 0},
      piece: [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
      ]
    },
    {
      startMask: {x: 0, y: -1},
      piece: [
        [0, 0, 0],
        [3, 3, 3],
        [3, 0, 0],
      ]
    },
    {
      startMask: {x: 0, y: 0},
      piece: [
        [3, 3, 0],
        [0, 3, 0],
        [0, 3, 0],
      ]
    },
  ],
  [
    {
      startMask: {x: -1, y: 0},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      startMask: {x: -1, y: 0},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      startMask: {x: -1, y: 0},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      startMask: {x: -1, y: 0},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
  ],
  [
    {
      startMask: {x: 0, y: 0},
      piece: [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0],
      ]
    },
    {
      startMask: {x: -1, y: 0},
      piece: [
        [0, 5, 0],
        [0, 5, 5],
        [0, 0, 5],
      ]
    },
    {
      startMask: {x: 0, y: -1},
      piece: [
        [0, 0, 0],
        [0, 5, 5],
        [5, 5, 0],
      ]
    },
    {
      startMask: {x: 0, y: 0},
      piece: [
        [5, 0, 0],
        [5, 5, 0],
        [0, 5, 0],
      ]
    },
  ],
  [
    {
      startMask: {x: 0, y:0},
      piece: [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0],
      ]
    },
    {
      startMask: {x: -1, y: 0},
      piece: [
        [0, 6, 0],
        [0, 6, 6],
        [0, 6, 0],
      ]
    },
    {
      startMask: {x: 0, y: -1},
      piece: [
        [0, 0, 0],
        [6, 6, 6],
        [0, 6, 0],
      ]
    },
    {
      startMask: {x: 0, y:0},
      piece: [
        [0, 6, 0],
        [6, 6, 0],
        [0, 6, 0],
      ]
    },
  ],
  [
    {
      startMask: {x: 0, y: 0},
      piece: [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
      ]
    },
    {
      startMask: {x: -1, y: 0},
      piece: [
        [0, 0, 7],
        [0, 7, 7],
        [0, 7, 0],
      ]
    },
    {
      startMask: {x: 0, y: -1},
      piece: [
        [0, 0, 0],
        [7, 7, 0],
        [0, 7, 7],
      ]
    },
    {
      startMask: {x: 0, y: 0},
      piece: [
        [0, 7, 0],
        [7, 7, 0],
        [7, 0, 0],
      ]
    },
  ],
];

module.exports = {
  PARTS,
  PARTS_DESCR,
  PARTS_ROT_LEFT,
  PARTS_ROT_RIGHT,
  PARTS_MOVE_DOWN,
  PARTS_MOVE_LEFT,
  PARTS_MOVE_RIGHT
};
