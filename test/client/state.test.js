import {GRID_HEIGHT, GRID_WIDTH} from "../../src/common/grid";
import {cloneState} from "../../src/client/util/clone-handler";

const state = {
  playerStates: [
    {
      grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0)),
      playerName: "playerName",
      master: true,
      loose: false,
      win: false,
    },
    {
      grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0)),
      playerName: "playerName2",
      master: false,
      loose: false,
      win: false,
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


const getState = () => cloneState(state);

export {getState};
