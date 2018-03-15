import {urlGetPlayerName, urlGetRoomName} from "../url-handler";

const initPlayerState = (playerName, isMaster=false) => {
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
    isMaster: isMaster,
  }
};

const initialState = {
  playerStates: [initPlayerState(urlGetPlayerName())],
  playerName: urlGetPlayerName(),
  roomName: urlGetRoomName(),
  partsFlow: [1],
  curPartPos: {x: 5, y: 5},
  curPartRot: 0,
  curPartCoords: [],
  error: undefined
};

export {initialState, initPlayerState};
