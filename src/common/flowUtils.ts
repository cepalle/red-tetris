import {ENUM_PIECES, IPiece} from '@src/common/grid-piece-handler';

const randomPiece = (): IPiece => {
  return {
    num: Math.floor(Math.random() * (ENUM_PIECES.n7 - ENUM_PIECES.n1 + 1)) + ENUM_PIECES.n1,
    rot: Math.floor(Math.random() * 4),
  };
};

const genFlow = (n: number): IPiece[] => {
  return Array(n).fill(0).map(() => randomPiece());
};

export {genFlow};
