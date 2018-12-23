import {IPos} from '@src/common/IType';
import {getPieceInfo} from '@src/common/pieces';
import {GRID_WIDTH} from '@src/common/grid';

class Piece {
  num: number;
  rot: number;
  pos: IPos;

  constructor(num: number, pos: IPos, rot: number) {
    this.num = num;
    this.rot = rot;
    this.pos = pos;
  }

  static randNumber(min: number, len: number): number {
    return Math.floor(Math.random() * len) + min;
  }

  /**
   * Generate a random piece
   */
  static generatePiece(): Piece {
    const num = Piece.randNumber(1, 7);
    const rot = Piece.randNumber(0, 4);
    const mask = getPieceInfo(num, rot);
    const pos = {
      x: Piece.randNumber(mask.x, GRID_WIDTH - mask.width + 1),
      y: 0,
    };
    return new Piece(num, pos, rot);
  }

  /**
   * Generate n pieces
   */
  static generatePieces(n: number): Piece[] {
    const pieces = [];

    for (let i = 0; i < n; i++) {
      const piece = Piece.generatePiece();
      pieces.push(piece);
    }

    return pieces;
  }
}

export {Piece};
