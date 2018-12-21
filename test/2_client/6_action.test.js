import {ADD_WALL_LINE, UPDATE_GRID} from "../../src/client/actions/action-creators";

describe('action test', () => {
  it('reducerUpdateGrid', () => {
    UPDATE_GRID([], "playerName");
    ADD_WALL_LINE(8);
  });
});
