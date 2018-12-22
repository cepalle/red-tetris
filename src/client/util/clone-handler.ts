const clonePiece = piece => Object.assign({}, piece, {pos: Object.assign({}, piece.pos)});

export {clonePiece};
