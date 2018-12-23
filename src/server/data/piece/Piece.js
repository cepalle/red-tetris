import {GRID_HEIGHT, GRID_WIDTH} from "../../../common/grid";
import {getPieceInfo, Pieces} from "../../../common/pieces";

class Piece {
  constructor(num, pos, rot) {
    this.num = num;
    this.rot = rot;
    this.pos = pos;
  }

  static randNumber(min, len) {
    return Math.floor(Math.random() * len) + min;
  }

  /**
   * Generate a random piece
   * @return {Piece}
   */
  static generatePiece() {
    const num = Piece.randNumber(1, 7);
    const rot = Piece.randNumber(0, 4);
    const mask = getPieceInfo(num, rot);
    const pos = {
      x: Piece.randNumber(mask.x, GRID_WIDTH - mask.width + 1),
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
    let lastPiece = undefined;

    for (let i = 0; i < n; i++) {
      const piece = Piece.generatePiece();
      if (!lastPiece || canPlace(lastPiece, piece.num)) {
        lastPiece = piece;
        pieces.push(piece);
      }
      else i--;
    }
    function canPlace(lastPiece, num) {
      return !(lastPiece === num || Piece.randNumber(1, 10) > 5);

    }

    return pieces;
  }
}

export default Piece
