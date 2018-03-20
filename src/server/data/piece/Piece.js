import {GRID_HEIGHT, GRID_WIDTH} from "../../../common/grid";
import {getPieceMask, PIECES} from "../../../common/pieces";

class Piece {
  constructor(num, pos, rot) {
    this.num = num;
    this.rot = rot;
    this.pos = pos;
  }

  static randNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  /**
   * Generate a random piece
   * @return {Piece}
   */
  static generatePiece() {
    const num = (Math.random() * PIECES.length) + 1;
    const rot = Piece.randNumber(num, 3);
    const mask = getPieceMask(num, rot);
    const pos = {
      x: Piece.randNumber(mask.x, GRID_WIDTH - mask.width - mask.x),
      y: 0
    };
    return new Piece(num, pos, rot);
  }

  /**
   * Generate n pieces
   * @param {number} n
   * @return {Array<Piece>}
   */
  static generatePieces(n) {
    const pieces = [];
    for (let i = 0; i < n; i++)
      pieces.push(Piece.generatePiece());
    return pieces;
  }
}

export default Piece
