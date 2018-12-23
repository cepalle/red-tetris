import {ENUM_PIECES} from '@src/common/IType';

const randomPiece = (): ENUM_PIECES => {
  return Math.floor(Math.random() * (ENUM_PIECES.n7 - ENUM_PIECES.n1 + 1)) + ENUM_PIECES.n1;
};

const genFlow = (n: number): ENUM_PIECES[] => {
  return Array(n).fill(0).map(() => randomPiece());
};

export {genFlow};
