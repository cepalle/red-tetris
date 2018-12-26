import {IOptionGame} from '@src/server/RoomManager';
import {ENUM_PIECES_MOVE} from '@src/common/grid-piece-handler';

// SET_ROOM_PLAYER_NAME
interface IEventSetRoomPlayerName {
  roomName: string,

  playerName: string,
}

// SET_GAME_OPTION
interface IEventSetGameOption {
  roomName: string,

  optionGame: IOptionGame
}

// START_GAME
interface IEventStartGame {
  roomName: string,
}

// MOVE_PIECE
interface IEventMovePiece {
  roomName: string,

  move: ENUM_PIECES_MOVE,
}

enum ENUM_SOCKET_EVENT_SERVER {
  SET_ROOM_PLAYER_NAME = 'SET_ROOM_PLAYER_NAME',
  SET_GAME_OPTION = 'SET_GAME_OPTION',
  START_GAME = 'START_GAME',
  MOVE_PIECE = 'MOVE_PIECE',
}

export {
  ENUM_SOCKET_EVENT_SERVER,
  IEventSetRoomPlayerName,
  IEventSetGameOption,
  IEventStartGame,
  IEventMovePiece,
};
