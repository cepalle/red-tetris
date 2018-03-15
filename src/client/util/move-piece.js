/**
 * Return true if can move down
 * @param {Object} state
 * @param {Array<Array<number>>} grid
 * @param {Object} loc
 * @param {number} loc.x
 * @param {number} loc.y
 * @param {Array<Array<number>>} piece
 * @param {Object} mask
 * @param {number} mask.x
 * @param {number} mask.y
 * @return {Object | boolean}
 */
const canMoveDownAndPlace = (state, grid, loc, piece, mask) => {
  loc.y++;
  if (loc.y > grid.length - 1 + mask.y)
    return false ;
  const toReturn = {
    grid: grid.slice(0),
    curPartCoords: []
  };

  for (let y = 0; y < piece.length; y++) {
    let horizontal = piece[y];
    for (let x = 0; x < horizontal.length; x++) {
      let number = horizontal[x];
      try {
        if (number !== 0 && toReturn.grid[y + loc.y][x + loc.x] !== 0)
          return false ;
        else if(number !== 0) {
          toReturn.grid[y + loc.y][x + loc.x] = number;
          toReturn.curPartCoords.push({x: y + loc.y, y: x + loc.x})
        }
      } catch (e) {}
    }
  }

  return toReturn;
};

const eraseLastGrid = (grid, state) => state.curPartCoords.forEach(e => {grid[e.x][e.y] = 0;});

export { canMoveDownAndPlace, eraseLastGrid}
