import {addPiecesFlow} from "../../../src/client/actions/action-creators";
import {reducerPiecesFlow} from "../../../src/client/reducers/reducer-aux";
import {GRID_HEIGHT, GRID_WIDTH} from "../../../src/common/grid";
import {reducer} from "../../../src/client/reducers/reducer";
import {expect} from "chai";

describe('reducer', () => {
  const state = {
    playerStates: [
      {
        grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0)),
        playerName: "playerName",
        isMaster: true,
        hasLoose: false,
        hasWin: false,
      },
      {
        grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0)),
        playerName: "playerName2",
        isMaster: false,
        hasLoose: false,
        hasWin: false,
      },
    ],
    piecesFlow: [
      {
        num: 1,
        rot: 0,
        pos: {x: 0, y: 0},
      },
      {
        num: 5,
        rot: 3,
        pos: {x: 1, y: 2},
      },
    ],
    error: {message: "rererer", type: "dff"},
    playerName: "playerName",
    roomName: "roonName",
    EmitLoose: false,
    EmitUpdateGrid: false,
    EmitCompleteLine: 0,
    SetAnimateTrue: false,
    SetAnimateFalse: false,
  };

  describe('#reducerPiecesFlow', () => {
    it('should reduce action ', () => {
      let newState = reducer(addPiecesFlow({
        num: 2,
        rot: 3,
        pos: {x: 2, y: 10},
      }));
      expect(newState.piecesFlow[2].num).to.equal(2);
    });
  });
});
