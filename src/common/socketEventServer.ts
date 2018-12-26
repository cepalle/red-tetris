import {IOptionGame, IPiece, IPos} from '@src/common/IType';

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

// PLACE_PIECE
interface IEventPlacePiece {
  roomName: string,

  piece: IPiece,
  pos: IPos
}

enum ENUM_SOCKET_EVENT_SERVER {
  SET_ROOM_PLAYER_NAME = 'SET_ROOM_PLAYER_NAME',
  SET_GAME_OPTION = 'SET_GAME_OPTION',
  START_GAME = 'START_GAME',
  PLACE_PIECE = 'PLACE_PIECE',
}

export {
  ENUM_SOCKET_EVENT_SERVER,
  IEventSetRoomPlayerName,
  IEventSetGameOption,
  IEventStartGame,
  IEventPlacePiece,
};
