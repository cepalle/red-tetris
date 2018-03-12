import {PARTS} from '../parts';

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


const exemple = {
  grids: [
    {
      grid: grid_init(),
      player_name: "name",
    },
  ],
  player_name: "name",
  room_name: "room",
  is_master: true,
  parts_flow: [PARTS._1, PARTS._2, PARTS._1, PARTS._5, PARTS._6, PARTS._1],
  cur_part_pos: {x: 0, y: 0},
};


const initialState = {
  grids: [],
  player_name: "",
  room_name: "",
  is_master: true,
  parts_flow: [],
  cur_part_pos: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text]);
    default:
      return state;
  }
};

export {reducer};
