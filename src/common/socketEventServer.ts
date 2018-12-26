import {ENUM_PIECES_MOVE} from '@src/common/grid-piece-handler';
import {IOptionGame} from '@src/common/ITypeRoomManager';

// SUB_ROOM_STATE
interface IEventSubRoomState {
  roomName: string,

  playerName: string,
}

// SUB_ROOMS_PLAYERS_NAME
interface IEventSubRoomsPlayersName {
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
  SUB_ROOM_STATE = 'SUB_ROOM_STATE',
  SUB_ROOMS_PLAYERS_NAME = 'SUB_ROOMS_PLAYERS_NAME',
  SET_GAME_OPTION = 'SET_GAME_OPTION',
  START_GAME = 'START_GAME',
  MOVE_PIECE = 'MOVE_PIECE',
}

export {
  ENUM_SOCKET_EVENT_SERVER,
  IEventSubRoomState,
  IEventSetGameOption,
  IEventStartGame,
  IEventMovePiece,
  IEventSubRoomsPlayersName,
};
