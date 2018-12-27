import {ENUM_PIECES, IPiece} from '../common/grid-piece-handler';

class Piece {

  static randomPiece = (): IPiece => {
    return {
      num: Math.floor(Math.random() * (ENUM_PIECES.n7 - ENUM_PIECES.n1 + 1)) + ENUM_PIECES.n1,
      rot: Math.floor(Math.random() * 4),
    };
  };

  static genFlow = (n: number): IPiece[] => {
    return Array(n).fill(0).map(() => Piece.randomPiece());
  };
}

export {
  Piece,
};
