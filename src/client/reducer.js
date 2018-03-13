import {PARTS} from '../common/parts';
import {url_get_player_name, url_get_room_name} from "./url_handler"

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
      player_name: url_get_player_name(),
    },
  ],
  player_name: url_get_player_name(), // function
  room_name: url_get_room_name(),
  is_master: true,
  parts_flow: [PARTS._1, PARTS._2, PARTS._1, PARTS._5, PARTS._6, PARTS._1],
  cur_part_pos: {x: 0, y: 5},
};

const grid_init = () => {
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
      return Object.assign({}, state, {parts_flow: state.parts_flow.concat(action.data)});
    default:
      return state;
  }
};

export {reducer};
