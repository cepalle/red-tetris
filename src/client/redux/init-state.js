import {urlGetPlayerName, urlGetRoomName} from "../util/url-handler";
import {GRID_WIDTH, GRID_HEIGHT} from "../../common/grid";

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
  piecesFlow: [],
  playerName: urlGetPlayerName(),
  roomName: urlGetRoomName(),
  error: undefined,
};

export {initialState, initPlayerState};
