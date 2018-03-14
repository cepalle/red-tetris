import {urlGetPlayerName, urlGetRoomName} from "../url-handler";

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

const initPlayerState = playerName => {
  return {
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
    playerName: playerName,
    isMaster: false,
  }
};

const initialState = {
  playerStates: [initPlayerState(urlGetPlayerName())],
  playerName: urlGetPlayerName(),
  roomName: urlGetRoomName(),
  partsFlow: [],
  curPartPos: {x: 0, y: 5},
  error: undefined
};

export {initialState, initPlayerState};
