import {urlGetPlayerName, urlGetRoomName} from "../util/url-handler";

const GRID_HEIGHT = 24;
const GRID_WIDTH = 10;

const initPlayerState = (playerName, isMaster = false) => {
  return {
    grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0)),
    playerName: playerName,
    isMaster: isMaster,
    hasLoose: false,
    hasWin: false,
  }
};

const initialState = {
  playerStates: [initPlayerState(urlGetPlayerName())],
  playerName: urlGetPlayerName(),
  roomName: urlGetRoomName(),
  piecesFlow: [],
  curPiecePos: {},
  curPieceRot: 0,
  error: undefined,
};

export {initialState, initPlayerState, GRID_HEIGHT, GRID_WIDTH};
