import {PARTS} from '../parts';

const exemple = {
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
      player_name: "name",
    },
  ],
  player_name: "name",
  room_name: "room",
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

const initialState = {
  grids: [],
  player_name: "",
  room_name: "",
  is_master: true,
  parts_flow: [],
  cur_part_pos: undefined,
};

const reducer = (state = exemple, action) => {
  /*
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text]);
    default:
      return state;
  }
  * */
  return state;
};

export {reducer};
