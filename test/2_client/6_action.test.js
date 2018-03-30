import {addWallLine, updateGrid} from "../../src/client/actions/action-creators";

describe('action test', () => {
  it('reducerUpdateGrid', () => {
    updateGrid([], "playerName");
    addWallLine(8);
  });
});
