import {PARTS} from '../common/parts';
import {urlGetPlayerName, urlGetRoomName} from "./url-handler"

const initialState = {
  grids: [
    {
      grid: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 6],
        [1, 7, 7, 0, 0, 5, 5, 0, 6, 6],
        [1, 2, 7, 7, 5, 5, 3, 4, 4, 6],
        [1, 2, 2, 2, 3, 3, 3, 4, 4, 0],
      ],
      playerName: urlGetPlayerName(),
    },
  ],
  playerName: urlGetPlayerName(),
  roomName: urlGetRoomName(),
  isMaster: false,
  partsFlow: [1, 2, 1, 5, 6, 1],
  curPartPos: {x: 0, y: 5},
};

const gridInit = () => {
  const grid = [];
  for (let i = 0; i < 20; i++) {
    grid.push([]);
    for (let j = 0; j < 10; j++) {
      grid.push(0);
    }
  }
  return grid;
};

const reducer = (state = initialState, action) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case 'ADD_PARTS_FLOW':
      return Object.assign({}, state, {partsFlow: state.partsFlow.concat(action.data)});
    default:
      return state;
  }
};

export {reducer};
