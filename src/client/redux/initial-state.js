import {urlGetPlayerName, urlGetRoomName} from "../url-handler";
import {getPiece, getPieceMask, getPieceObj} from "../../common/parts";

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
      [0, 0, 6, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
      [0, 0, 0, 0, 0, 5, 5, 0, 6, 6],
      [0, 0, 0, 0, 5, 5, 3, 4, 4, 6],
      [0, 0, 0, 0, 3, 3, 3, 4, 4, 0],
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
  curPartPos: {x: 0 + getPieceMask(0, 1).x, y: -1 + getPieceMask(0,1 ).y},
  curPartRot: 1,
  curPartCoords: [],
  error: undefined
};



export {initialState, initPlayerState};
